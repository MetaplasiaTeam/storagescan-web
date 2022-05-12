import { createPinia, defineStore } from 'pinia'

export const pinia = createPinia()

export const useStore = defineStore({
  id: 'sc',
  state: () => ({
    chain: 'eth',
    address: '',
    currValueName: '',
  }),
  actions: {
    setChain(chain: string) {
      this.chain = chain
    },
    setAddress(address: string) {
      this.address = address
    },
    setCurrValueName(currValueName: string) {
      this.currValueName = currValueName
    },
  },
})
