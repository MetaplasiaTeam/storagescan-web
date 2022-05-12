import ContractsResponse from '@/types/contracts-response'
import { AxiosResponse } from 'axios'
import Request from './request'

const BASE_URL = 'https://storagescan.metaplasia.io'

const request = new Request({
  timeout: 30000,
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    },
  },
})

class Api {
  static getContracts(chain: string, address: string) {
    return request.get<AxiosResponse<ContractsResponse>>({
      url: `${BASE_URL}/contracts`,
      params: {
        chain: chain,
        addr: address,
      },
    })
  }

  static getValue(chain: string, address: string, name: string) {
    return request.get<AxiosResponse<string>>({
      url: `${BASE_URL}/value`,
      params: {
        chain: chain,
        addr: address,
        name: name,
      },
    })
  }
}

export { request, Api }
