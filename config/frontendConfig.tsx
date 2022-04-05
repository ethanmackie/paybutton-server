import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'

export let frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        emailVerificationFeature: {
          mode: 'REQUIRED',
        },
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Github.init(),
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Apple.init(),
          ],
        },
      }),
      SessionReact.init(),
    ],
  }
}