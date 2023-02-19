const HDWalletProvider = require('@truffle/hdwallet-provider')
const dotenv = require('dotenv')
dotenv.config()

const mnemonic = process.env.MNEMONIC
console.log('MNEMONIC:', mnemonic)

module.exports = {
  networks: {
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infura_api}`),
      network_id: '4',
      gasPrice: 3100000000,
      skipDryRun: true,
    },
    mantleTestnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc.testnet.mantle.xyz'),
      network_id: 5001,
      skipDryRun: true,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.8.7',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 100000,
  },
}
