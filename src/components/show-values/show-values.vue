<script setup lang="ts">
import ValuesItem from './values-item.vue'
import emitter from '@/emitter'
import ContractsResponse from '@/types/contracts-response'
import { ref } from 'vue'

const contract = ref<ContractsResponse>()
const value = ref('')
const show = ref(false)
const loadingValue = ref(false)

emitter.on('getContract', (val) => {
  contract.value = val
  show.value = true
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
  </div>
</template>

<style scoped lang="scss">
#show-values {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 60px;
}

textarea {
  width: 500px;
  height: 500px;
}

#values {
  width: 90%;
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
