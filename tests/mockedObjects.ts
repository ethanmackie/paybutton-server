// Paybutton
// GRPC-BCHRPC
import {
  Transaction,
  UnspentOutput
} from 'grpc-bchrpc-node'

import { Prisma, Price } from '@prisma/client'
import { PaybuttonWithAddresses } from 'services/paybuttonService'
import { WalletWithAddressesWithPaybuttons } from 'services/walletService'
import { USD_QUOTE_ID, CAD_QUOTE_ID, XEC_NETWORK_ID, NETWORK_SLUGS } from 'constants/index'

export const mockedPaybutton: PaybuttonWithAddresses = {
  id: 4,
  providerUserId: 'mocked-uid',
  name: 'mocked-name',
  buttonData: 'mockedData',
  uuid: '730bfa24-eb57-11ec-b722-0242ac150002',
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  walletId: 1,
  addresses: [
    {
      address: {
        id: 1,
        address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        lastSynced: null,
        networkId: 1,
        walletId: 1
      }
    },
    {
      address: {
        id: 2,
        address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        lastSynced: null,
        networkId: 2,
        walletId: 1
      }
    }
  ]
}

export const mockedBCHAddress = {
  id: 1,
  address: 'bitcoincash:qzqh7rwaq9zm4zcv40lh9c9u50gy07gcesdmja8426',
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  networkId: 2,
  lastSynced: null,
  paybuttonId: 1,
  walletId: null
}

export const mockedXECAddress = {
  id: 1,
  address: 'ecash:qrmm7edwuj4jf7tnvygjyztyy0a0qxvl7quss2vxek',
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  lastSynced: null,
  networkId: 1,
  paybuttonId: 1,
  walletId: null
}

export const mockedAddressList = [
  {
    id: 1,
    address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    lastSynced: null,
    networkId: 1,
    walletId: null
  },
  {
    id: 2,
    address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    lastSynced: null,
    networkId: 2,
    walletId: null
  },
  {
    id: 3,
    address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    lastSynced: null,
    networkId: 1,
    walletId: null
  },
  {
    id: 4,
    address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    lastSynced: null,
    networkId: 2,
    walletId: null
  }
]

export const mockedPaybuttonList = [
  {
    id: 1,
    providerUserId: 'mocked-uid',
    name: 'mocked-name-1',
    buttonData: 'mockedData',
    uuid: '730bfa24-eb57-11ec-b722-0242ac150002',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    walletId: null,
    addresses: [
      {
        address: mockedAddressList[0]
      },
      {
        address: mockedAddressList[1]
      }
    ]
  },
  {
    id: 2,
    providerUserId: 'mocked-uid',
    name: 'mocked-name-2',
    buttonData: 'mockedData',
    uuid: '133fb8aa-eb57-11ec-b722-0242ac150002',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    walletId: null,
    addresses: [
      {
        address: mockedAddressList[2]
      },
      {
        address: mockedAddressList[3]
      }
    ]
  },
  mockedPaybutton
]

export const mockedBCHAddressWithPaybutton = { ...mockedBCHAddress } as any
mockedBCHAddressWithPaybutton.paybuttons = [
  {
    paybutton: mockedPaybuttonList[2]
  },
  {
    address: mockedPaybuttonList[3]
  }
]

