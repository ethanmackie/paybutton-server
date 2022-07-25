import { Transaction as BCHTransaction } from 'grpc-bchrpc-node'
import prisma from 'prisma/clientInstance'
import { Prisma, Transaction } from '@prisma/client'
import bchdService from 'services/bchdService'
import _ from 'lodash'
import { fetchAddressBySubstring } from 'services/addressesService'

async function getReceivedAmount (transaction: BCHTransaction.AsObject, receivingAddress: string): Promise<Prisma.Decimal> {
  let totalOutput = 0
  transaction.outputsList.forEach((output) => {
    if (receivingAddress.includes(output.address)) {
      totalOutput += output.value
    }
  })
  return new Prisma.Decimal(totalOutput).dividedBy(1e8)
}

export async function fetchAddressTransactions (address: string): Promise<Transaction[]> {
  const paybuttonAddress = await fetchAddressBySubstring(address)
  return _.orderBy(paybuttonAddress.receivedTransactions, ['timestamp'], ['desc'])
}

export async function upsertTransaction (transaction: BCHTransaction.AsObject, receivingAddress: string): Promise<Transaction | undefined> {
  const receivedAmount = await getReceivedAmount(transaction, receivingAddress)
  if (receivedAmount === new Prisma.Decimal(0)) { // out transactions
    return
  }
  const address = await fetchAddressBySubstring(receivingAddress)
  const transactionParams = {
    hash: transaction.hash as string,
    amount: receivedAmount,
    addressId: address.id,
    timestamp: transaction.timestamp
  }
  return await prisma.transaction.upsert({
    where: {
      hash: transactionParams.hash
    },
    update: transactionParams,
    create: transactionParams
  })
}

export async function syncTransactions (address: string): Promise<void> {
  const transactions = await bchdService.getAddress(address)
  for (const t of transactions.confirmedTransactionsList) {
    void upsertTransaction(t, address)
  }
}
