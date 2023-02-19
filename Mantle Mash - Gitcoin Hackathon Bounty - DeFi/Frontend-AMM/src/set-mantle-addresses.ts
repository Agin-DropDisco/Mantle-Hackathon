import { ChainId, FACTORY_ADDRESS, ROUTER_ADDRESS, DEXSWAP_TOKEN_LIST_ID } from '@zonudex/dexswap-sdk'

if (!process.env.REACT_APP_MANTLE_TESTNET_FACTORY_ADDRESS || !process.env.REACT_APP_MANTLE_TESTNET_ROUTER_ADDRESS) {
  throw new Error('Mainnet factory address env is required')
}
FACTORY_ADDRESS[ChainId.MANTLE_TESTNET] = process.env.REACT_APP_MANTLE_TESTNET_FACTORY_ADDRESS
console.log('mantle testnet factory address set to', process.env.REACT_APP_MANTLE_TESTNET_FACTORY_ADDRESS)

ROUTER_ADDRESS[ChainId.MANTLE_TESTNET] = process.env.REACT_APP_MANTLE_TESTNET_ROUTER_ADDRESS
console.log('mantle testnet router address set to', process.env.REACT_APP_MANTLE_TESTNET_ROUTER_ADDRESS)
console.log('using mantle testnet token list with id', DEXSWAP_TOKEN_LIST_ID[ChainId.MANTLE_TESTNET])
