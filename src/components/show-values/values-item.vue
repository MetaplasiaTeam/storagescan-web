<script setup lang="ts">
import { api } from '@/common'
import { useStore } from '@/store'
import emitter from '@/emitter'
import { onMounted, ref } from 'vue'
import notyf from '@/notyf'
import { ScButton } from '../sc-button'

const store = useStore()

const prop = defineProps({
  name: {
    type: String,
    default: '',
  },
  type: String,
})

const keyOrIndex = ref('')
const loading = ref(false)

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
  api
    .getValue(store.chain, store.address, _name)
    .then((res) => {
      console.log(res)
      emitter.emit('getValue', {
        name: `${prop.name}${keyOrIndex.value}`,
        value: res,
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

let placeholder = ref('["key"] or [index]')

onMounted(() => {
  if (prop.type === 'slice') {
    placeholder.value = '[index]'
  }
  if (prop.type === 'mapping') {
    placeholder.value = '["key"]'
  }
  if (prop.type === 'struct') {
    placeholder.value = '.id or .value'
  }
})
</script>

<template>
  <div class="value-item">
    <div class="value-left">
      <p class="type">
        <span class="name">{{ name }}</span> : {{ type }}
      </p>
      <input
        v-if="type === 'mapping' || type === 'struct' || type === 'slice'"
        v-model="keyOrIndex"
        class="value-input"
        :placeholder="placeholder"
        @keyup.enter="getValue()"
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
  width: 100%;
  align-items: center;
}

.input-div {
  height: 30px;
  position: relative;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    visibility: hidden;
  }
}

.value-input {
  margin-left: 20px;
  height: 100%;
  width: 100%;
  display: inline-block;
  background: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid var(--color-text);
  transition: 0.3s;
  left: 0;
  top: 0;

  &:focus {
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 4px solid var(--color-purple);
  }
}

.name {
  font-weight: bold;
}

.type {
  font-size: 36px;
  white-space: nowrap;
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