// Wallet
export const mockedWallet: WalletWithAddressesWithPaybuttons = {
  id: 1,
  createdAt: new Date('2022-09-30T18:01:32.456Z'),
  updatedAt: new Date('2022-09-30T18:01:32.456Z'),
  name: 'mockedWallet',
  providerUserId: 'mocked-uid',
  userProfile: {
    isXECDefault: null,
    isBCHDefault: null,
    userProfileId: 1
  },
  addresses: [
    {
      id: 1,
      address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
      createdAt: new Date('2022-05-27T15:18:42.000Z'),
      updatedAt: new Date('2022-05-27T15:18:42.000Z'),
      networkId: 1,
      walletId: 8,
      lastSynced: new Date('2022-05-27T15:18:42.000Z'),
      paybuttons: [
        {
          paybuttonId: 1,
          addressId: 1,
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z'),
          paybutton: {
            id: 1,
            name: 'Mocked Paybutton 1',
            uuid: 'bfe90894-b1f4-11ed-b556-0242ac120003',
            buttonData: '{"example": "value"}',
            providerUserId: 'dev-uid',
            walletId: 1,
            createdAt: new Date('2022-05-27T15:18:42.000Z'),
            updatedAt: new Date('2022-05-27T15:18:42.000Z')
          }
        },
        {
          paybuttonId: 3,
          addressId: 1,
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z'),
          paybutton: {
            id: 3,
            name: 'Mocked Paybutton 2',
            uuid: 'bfe92acd-b1f4-11ed-b556-0242ac120003',
            buttonData: '{}',
            providerUserId: 'dev-uid',
            walletId: null,
            createdAt: new Date('2022-05-27T15:18:42.000Z'),
            updatedAt: new Date('2022-05-27T15:18:42.000Z')
          }
        }
      ]
    },
    {
      id: 2,
      address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
      createdAt: new Date('2022-05-27T15:18:42.000Z'),
      updatedAt: new Date('2022-05-27T15:18:42.000Z'),
      networkId: 2,
      walletId: 1,
      lastSynced: new Date('2022-05-27T15:18:42.000Z'),
      paybuttons: [
        {
          paybuttonId: 2,
          addressId: 2,
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z'),
          paybutton: {
            id: 2,
            name: 'Mocked Paybutton 3',
            uuid: 'bfe90b48-b1f4-11ed-b556-0242ac120003',
            buttonData: '{}',
            providerUserId: 'dev-uid',
            walletId: 1,
            createdAt: new Date('2022-05-27T15:18:42.000Z'),
            updatedAt: new Date('2022-05-27T15:18:42.000Z')
          }
        },
        {
          paybuttonId: 3,
          addressId: 2,
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z'),
          paybutton: {
            id: 3,
            name: 'Mocked Paybutton 4',
            uuid: 'bfe92acd-b1f4-11ed-b556-0242ac120003',
            buttonData: '{}',
            providerUserId: 'dev-uid',
            walletId: null,
            createdAt: new Date('2022-05-27T15:18:42.000Z'),
            updatedAt: new Date('2022-05-27T15:18:42.000Z')
          }
        }
      ]
    }
  ]
  // "paybuttons": [],
  // "addresses": []
}

export const mockedWalletList = [
  {
    id: 1,
    createdAt: new Date('2022-09-30T18:01:32.456Z'),
    updatedAt: new Date('2022-09-30T18:01:32.456Z'),
    name: 'mockedWallet',
    providerUserId: 'mocked-uid'
  },
  {
    id: 2,
    createdAt: new Date('2022-09-30T18:01:32.456Z'),
    updatedAt: new Date('2022-09-30T18:01:32.456Z'),
    name: 'mockedWallet2',
    providerUserId: 'mocked-uid'
  }
]

export const mockedWalletsOnUserProfile = {
  walletId: 1,
  userProfileId: 1,
  isXECDefault: null,
  isBCHDefault: null,
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z')
}

// Network
export const mockedNetwork = {
  id: 1,
  slug: NETWORK_SLUGS.bitcoincash,
  ticker: 'bch',
  title: 'Bitcoin Cash',
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z')
}

// Transaction
export const mockedPriceOnTransaction = {
  priceId: 1,
  transactionId: 1,
  createdAt: new Date('2022-11-02T15:18:42.000Z'),
  updatedAt: new Date('2022-11-02T15:18:42.000Z'),
  price: {
    id: 1,
    value: new Prisma.Decimal('0.00001759'),
    createdAt: new Date('2022-11-02T15:18:42.000Z'),
    updatedAt: new Date('2022-11-02T15:18:42.000Z'),
    timestamp: 1606632380,
    networkId: 1,
    quoteId: 1
  }
}

export const mockedTransaction = {
  id: 1,
  hash: 'Yh5DRDjd3AarAvQA1nwpPI4daDihY6hQfnMV6UKFqZc=',
  addressId: 1,
  confirmed: true,
  address: {
    id: 1,
    address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
    createdAt: new Date('2022-11-02T15:18:42.000Z'),
    updatedAt: new Date('2022-11-02T15:18:42.000Z'),
    networkId: 1,
    walletId: 1
  },
  amount: new Prisma.Decimal('4.31247724'),
  timestamp: 1657130467,
  prices: [
    mockedPriceOnTransaction
  ]
}

export const mockedTransactionList = [
  {
    id: 1,
    hash: 'Yh5DRDjd3AarAvQA1nwpPI4daDihY6hQfnMV6UKFqZc=',
    confirmed: true,
    addressId: 1,
    amount: new Prisma.Decimal('4.31247724'),
    timestamp: 1657130467
  },
  {
    id: 2,
    hash: 'hh5DRDjd3AarAvQA1nwpPI4daDihY6hQfnMV6UKFqZc=',
    confirmed: true,
    addressId: 1,
    amount: new Prisma.Decimal('1.5'),
    timestamp: 1657130467
  },
  {
    id: 3,
    hash: '5h5DRDjd3AarAvQA1nwpPI4daDihY6hQfnMV6UKFqZc=',
    confirmed: true,
    addressId: 1,
    amount: new Prisma.Decimal('0.2'),
    timestamp: 1657130467
  }
]

