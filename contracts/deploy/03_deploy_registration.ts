import { HardhatRuntimeEnvironment } from "hardhat/types"

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const registration = await deploy("Registration", { from: deployer })

  console.log(`REGISTRATION_CONTRACT=${registration.address}`)
}

func.tags = ["Registration"]
