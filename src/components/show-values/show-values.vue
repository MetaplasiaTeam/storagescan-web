<script setup lang="ts">
import ValuesItem from './values-item.vue'
import emitter from '@/emitter'
import ContractsResponse from '@/types/contracts-response'
import { ref } from 'vue'

let contract = ref<ContractsResponse>()
let value = ref('')
let show = ref(false)
let loadingValue = ref(false)

emitter.on('getContract', (val) => {
  contract.value = val
  show.value = true
})

emitter.on('getValue', (val) => {
  value.value = val
})

emitter.on('disableValueButton', (val) => {
  loadingValue.value = val
})
</script>

<template>
  <div v-if="show" class="card" id="show-values">
    <div id="values">
      <ValuesItem
        v-for="item in contract?.variables"
        :key="item.name"
        :name="item.name"
        :type="item.type"
      ></ValuesItem>
    </div>
    <div v-if="loadingValue" class="loading"></div>
    <textarea v-model="value" />
  </div>
</template>

<style scoped lang="scss">
#show-values {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  margin-top: 60px;
}

textarea {
  width: 500px;
  height: 500px;
}

@media screen and (max-width: 768px) {
  #show-values {
    flex-direction: column;
  }
  #values {
    width: 100%;
  }
}
</style>
