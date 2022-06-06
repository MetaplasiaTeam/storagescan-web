import ContractsResponse from '@/types/contracts-response'
import { get } from './fetch'

const BASE_URL = 'https://storagescan.metaplasia.io'

const api = {
  getContracts(chain: string, address: string) {
    return get<ContractsResponse>(`${BASE_URL}/contracts`, {
      chain: chain,
      addr: address,
    })
  },
  getValue(chain: string, address: string, name: string) {
    return get<string>(`${BASE_URL}/value`, {
      chain: chain,
      addr: address,
      name: name,
    })
  },
}

export { api }
