import { Price, Prisma } from '@prisma/client'
import { getAllPricesByTicker } from 'services/priceService'
import { PRICE_FILE_MAX_RETRIES, TICKERS, NETWORK_IDS, QUOTE_IDS, KeyValueT } from 'constants/index'
import { readCsv, fileExists } from 'utils/index'
import moment from 'moment'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

interface PriceFileData {
  ticker: string
  date: string
  priceInCAD: string
  priceInUSD: string
}

export const PATH_PRICE_CSV_FILE = path.join('prisma', 'seeds', 'prices.csv')

async function writeToFile (fileName: string, content: PriceFileData[]): Promise<void> {
  const writeFile = promisify(fs.writeFile)

  const headers = ['ticker', 'date', 'priceInCAD', 'priceInUSD']
  const rows = content.map(({ ticker, date, priceInCAD, priceInUSD }) => [ticker, date, priceInCAD, priceInUSD])
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n')

  await writeFile(fileName, csv, 'utf8')
}

export async function createPricesFile (): Promise<void> {
  console.log('Price file creation started')
  const start = moment()
  const prices: PriceFileData[] = []

  await Promise.all(Object.values(TICKERS).map(async (ticker) => {
    const pricesByTicker = await getAllPricesByTicker(ticker)

    pricesByTicker?.forEach(price => {
      prices.push({
        ticker,
        date: price.day,
        priceInCAD: price.Price_in_CAD,
        priceInUSD: price.Price_in_USD
      })
    })
  }))

  prices.sort((a, b) => {
    if (a.ticker < b.ticker) return -1
    if (a.ticker > b.ticker) return 1
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  })
  await writeToFile(PATH_PRICE_CSV_FILE, prices)

  const finish = moment()
  console.log(`\n\nstart: ${start.format('HH:mm:ss')}\nfinish: ${finish.format('HH:mm:ss')}\nduration: ${(finish.diff(start) / 1000).toFixed(2)} seconds`)
}

async function getPricesFromFile (attempt: number = 1): Promise<PriceFileData[]> {
  if (await fileExists(PATH_PRICE_CSV_FILE)) {
    const csvContent = await readCsv(PATH_PRICE_CSV_FILE)
    const res: PriceFileData[] = []

    const headers = csvContent[0]
    const data = csvContent.slice(1)

    for (const line of data) {
      const newPrice: KeyValueT<any> = {}
      for (const header of headers) {
        newPrice[header] = line[headers.indexOf(header)]
      }
      // ignore some prices that come empty
      if (newPrice.priceInCAD !== '' && newPrice.priceInUSD !== '') { res.push(newPrice as PriceFileData) }
    }

    return res
  } else {
    if (attempt > PRICE_FILE_MAX_RETRIES) { throw new Error(`Already attempted ${PRICE_FILE_MAX_RETRIES} times to create price files without success`) }

    await createPricesFile()
    return await getPricesFromFile(attempt + 1)
  }
}

export async function getPrices (): Promise<Price[]> {
  const quotes = Object.keys(QUOTE_IDS)
  const pricesFromFile = await getPricesFromFile()

  const prices: Price[][] = pricesFromFile.map(price =>
    quotes.map(quote => {
      return {
        id: 0,
        value: new Prisma.Decimal(price[`priceIn${quote}` as keyof PriceFileData]),
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: moment(price.date).unix(),
        networkId: NETWORK_IDS[price.ticker],
        quoteId: QUOTE_IDS[quote]
      }
    })
  )

  return prices.reduce((res, val) => res.concat(val), [])
}
