import { ChainId } from '@zonudex/dexswap-sdk'
import MULTICALL_ABI from './abi.json'

// TODO: Add the missing networks here
// @ts-ignore
const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.MANTLE_TESTNET]: '0xA8fD29EbbfbC21bc274FedE5Aa5C5D3cedc43f2C',
  [ChainId.MUMBAI]: '0xBE134FCAB1141485a7cD9Cc952172E0AcA9Ed46D',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
