import { HardhatRuntimeEnvironment } from "hardhat/types"
import BN = require("bn.js")

export default async function func({ deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  const { deploy, execute } = deployments
  const { deployer } = await getNamedAccounts()

  const Pebble = await deployments.get("Pebble")

  const token = await deploy("Token", {
    from: deployer,
    args: ["PBG", "PBG", 18],
  })

  console.log(`TOKEN_CONTRACT=${token.address}`)

  await execute("Token", { from: deployer }, "mint", Pebble.address, new BN("100000000000000000000000000").toString())
  await execute("Pebble", { from: deployer }, "setToken", token.address)
}

func.tags = ["Token"]
func.dependencies = ["Pebble"]
