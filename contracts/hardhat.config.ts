import "@nomiclabs/hardhat-waffle"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/types"

dotenv.config({ path: ".env" })
const { DEPLOYER_PRIVATE_KEY } = process.env

export default {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {},
    testnet: {
      url: "https://babel-api.testnet.iotex.io",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 4690,
      gas: 8500000,
      gasPrice: 1000000000000,
    },
    mainnet: {
      url: "https://babel-api.mainnet.iotex.io",
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 4689,
      gas: 8500000,
      gasPrice: 1000000000000,
    },
  },
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
      evmVersion: "petersburg",
    },
  },
  paths: {
    deploy: "deploys",
  },
} as HardhatUserConfig
