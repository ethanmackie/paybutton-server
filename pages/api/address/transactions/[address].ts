import { NextApiResponse, NextApiRequest } from 'next'
import { parseAddress } from 'utils/validators'
import { NUMBER_OF_TRANSACTIONS_TO_SYNC_INITIALLY, RESPONSE_MESSAGES } from 'constants/index'
import { fetchAddressTransactions, syncAndSubscribeAddresses } from 'services/transactionService'
import { upsertAddress, addressExistsBySubstring } from 'services/addressService'
import Cors from 'cors'
import { runMiddleware } from 'utils/index'

const { ADDRESS_NOT_PROVIDED_400, INVALID_ADDRESS_400, NO_ADDRESS_FOUND_404 } = RESPONSE_MESSAGES
const cors = Cors({
  methods: ['GET', 'HEAD']
})

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await runMiddleware(req, res, cors)
  if (req.method === 'GET') {
    try {
      if (req.query.address === '' || req.query.address === undefined) {
        throw new Error(ADDRESS_NOT_PROVIDED_400.message)
      }

      const address = parseAddress(req.query.address as string)

      // this flag ?serverOnly=1 tells us to only retrieve what we have in the database
      const serverOnly = req.query.serverOnly === '1'

      if (!await addressExistsBySubstring(address)) {
        if (serverOnly) throw new Error(NO_ADDRESS_FOUND_404.message)

        const addressObject = await upsertAddress(address)
        await syncAndSubscribeAddresses([addressObject], NUMBER_OF_TRANSACTIONS_TO_SYNC_INITIALLY)
      }
      const transactions = await fetchAddressTransactions(address)

      res.status(200).send(transactions)
    } catch (err: any) {
      switch (err.message) {
        case ADDRESS_NOT_PROVIDED_400.message:
          res.status(ADDRESS_NOT_PROVIDED_400.statusCode).json(ADDRESS_NOT_PROVIDED_400)
          break
        case INVALID_ADDRESS_400.message: {
          res.status(INVALID_ADDRESS_400.statusCode).json(INVALID_ADDRESS_400)
          break
        }
        case NO_ADDRESS_FOUND_404.message: {
          res.status(NO_ADDRESS_FOUND_404.statusCode).json(NO_ADDRESS_FOUND_404)
          break
        }
        default:
          res.status(500).json({ statusCode: 500, message: err.message })
      }
    }
  }
}
