import { HardhatRuntimeEnvironment } from "hardhat/types"

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const bank = await deploy("Bank", { from: deployer })

  console.log(`BANK_CONTRACT=${bank.address}`)
}

func.tags = ["Bank"]
