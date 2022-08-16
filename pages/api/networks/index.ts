import { NextApiRequest, NextApiResponse } from 'next'
import * as networksService from 'services/networksService'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const networkList = await networksService.getAllNetworks()
      res.status(200).json(networkList)
    } catch (err: any) {
      switch (err.message) {
        default:
          res.status(500).json({ statusCode: 500, message: err.message })
      }
    }
  }
}
