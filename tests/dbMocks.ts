export const mockedPaybutton = {
  id: 4,
  providerUserId: 'mocked-uid',
  createdAt: new Date('2022-05-27T15:18:42.000Z'),
  updatedAt: new Date('2022-05-27T15:18:42.000Z'),
  addresses: [
    {
      id: 1,
      address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
      createdAt: new Date('2022-05-27T15:18:42.000Z'),
      updatedAt: new Date('2022-05-27T15:18:42.000Z'),
      chainId: 1,
      paybuttonId: 1
    },
    {
      id: 2,
      address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
      createdAt: new Date('2022-05-27T15:18:42.000Z'),
      updatedAt: new Date('2022-05-27T15:18:42.000Z'),
      chainId: 2,
      paybuttonId: 1
    }
  ]
}

export const mockedPaybuttonList = [
  {
    id: 1,
    providerUserId: 'mocked-uid',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    addresses: [
      {
        id: 1,
        address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        chainId: 1,
        paybuttonId: 1,
        chain: {
          id: 1,
          slug: 'bitcoincash',
          title: 'Bitcoin Cash',
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z')
        }
      },
      {
        id: 2,
        address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        chainId: 2,
        paybuttonId: 1,
        chain: {
          id: 2,
          slug: 'ecash',
          title: 'eCash',
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z')
        }
      }
    ]
  },
  {
    id: 2,
    providerUserId: 'mocked-uid',
    createdAt: new Date('2022-05-27T15:18:42.000Z'),
    updatedAt: new Date('2022-05-27T15:18:42.000Z'),
    addresses: [
      {
        id: 3,
        address: 'mockedaddress0nkus8hzv367za28j900c7tv5v8pc',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        chainId: 1,
        paybuttonId: 2,
        chain: {
          id: 1,
          slug: 'bitcoincash',
          title: 'Bitcoin Cash',
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z')
        }
      },
      {
        id: 4,
        address: 'mockedaddress0nkush83z76az28900c7tj5vpc8f',
        createdAt: new Date('2022-05-27T15:18:42.000Z'),
        updatedAt: new Date('2022-05-27T15:18:42.000Z'),
        chainId: 2,
        paybuttonId: 2,
        chain: {
          id: 2,
          slug: 'ecash',
          title: 'eCash',
          createdAt: new Date('2022-05-27T15:18:42.000Z'),
          updatedAt: new Date('2022-05-27T15:18:42.000Z')
        }
      }
    ]
  }
]
