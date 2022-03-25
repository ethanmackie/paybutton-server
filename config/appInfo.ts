const port = process.env.APP_PORT || 3000

const apiBasePath = '/api/auth/'

export const websiteDomain =
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://localhost:${port}`

export const appInfo = {
  appName: 'PayButton.io',
  websiteDomain,
  apiDomain: websiteDomain,
  apiBasePath,
}
