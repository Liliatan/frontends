import { ethers } from "ethers"

import L1GasPriceOracle from "@/assets/abis/L1GasPriceOracle.json"
import L2GasPriceOracle from "@/assets/abis/L2GasPriceOracle.json"
import { CHAIN_ID, GAS_LIMIT } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { requireEnv } from "@/utils"

const usePriceFee = () => {
  const { networksAndSigners } = useApp()

  const getPriceFee = async (token: any, isL1: boolean = false) => {
    try {
      if (isL1) {
        const L2GasPriceOracleContract = new ethers.Contract(
          requireEnv("REACT_APP_L2_GAS_PRICE_ORACLE"),
          L2GasPriceOracle,
          networksAndSigners[CHAIN_ID.L1].signer,
        )
        const fee = await L2GasPriceOracleContract.l2BaseFee()
        return fee * BigInt(token.native ? GAS_LIMIT.DEPOSIT_ETH : GAS_LIMIT.DEPOSIT_ERC20)
      } else {
        const L1GasPriceOracleContract = new ethers.Contract(
          requireEnv("REACT_APP_L1_GAS_PRICE_ORACLE"),
          L1GasPriceOracle,
          networksAndSigners[CHAIN_ID.L2].signer,
        )
        const fee = await L1GasPriceOracleContract.l1BaseFee()
        return fee * BigInt(token.native ? GAS_LIMIT.WITHDRAW_ETH : GAS_LIMIT.WITHDRAW_ERC20)
      }
    } catch (err) {
      return BigInt(0)
    }
  }

  return { getPriceFee }
}

export default usePriceFee
