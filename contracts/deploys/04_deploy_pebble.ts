import { HardhatRuntimeEnvironment } from "hardhat/types"

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy, execute } = deployments
  const { deployer } = await getNamedAccounts()

  const Bank = await deployments.get("Bank")
  const Registration = await deployments.get("Registration")

  const pebble = await deploy("Pebble", {
    from: deployer,
    args: [Bank.address, Registration.address],
  })

  console.log(`PEBBLE_CONTRACT=${pebble.address}`)

  await execute("Bank", { from: deployer }, "grant", pebble.address)
  await execute("Registration", { from: deployer }, "grant", pebble.address)
}

func.tags = ["Pebble"]
func.dependencies = ["Bank", "Registration"]
