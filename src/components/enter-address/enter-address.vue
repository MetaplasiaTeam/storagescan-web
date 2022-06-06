<script setup lang="ts">
import { api } from '@/common'
import { ref, watch } from 'vue'
import emitter from '@/emitter'
import { useStore } from '@/store'
import { RadioGroup } from '../radio-group'
import notyf from '@/notyf'
import { ScButton } from '../sc-button'

const store = useStore()

const chain = ref('eth')
const address = ref('')
const loading = ref(false)

const chains = [
  { name: 'Eth', key: 'eth' },
  { name: 'Bsc', key: 'bsc' },
]

watch(chain, (val) => {
  store.setChain(val)
})

watch(address, (val) => {
  store.setAddress(val)
})

function getContractVariables() {
  if (address.value === '') {
    notyf.error('Please enter an address')
    return
  }
  loading.value = true

  api
    .getContracts(chain.value, address.value)
    .then((res) => {
      console.log(res)
      emitter.emit('getContract', res)
    })
    .catch((err) => {
      notyf.error(err.message)
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

function onChainChange(val: string) {
  chain.value = val
}
</script>

<template>
  <div id="enter-address">
    <p>Enter Chain and Contract Address</p>
    <div class="card" id="enter-address-card">
      <div id="chain">
        Chain
        <RadioGroup
          id="chain-radio"
          curr-item-name="Eth"
          :items="chains"
          @handle-click-item="onChainChange"
        />
      </div>
      <div id="address">
        Address
        <input
          @keyup.enter="getContractVariables()"
          v-model="address"
          class="sc-input"
        />
      </div>
    </div>
    <div style="display: flex">
      <ScButton :outlined="true" @click="address = ''">Clear</ScButton
      ><ScButton :loading="loading" @click="getContractVariables()"
        >Submit</ScButton
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
#enter-address {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 38px;
}

p {
  font-size: 48px;
  font-weight: bold;
}

#chain {
  display: flex;
  width: 100%;
  align-items: center;
}

#address {
  display: flex;
  margin-top: 40px;
  width: 100%;
}

input {
  flex: 1;
  margin-left: 40px;
  transition: 0.3s;
  font-size: 24px;
}

#enter-address-card {
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
  margin-top: 60px;
}

@media screen and (max-width: 768px) {
  p {
    font-size: 38px;
  }

  #chain {
    flex-direction: column;
  }

  #chain-radio {
    margin-left: -40px;
  }

  #address {
    flex-direction: column;
  }
  input {
    flex: auto;
    height: 50px;
    margin-left: 0px;
  }
}
</style>
