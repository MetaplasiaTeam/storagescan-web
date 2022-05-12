<script setup lang="ts">
import emitter from '@/emitter'
import { ref } from 'vue'
import ContractsResponse from '@/types/contracts-response'
import CodeItem from './code-item.vue'

let contract = ref<ContractsResponse>()
let show = ref(false)
let titles = ref<Array<string>>([])
let codes = ref<Array<string>>([])

emitter.on('getContract', (val) => {
  titles.value = []
  codes.value = []
  contract.value = val
  flatContract()
  show.value = true
})

function flatContract() {
  let map = contract?.value?.codes
  titles.value.push(...Object.keys(map!))
  codes.value.push(...Object.values(map!))
  titles.value.forEach((ele, index) => {
    if (ele === contract.value?.main_contract) {
      let tempTitle = titles.value[index]
      let tempCode = codes.value[index]
      titles.value.splice(index, 1)
      codes.value.splice(index, 1)
      titles.value.unshift(tempTitle)
      codes.value.unshift(tempCode)
    }
  })
}
</script>

<template>
  <div v-if="show">
    <div id="codes">
      <CodeItem
        v-for="(value, index) in titles"
        :key="index"
        :title="value"
        :code="codes[index]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
#codes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
}
</style>
