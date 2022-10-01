import * as networkService from 'services/networkService'
import { Paybutton } from '@prisma/client'
import prisma from 'prisma/clientInstance'
import { RESPONSE_MESSAGES } from 'constants/index'

export interface CreatePaybuttonInput {
  userId: string
  name: string
  buttonData: string
  prefixedAddressList: string[]
}

export async function createPaybutton (values: CreatePaybuttonInput): Promise<Paybutton> {
  const addresses = await Promise.all(
    values.prefixedAddressList.map(
      async (addressWithPrefix) => {
        const prefix = addressWithPrefix.split(':')[0].toLowerCase()
        const network = await networkService.getNetworkFromSlug(prefix)
        if (network === null) throw new Error(RESPONSE_MESSAGES.INVALID_NETWORK_SLUG_400.message)
        return {
          address: addressWithPrefix.toLowerCase(),
          networkId: Number(network.id)
        }
      })
  )
  return await prisma.paybutton.create({
    data: {
      providerUserId: values.userId,
      name: values.name,
      buttonData: values.buttonData,
      addresses: {
        create: addresses.map((address) => {
          return {
            address: {
              connectOrCreate: {
                where: { address: address.address },
                create: address
              }
            }
          }
        })
      }
    },
    include: {
      addresses: {
        select: {
          address: true
        }
      }
    }
  })
}

export async function fetchPaybuttonById (paybuttonId: number | string): Promise<Paybutton | null> {
  return await prisma.paybutton.findUnique({
    where: { id: Number(paybuttonId) },
    include: {
      addresses: {
        select: {
          address: true
        }
      }
    }
  })
}

export async function fetchPaybuttonArrayByUserId (userId: string): Promise<Paybutton[]> {
  return await prisma.paybutton.findMany({
    where: { providerUserId: userId },
    include: {
      addresses: {
        select: {
          address: true
        }
      }
    }
  })
}