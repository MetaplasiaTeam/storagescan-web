import ContractsResponse from '@/types/contracts-response'
import mitt from 'mitt'

type Events = {
  getContract: ContractsResponse
  getValue: { name: String; value: String }
  getValueing: boolean
}

const emitter = mitt<Events>()

export default emitter
