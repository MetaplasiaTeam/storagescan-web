<script setup lang="ts">
import { Api } from '@/net'
import { useStore } from '@/store'
import emitter from '@/emitter'
import { ref } from 'vue'
import notyf from '@/notyf'
import { ScButton } from '../sc-button'

const store = useStore()

let prop = defineProps({
  name: {
    type: String,
    default: '',
  },
  type: String,
})

let keyOrIndex = ref('')
let loading = ref(false)

emitter.on('getValueing', (val) => {
  loading.value = val
})

function getValue() {
  emitter.emit('getValueing', true)
  store.setCurrValueName(prop.name)
  let _name = prop.name
  if (keyOrIndex.value !== '') {
    _name = `${_name}${keyOrIndex.value}`
  }
  Api.getValue(store.chain, store.address, _name)
    .then((res) => {
      emitter.emit('getValue', {
        name: `${prop.name}${keyOrIndex.value}`,
        value: res.data,
      })
    })
    .catch((err) => {
      notyf.error(err.message)
      console.log(err)
    })
    .finally(() => {
      emitter.emit('getValueing', false)
    })
}

let placeholder = '["key"] or [index]'
</script>

<template>
  <div class="value-item">
    <div class="value-left">
      <p class="type">
        <span class="name">{{ name }}</span> : {{ type }}
      </p>
      <input
        v-if="type === 'mapping' || type === 'array' || type === 'slice'"
        v-model="keyOrIndex"
        class="sc-input"
        :placeholder="placeholder"
      />
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <ScButton class="get-value-btn" :loading="loading" @click="getValue()">
        Value
      </ScButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.value-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.value-left {
  display: flex;
  align-items: center;
}

input {
  margin-left: 20px;
  height: 30px;
  width: 200px;
}

.name {
  font-weight: bold;
}

.type {
  font-size: 36px;
}

.get-value-btn {
  margin-left: 60px;
  width: 180px !important;
  height: 60px !important;
  border-radius: 20px !important;
  font-size: 30px !important;
}

@media screen and (max-width: 768px) {
  .value-item,
  .value-left {
    flex-direction: column;
  }

  .value-item {
    width: 100%;
  }

  .get-value-btn,
  input {
    margin-top: 20px;
  }

  input {
    height: 50px;
  }
}
</style>
