import xecaddr from 'xecaddrjs'
import { Prisma } from '@prisma/client'
import { RESPONSE_MESSAGES } from '../constants/index'
import * as bitcoinjs from 'bitcoinjs-lib'
import { NETWORK_SLUGS, USD_QUOTE_ID } from 'constants/index'

export const removeAddressPrefix = function (addressString: string): string {
  if (addressString.includes(':')) {
    return addressString.split(':')[1]
  }
  return addressString
}

export const getAddressPrefix = function (addressString: string): string {
  try {
    const format = xecaddr.detectAddressFormat(addressString)
    const network = xecaddr.detectAddressNetwork(addressString)
    if (format === xecaddr.Format.Xecaddr) {
      if (network === xecaddr.Network.Mainnet) {
        return NETWORK_SLUGS.ecash
      } else if (network === xecaddr.Network.Testnet) {
        return NETWORK_SLUGS.ectest
      }
    } else if (format === xecaddr.Format.Cashaddr) {
      if (network === xecaddr.Network.Mainnet) {
        return NETWORK_SLUGS.bitcoincash
      } else if (network === xecaddr.Network.Testnet) {
        return NETWORK_SLUGS.bchtest
      }
    }
  } catch {
    throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message)
  }
  throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message)
}

export const getAddressPrefixed = function (addressString: string): string {
  return `${getAddressPrefix(addressString)}:${removeAddressPrefix(addressString)}`
}

export async function satoshisToUnit (satoshis: Prisma.Decimal, networkFormat: string): Promise<Prisma.Decimal> {
  if (networkFormat === xecaddr.Format.Xecaddr) {
    return satoshis.dividedBy(1e2)
  } else if (networkFormat === xecaddr.Format.Cashaddr) {
    return satoshis.dividedBy(1e8)
  }
  throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message)
}

export async function pubkeyToAddress (pubkeyString: string, networkFormat: string): Promise<string | undefined> {
  const pubkey = Buffer.from(pubkeyString, 'hex')
  let legacyAddress: string | undefined
  try {
    legacyAddress = bitcoinjs.payments.p2pkh({ pubkey })?.address
  } catch (err) {
    return undefined
  }

  let address: string
  switch (networkFormat) {
    case xecaddr.Format.Xecaddr:
      address = await xecaddr.toXecAddress(legacyAddress)
      break
    case xecaddr.Format.Cashaddr:
      address = await xecaddr.toCashAddress(legacyAddress)
      break
    default:
      throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message)
  }
  return address
}

export const FormatNumber = (numberString: string, quoteId?: number): string => {
  if (quoteId === USD_QUOTE_ID) {
    const addcommas = parseFloat(numberString).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return addcommas
  } else {
    const addcommas = parseFloat(numberString).toLocaleString()
    return addcommas
  }
}
