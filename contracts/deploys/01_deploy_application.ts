import { HardhatRuntimeEnvironment } from "hardhat/types"

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy, execute } = deployments
  const { deployer } = await getNamedAccounts()

  const app = await deploy("Application", { from: deployer })

  console.log(`APP_CONTRACT=${app.address}`)

  await execute("Application", { from: deployer }, "grant", deployer)
}

func.tags = ["Application"]
