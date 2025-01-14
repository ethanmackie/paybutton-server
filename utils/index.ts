import xecaddr from 'xecaddrjs'
import { Address, Prisma } from '@prisma/client'
import { RESPONSE_MESSAGES, NETWORK_SLUGS, USD_QUOTE_ID, KeyValueT } from '../constants/index'
import * as bitcoinjs from 'bitcoinjs-lib'
import { NextApiRequest, NextApiResponse } from 'next'
import { URL } from 'url'

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

const findFirstSignificantDigit = (floatNumber: number): number | undefined => {
  if (floatNumber <= 0) {
    return undefined
  }
  let ret = 0
  while (floatNumber < 1) {
    floatNumber = floatNumber * 10
    ret++
  }
  return ret
}
export const formatQuoteValue = (numberString: string, quoteId?: number): string => {
  const parsedFloat = parseFloat(numberString)
  let minDigits: number
  let maxDigits: number
  if (quoteId === USD_QUOTE_ID) {
    minDigits = 2
    if (parsedFloat < 0.01) {
      maxDigits = findFirstSignificantDigit(parsedFloat) ?? 2
    } else {
      maxDigits = 2
    }
  } else {
    return parsedFloat.toLocaleString()
  }
  return parsedFloat.toLocaleString(
    undefined,
    {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits
    }
  )
}

export async function readCsv (fsModule: any, filePath: string): Promise<string[][]> {
  const data = await fsModule.promises.readFile(filePath, 'utf8')
  return data.split('\n').map((row: string) => row.split(','))
}

export async function fileExists (fsModule: any, filePath: string): Promise<boolean> {
  try {
    await fsModule.promises.stat(filePath)
    return true
  } catch (error) {
    return false
  }
}

export function isEmpty (value: string): boolean {
  return value === '' || value === null || value === undefined
}

export function getObjectValueForAddress<T> (addressString: string, objects: KeyValueT<T>): T {
  const prefix = getAddressPrefix(addressString)
  if (!Object.keys(objects).includes(prefix)) { throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message) }
  return objects[prefix]
}

export function getObjectValueForNetworkSlug<T> (networkSlug: string, objects: KeyValueT<T>): T {
  if (!Object.keys(NETWORK_SLUGS).includes(networkSlug)) { throw new Error(RESPONSE_MESSAGES.INVALID_NETWORK_SLUG_400.message) }
  return objects[networkSlug]
}

export const groupAddressesByNetwork = (availableNetworks: string[], addresses: Address[]): KeyValueT<Address[]> => {
  const addressesByNetwork: KeyValueT<Address[]> = {}

  // initializes empty array for each network
  availableNetworks.forEach(networkSlug => {
    addressesByNetwork[networkSlug] = []
  })

  // inserts in each array those addresses that belong to each network
  addresses.forEach(address => {
    const prefix = getAddressPrefix(address.address)
    if (!Object.keys(addressesByNetwork).includes(prefix)) { throw new Error(RESPONSE_MESSAGES.INVALID_ADDRESS_400.message) }
    addressesByNetwork[prefix].push(address)
  })
  return addressesByNetwork
}

export async function runMiddleware (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<any> {
  return await new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export function parseWebsiteURL (url: string): string {
  const domainPattern = /\.[a-zA-Z]{2,}$/
  const tryParse = (prefix: string): string => {
    let parsed: URL
    try {
      parsed = new URL(prefix + url)
      if (
        domainPattern.test(parsed.hostname) &&
        ['http:', 'https:'].includes(parsed.protocol)
      ) {
        return parsed.toString()
      }
    } catch (_) {}
    return ''
  }

  const unprefixedURL = tryParse('')
  if (unprefixedURL !== '') {
    return unprefixedURL
  }

  const prefixedURL = tryParse('https://')
  if (prefixedURL !== '') {
    return prefixedURL
  }

  throw new Error(RESPONSE_MESSAGES.INVALID_WEBSITE_URL_400.message)
}

export function arraysAreEqual (a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
