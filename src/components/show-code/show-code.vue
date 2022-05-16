<script setup lang="ts">
import emitter from '@/emitter'
import { ref } from 'vue'
import ContractsResponse from '@/types/contracts-response'
import CodeItem from './code-item.vue'

const contract = ref<ContractsResponse>()
const show = ref(false)
const titles = ref<Array<string>>([])
const codes = ref<Array<string>>([])

emitter.on('getContract', (val) => {
  titles.value = []
  codes.value = []
  contract.value = val
  flatContract()
  show.value = true
})

function flatContract() {
  const map = contract?.value?.codes
  titles.value.push(...Object.keys(map!))
  codes.value.push(...Object.values(map!))
  titles.value.forEach((ele, index) => {
    if (ele === contract.value?.main_contract) {
      const tempTitle = titles.value[index]
      const tempCode = codes.value[index]
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
