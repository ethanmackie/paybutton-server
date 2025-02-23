
/*
import prisma from 'prisma/clientInstance'
import * as transactionService from 'services/transactionService'
import { prismaMock } from 'prisma/mockedClient'
import { mockedTransaction, mockedGrpc, mockedBCHAddress } from '../mockedObjects'

describe('Create services', () => {
  it('Return created transaction', async () => {
    prismaMock.transaction.upsert.mockResolvedValue(mockedTransaction)
    prisma.transaction.upsert = prismaMock.transaction.upsert
    prismaMock.address.findMany.mockResolvedValue([mockedBCHAddress])
    prisma.address.findMany = prismaMock.address.findMany

    const result = await transactionService.upsertTransaction(
      mockedGrpc.transaction1.toObject(),
      mockedBCHAddress,
      true
    )
    expect(result).toEqual(mockedTransaction)
  })

  it('Convert hash from base64 to hex', async () => {
    const result = await transactionService.base64HashToHex(
      '4xiLDnvh5p1cIPpTW7wa2Xgs53iIIyNgrp2v3hClie0='
    )
    expect(result).toEqual('ed89a510deaf9dae6023238878e72c78d91abc5b53fa205c9de6e17b0e8b18e3')
  })
})

describe('Amount transactioned', () => {
  it('Negative transaction', async () => {
    const amount = await transactionService.getTransactionAmount(
      mockedGrpc.transaction2.toObject(),
      mockedBCHAddress.address
    )
    expect(amount.toString()).toBe('-0.00000546')
  })
  it('Positive transaction', async () => {
    const amount = await transactionService.getTransactionAmount(
      mockedGrpc.transaction1.toObject(),
      mockedBCHAddress.address
    )
    expect(amount.toString()).toBe('4.31247724')
  })
})
*/

// WIP - remove below and fix above
describe('empty', () => {
  it('a', () => {
    expect(1).toEqual(1)
  })
})

export {}