// BCH GRPC
export const unspentOutputFromObject = (obj: UnspentOutput.AsObject): UnspentOutput => {
  const uo = new UnspentOutput()
  uo.setPubkeyScript(obj.pubkeyScript)
  uo.setValue(obj.value)
  uo.setIsCoinbase(obj.isCoinbase)
  uo.setBlockHeight(obj.blockHeight)
  return uo
}

const outputFromObject = (obj: Transaction.Output.AsObject): Transaction.Output => {
  const out = new Transaction.Output()
  out.setIndex(obj.index)
  out.setValue(obj.value)
  out.setPubkeyScript(obj.pubkeyScript)
  out.setAddress(obj.address)
  out.setScriptClass(obj.scriptClass)
  out.setDisassembledScript(obj.disassembledScript)
  return out
}

const inputFromObject = (obj: Transaction.Input.AsObject): Transaction.Input => {
  const inp = new Transaction.Input()
  inp.setIndex(obj.index)
  inp.setSignatureScript(obj.signatureScript)
  inp.setSequence(obj.sequence)
  inp.setValue(obj.value)
  inp.setPreviousScript(obj.previousScript)
  inp.setAddress(obj.address)
  return inp
}

export const transactionFromObject = (obj: Transaction.AsObject): Transaction => {
  const t = new Transaction()
  t.setHash(obj.hash)
  t.setVersion(obj.version)
  t.setLockTime(obj.lockTime)
  t.setSize(obj.size)
  t.setTimestamp(obj.timestamp)
  t.setConfirmations(obj.confirmations)
  t.setBlockHeight(obj.blockHeight)
  t.setBlockHash(obj.blockHash)
  t.setOutputsList(obj.outputsList.map((out) => outputFromObject(out)))
  t.setInputsList(obj.inputsList.map((inp) => inputFromObject(inp)))
  return t
}

