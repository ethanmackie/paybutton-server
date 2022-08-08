export const paybuttons = [
  {
    providerUserId: 'dev-uid',
    name: 'PayButton XEC',
    buttonData: '{"example": "value"}'
  },
  {
    providerUserId: 'dev-uid',
    name: 'Coin Dance BCH',
    buttonData: '{}'
  },
  {
    providerUserId: 'dev-uid',
    name: 'PayButton XEC & Coin Dance BCH',
    buttonData: '{}'
  }
]

export const addresses = [
  {
    address: 'ecash:qrmm7edwuj4jf7tnvygjyztyy0a0qxvl7quss2vxek',
    networkId: 1
  },
  {
    address: 'bitcoincash:qzqh7ej2vz26a9xaxq7capzfwgxt5gem9g8rvfxc5t',
    networkId: 2
  }
]

export const connectors = [
  {
    addressId: 1,
    paybuttonId: 1
  },
  {
    addressId: 2,
    paybuttonId: 2
  },
  {
    addressId: 2,
    paybuttonId: 3
  },
  {
    addressId: 1,
    paybuttonId: 3
  }
]
