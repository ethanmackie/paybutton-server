import React from 'react'
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import { PaybuttonList, PaybuttonForm } from 'components/Paybutton'
import { PaybuttonWithAddresses } from 'services/paybuttonService'
import { WalletWithAddressesAndPaybuttons } from 'services/walletService'
import { paybuttonPOSTParameters } from 'utils/validators'
import dynamic from 'next/dynamic'
import supertokensNode from 'supertokens-node'
import * as SuperTokensConfig from '../../config/backendConfig'
import Session from 'supertokens-node/recipe/session'
import { GetServerSideProps } from 'next'

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

interface PaybuttonsProps {
  userId: string
}

interface PaybuttonsState {
  paybuttons: PaybuttonWithAddresses[]
  wallets: WalletWithAddressesAndPaybuttons[]
  error: String
}

export default function Home ({ userId }: PaybuttonsProps): React.ReactElement {
  return (
    <ThirdPartyEmailPasswordAuthNoSSR>
      <ProtectedPage userId={userId} />
    </ThirdPartyEmailPasswordAuthNoSSR>
  )
}

class ProtectedPage extends React.Component<PaybuttonsProps, PaybuttonsState> {
  constructor (props: PaybuttonsProps) {
    super(props)
    this.props = props
    this.state = { paybuttons: [], wallets: [], error: '' }
  }

  async componentDidMount (): Promise<void> {
    await this.fetchPaybuttons()
    await this.fetchWallets()
  }

  async fetchPaybuttons (): Promise<void> {
    const res = await fetch(`/api/paybuttons?userId=${this.props.userId}`, {
      method: 'GET'
    })
    if (res.status === 200) {
      this.setState({
        paybuttons: await res.json()
      })
    }
  }

  async fetchWallets (): Promise<void> {
    const res = await fetch(`/api/wallets?userId=${this.props.userId}`, {
      method: 'GET'
    })
    if (res.status === 200) {
      this.setState({
        wallets: (await res.json()).map(walletWithPaymentInfo => walletWithPaymentInfo.wallet)
      })
    }
  }

  async onSubmit (values: paybuttonPOSTParameters): Promise<void> {
    const res = await fetch('/api/paybutton', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    if (res.status === 200) {
      const json = await res.json()
      this.setState({
        paybuttons: [...this.state.paybuttons, json]
      })
      this.setState({
        error: ''
      })
    } else {
      const json = await res.json()
      this.setState({
        error: json.message
      })
      setTimeout(() => {
        this.setState({
          error: ''
        })
      }, 2500)
    }
  }

  render (): React.ReactElement {
    return (
      <>
        <h2>Buttons</h2>
        <PaybuttonList paybuttons={this.state.paybuttons} />
        <PaybuttonForm onSubmit={this.onSubmit.bind(this)} paybuttons={this.state.paybuttons} wallets={this.state.wallets} error={this.state.error} />
      </>
    )
  }
}
