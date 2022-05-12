import ContractsResponse from '@/types/contracts-response'
import mitt from 'mitt'

type Events = {
  getContract: ContractsResponse
  getValue: string
  disableValueButton: boolean
}

const emitter = mitt<Events>()

export default emitter
