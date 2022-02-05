import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
import fs from "fs-extra"

export default async function writeSharedAddressPath({ deployments }: HardhatRuntimeEnvironment) {
  const height = await ethers.provider.getBlockNumber()
  console.log(`START_HEIGHT=${height}`)

  const app = await deployments.get("Application")
  const bank = await deployments.get("Bank")
  const registration = await deployments.get("Registration")
  const pebble = await deployments.get("Pebble")
  const account = await deployments.get("Account")
  const token = await deployments.get("Token")

  const addressBook = {
    APP_CONTRACT: app.address.slice(2),
    BANK_CONTRACT: bank.address.slice(2),
    REGISTRATION_CONTRACT: registration.address.slice(2),
    PEBBLE_CONTRACT: pebble.address.slice(2),
    ACCOUNT_CONTRACT: account.address.slice(2),
    TOKEN_CONTRACT: token.address.slice(2),
    START_HEIGHT: height,
  }

  const sharedAddressPath = `${process.cwd()}/config/${ethers.provider.network.chainId}.json`
  await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2))
}

writeSharedAddressPath.dependencies = ["Application", "Bank", "Registration", "Pebble", "Account", "Token"]
writeSharedAddressPath.runAtTheEnd = true
