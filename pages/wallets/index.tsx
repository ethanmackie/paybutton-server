import React from 'react'
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import dynamic from 'next/dynamic'
import { XEC_NETWORK_ID, BCH_NETWORK_ID } from 'constants/index'
import supertokensNode from 'supertokens-node'
import * as SuperTokensConfig from '../../config/backendConfig'
import Session from 'supertokens-node/recipe/session'
import { Paybutton } from '@prisma/client'
import { GetServerSideProps } from 'next'
import WalletCard from 'components/Wallet/WalletCard'
import WalletForm from 'components/Wallet/WalletForm'
import { WalletWithAddressesAndPaybuttons, WalletPaymentInfo } from 'services/walletService'

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
  new Promise((resolve, reject) =>
    resolve(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)
  ),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(SuperTokensConfig.backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err: any) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: {} }
    } else {
      throw err
    }
  }

  return {
    props: { userId: session.getUserId() }
  }
}

interface WalletsProps {
  userId: string
}

interface WalletsState {
  walletsWithPaymentInfo: [{wallet: WalletWithAddressesAndPaybuttons, paymentInfo: WalletPaymentInfo}]
  userPaybuttons: Paybutton[]
}

export default function Wallets ({ userId }: WalletsProps): React.ReactElement {
  return (
    <ThirdPartyEmailPasswordAuthNoSSR>
      <ProtectedPage userId={userId} />
    </ThirdPartyEmailPasswordAuthNoSSR>
  )
}

class ProtectedPage extends React.Component<WalletsProps, WalletsState> {
  constructor (props: WalletsProps) {
    super(props)
    this.state = {
      walletsWithPaymentInfo: [],
      userPaybuttons: []
    }
  }

  async componentDidMount (): Promise<void> {
    await this.fetchWallets()
  }

  async fetchWallets (): Promise<void> {
    const walletsResponse = await fetch(`/api/wallets?userId=${this.props.userId}`, {
      method: 'GET'
    })
    const paybuttonsResponse = await fetch(`/api/paybuttons?userId=${this.props.userId}`, {
      method: 'GET'
    })
    if (walletsResponse.status === 200) {
      this.setState({
        walletsWithPaymentInfo: await walletsResponse.json()
      })
    }
    if (paybuttonsResponse.status === 200) {
      this.setState({
        userPaybuttons: await paybuttonsResponse.json()
      })
    }
  }

  render (): React.ReactElement {
    return (
      <>
        <h2>Wallets</h2>
        <div>
        {this.state.walletsWithPaymentInfo.sort((a, b) => {
          /* Sorts in the following order, from first to last, if they exist:
           * Default XEC Wallet, Default BCH Wallet, other wallets.
           */
          const aNetworkId = Number(a.wallet.userProfile?.isDefaultForNetworkId)
          const bNetworkId = Number(b.wallet.userProfile?.isDefaultForNetworkId)
          switch (aNetworkId | bNetworkId) {
            case XEC_NETWORK_ID | BCH_NETWORK_ID:
              return 1
            case BCH_NETWORK_ID | XEC_NETWORK_ID:
              return -1
            default:
              return (bNetworkId - aNetworkId)
          }
        }).map(walletWithPaymentInfo => {
          return <WalletCard wallet={walletWithPaymentInfo.wallet} paymentInfo={walletWithPaymentInfo.paymentInfo} userPaybuttons={this.state.userPaybuttons} />
        }
        )}
        <WalletForm />
        </div>
      </>
    )
  }
}
