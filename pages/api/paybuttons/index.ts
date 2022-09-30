import { NextApiRequest, NextApiResponse } from 'next'
import * as paybuttonService from 'services/paybuttonService'
import { RESPONSE_MESSAGES } from 'constants/index'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const query = req.query
    const userId: string | string[] | undefined = query.userId
    try {
      if (userId === '' || userId === undefined) throw new Error(RESPONSE_MESSAGES.USER_ID_NOT_PROVIDED_400.message)
      if (Array.isArray(userId)) throw new Error(RESPONSE_MESSAGES.MULTIPLE_USER_IDS_PROVIDED_400.message)
      const paybuttonList = await paybuttonService.fetchPaybuttonArrayByUserId(userId)
      res.status(200).json(paybuttonList)
    } catch (err: any) {
      switch (err.message) {
        case RESPONSE_MESSAGES.USER_ID_NOT_PROVIDED_400.message:
          res.status(400).json(RESPONSE_MESSAGES.USER_ID_NOT_PROVIDED_400)
          break
        case RESPONSE_MESSAGES.MULTIPLE_USER_IDS_PROVIDED_400.message:
          res.status(400).json(RESPONSE_MESSAGES.MULTIPLE_USER_IDS_PROVIDED_400)
          break
        default:
          res.status(500).json({ statusCode: 500, message: err.message })
      }
    }
  }
}
