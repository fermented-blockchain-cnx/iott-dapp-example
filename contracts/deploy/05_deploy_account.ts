import { HardhatRuntimeEnvironment } from "hardhat/types"

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const account = await deploy("Account", { from: deployer })

  console.log(`ACCOUNT_CONTRACT=${account.address}`)
}

func.tags = ["Account"]