export const mockedGrpc = {
  transaction1: transactionFromObject({
    hash: 'LUZSpMOab+ZYlyQNxF0XasKpArgQAX633LoA5CBPGgE=',
    version: 1,
    lockTime: 0,
    size: 219,
    timestamp: 1653460454,
    confirmations: 60,
    blockHeight: 741620,
    blockHash: 'jzSPV4kkI3x5Fdoow/ei3f7Zit+oGMYCAAAAAAAAAAA=',
    inputsList: [
      {
        index: 0,
        outpoint: { hash: 'NTkmyHCk82XbV43ew+Ev8mSN6hSF1SNPv2q+9MEVQNw=', index: 2 },
        signatureScript: 'RzBEAiATvPHhB2XZSDBh4qPKGbpZnthiP7b6F5nNq0jl9e9segIgQb/p7YKnBcAkXrn1ePKRQOCb3CS2TqjLl55Q46xLA7FBIQI+0YnB1MWonyW6U8ydXQbD46v80yMEO61nvbuLGgeMlA==',
        sequence: 4294967295,
        value: 5179951,
        previousScript: 'dqkUsDxLgAuwV19sDxHhVVQcwGYaj5qIrA==',
        address: 'qzcrcjuqpwc9whmvpug7z425rnqxvx50ngl60rrjst',
        slpToken: undefined
      },
      {
        index: 1,
        outpoint: { hash: 'cnPvSV4O12UwKBSyPX9RoD+xem14XBlcUFhklAowLjE=', index: 1 },
        signatureScript: 'RzBEAiBVcKX1SZ08kwIvKt+CJCFcq2AMPuJh9xNoZPbFCBtO8AIgDcTg6dy/l8+Se0hD5Fb6zXhaVLZi9JyShl3qlChlCF5BIQNVw6/pYXrkj4YXjrHuzGDWysHPUCvUVptjbOmlkVmamA==',
        sequence: 4294967295,
        value: 546,
        previousScript: 'dqkUi4A+rsJZAKFsCtIAF8coYnYGLEqIrA==',
        address: 'qz9cq04wcfvspgtvptfqq9789p38vp3vfgt3y66gue',
        slpToken: {
          tokenId: 'MS4wCpRkWFBcGVx4bXqxP6BRfz2yFCgwZdcOXknvc3I=',
          amount: '1',
          isMintBaton: false,
          address: 'qz9cq04wcfvspgtvptfqq9789p38vp3vfg820p0gz8',
          decimals: 0,
          slpAction: 10,
          tokenType: 65
        }
      }
    ],
    outputsList: [{
      index: 0,
      value: 431247724,
      pubkeyScript: 'dqkUeCxnbWKveaKpCSRhJC/poE+saL+IrA==',
      address: mockedBCHAddress.address,
      scriptClass: 'pubkeyhash',
      disassembledScript: 'OP_DUP OP_HASH160 782c676d62af79a2a9092461242fe9a04fac68bf OP_EQUALVERIFY OP_CHECKSIG'
    }, {
      index: 1,
      value: 227413293,
      pubkeyScript: 'dqkUokKnAjaab8AVlPxzrrxk1aRq4BOIrA==',
      address: 'qz3y9fczx6dxlsq4jn788t4uvn26g6hqzvrczjuzz2',
      scriptClass: 'pubkeyhash',
      disassembledScript: 'OP_DUP OP_HASH160 a242a702369a6fc01594fc73aebc64d5a46ae013 OP_EQUALVERIFY OP_CHECKSIG'
    }]
  }),
  transaction2: transactionFromObject({
    hash: 'jiZHfE+AohEJglMO29nQ5aTR6F/n4Om2whzEZUiXcHk=',
    version: 2,
    lockTime: 0,
    size: 225,
    timestamp: 1653459437,
    confirmations: 61,
    blockHeight: 741619,
    blockHash: 'A6kjJsl4gaVrY0Z15k0SoRzfKv0Fis8EAAAAAAAAAAA=',
    inputsList: [
      {
        index: 0,
        outpoint: { hash: 'NTkmyHCk82XbV43ew+Ev8mSN6hSF1SNPv2q+9MEVQNw=', index: 2 },
        signatureScript: 'RzBEAiATvPHhB2XZSDBh4qPKGbpZnthiP7b6F5nNq0jl9e9segIgQb/p7YKnBcAkXrn1ePKRQOCb3CS2TqjLl55Q46xLA7FBIQI+0YnB1MWonyW6U8ydXQbD46v80yMEO61nvbuLGgeMlA==',
        sequence: 4294967295,
        value: 5179951,
        previousScript: 'dqkUsDxLgAuwV19sDxHhVVQcwGYaj5qIrA==',
        address: 'qzcrcjuqpwc9whmvpug7z425rnqxvx50ngl60rrjst',
        slpToken: undefined
      },
      {
        index: 1,
        outpoint: { hash: 'cnPvSV4O12UwKBSyPX9RoD+xem14XBlcUFhklAowLjE=', index: 1 },
        signatureScript: 'RzBEAiBVcKX1SZ08kwIvKt+CJCFcq2AMPuJh9xNoZPbFCBtO8AIgDcTg6dy/l8+Se0hD5Fb6zXhaVLZi9JyShl3qlChlCF5BIQNVw6/pYXrkj4YXjrHuzGDWysHPUCvUVptjbOmlkVmamA==',
        sequence: 4294967295,
        value: 546,
        previousScript: 'dqkUi4A+rsJZAKFsCtIAF8coYnYGLEqIrA==',
        address: mockedBCHAddress.address,
        slpToken: {
          tokenId: 'MS4wCpRkWFBcGVx4bXqxP6BRfz2yFCgwZdcOXknvc3I=',
          amount: '1',
          isMintBaton: false,
          address: 'qz9cq04wcfvspgtvptfqq9789p38vp3vfg820p0gz8',
          decimals: 0,
          slpAction: 10,
          tokenType: 65
        }
      }
    ],
    outputsList: []
  })
}

export const mockedUSDPrice = {
  id: 1,
  value: new Prisma.Decimal(10),
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  timestamp: 1653459437,
  networkId: XEC_NETWORK_ID,
  quoteId: USD_QUOTE_ID
}

export const mockedCADPrice = {
  id: 1,
  value: new Prisma.Decimal(18),
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  timestamp: 1653459437,
  networkId: XEC_NETWORK_ID,
  quoteId: CAD_QUOTE_ID
}

export const mockPrices: Price[] = [
  { // XECUSD
    id: 0,
    value: new Prisma.Decimal('0.00004095'),
    createdAt: new Date(),
    updatedAt: new Date(),
    timestamp: 1664593200,
    networkId: 1,
    quoteId: 1
  },
  { // XECCAD
    id: 0,
    value: new Prisma.Decimal('0.00005663'),
    createdAt: new Date(),
    updatedAt: new Date(),
    timestamp: 1664593200,
    networkId: 1,
    quoteId: 2
  },
  { // BCHUSD
    id: 0,
    value: new Prisma.Decimal('117.9081'),
    createdAt: new Date(),
    updatedAt: new Date(),
    timestamp: 1664593200,
    networkId: 2,
    quoteId: 1
  },
  { // BCHCAD
    id: 0,
    value: new Prisma.Decimal('163.0735'),
    createdAt: new Date(),
    updatedAt: new Date(),
    timestamp: 1664593200,
    networkId: 2,
    quoteId: 2
  }
]
