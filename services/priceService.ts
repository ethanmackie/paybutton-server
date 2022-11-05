import { TransactionWithAddressAndPrices } from 'services/transactionService'
import axios from 'axios'
import { appInfo } from 'config/appInfo'
import { Prisma } from '@prisma/client'
import prisma from 'prisma/clientInstance'
import moment from 'moment'
import { RESPONSE_MESSAGES, XEC_NETWORK_ID, BCH_NETWORK_ID, USD_QUOTE_ID, CAD_QUOTE_ID } from 'constants/index'

function flattenTimestamp (timestamp: number): number {
  const date = moment((timestamp * 1000))
  const dateStart = date.startOf('day')
  return dateStart.unix()
}

function dateStringFromTimestamp (timestamp: number): string {
  const isoString = (new Date(timestamp * 1000)).toISOString()
  return isoString.split('T')[0].replace(/-/g, '') // YYYYMMDD
}

export async function syncPricesFromTransactionList (transactions: TransactionWithAddressAndPrices[]): Promise<void> {
  for (const transaction of transactions) {
    void await syncTransactionPrices({
      networkId: transaction.address.networkId,
      timestamp: transaction.timestamp,
      transactionId: transaction.id
    })
  }
}
export interface CreateAllPricesFromTransactionInput {
  timestamp: number
  networkId: number
  transactionId: number
  values: {
    'usd': Prisma.Decimal
    'cad': Prisma.Decimal
  }
}

export interface SyncTransactionPricesInput {
  networkId: number
  timestamp: number
  transactionId: number
}

export async function createTransactionPrices (params: CreateAllPricesFromTransactionInput): Promise<void> {
  // Create USD price, if it does not already exist
  const usdPrice = await prisma.price.upsert({
    where: {
      Price_timestamp_quoteId_networkId_unique_constraint: {
        quoteId: USD_QUOTE_ID,
        networkId: params.networkId,
        timestamp: params.timestamp
      }
    },
    create: {
      value: params.values.usd,
      timestamp: params.timestamp,
      network: {
        connect: {
          id: params.networkId
        }
      },
      quote: {
        connect: {
          id: USD_QUOTE_ID
        }
      }
    },
    update: {}
  })
  // Connect it with transaction, if not already connected
  void await prisma.pricesOnTransactions.upsert({
    where: {
      priceId_transactionId: {
        priceId: usdPrice.id,
        transactionId: params.transactionId
      }
    },
    create: {
      transactionId: params.transactionId,
      priceId: usdPrice.id
    },
    update: {}
  })

  // Create CAD price, if it does not already exist
  const cadPrice = await prisma.price.upsert({
    where: {
      Price_timestamp_quoteId_networkId_unique_constraint: {
        quoteId: CAD_QUOTE_ID,
        networkId: params.networkId,
        timestamp: params.timestamp
      }
    },
    create: {
      value: params.values.cad,
      timestamp: params.timestamp,
      network: {
        connect: {
          id: params.networkId
        }
      },
      quote: {
        connect: {
          id: CAD_QUOTE_ID
        }
      }
    },
    update: {}
  })
  // Connect it with transaction, if not already connected
  void await prisma.pricesOnTransactions.upsert({
    where: {
      priceId_transactionId: {
        priceId: cadPrice.id,
        transactionId: params.transactionId
      }
    },
    create: {
      transactionId: params.transactionId,
      priceId: cadPrice.id
    },
    update: {}
  })
}

export async function syncTransactionPrices (params: SyncTransactionPricesInput): Promise<void> {
  if (appInfo.priceAPIURL === '') {
    throw new Error(RESPONSE_MESSAGES.MISSING_PRICE_API_URL_400.message)
  }

  const dateString = dateStringFromTimestamp(params.timestamp)

  let res

  if (params.networkId === XEC_NETWORK_ID) {
    res = await axios.get(`${appInfo.priceAPIURL}/XEC+${dateString}`)
  } else if (params.networkId === BCH_NETWORK_ID) {
    res = await axios.get(`${appInfo.priceAPIURL}/BCH+${dateString}`)
  } else {
    throw new Error(RESPONSE_MESSAGES.INVALID_NETWORK_ID_400.message)
  }
  const responseData = res.data
  if (responseData.success === false) {
    return
  }
  const usdPriceString = responseData.Price_in_USD
  const cadPriceString = responseData.Price_in_CAD

  void await createTransactionPrices({
    timestamp: flattenTimestamp(params.timestamp),
    networkId: params.networkId,
    transactionId: params.transactionId,
    values: {
      usd: new Prisma.Decimal(usdPriceString),
      cad: new Prisma.Decimal(cadPriceString)
    }
  })
}