import { ReapitConnectBrowserSession } from '@reapit/connect-session/browser'

export const API_VERSION = '2020-01-31'

export interface StringMap {
  [key: string]: string
}

export const getPlatformHeaders = async (
  reapitConnectBrowserSession: ReapitConnectBrowserSession,
  apiVersion = API_VERSION,
): Promise<StringMap | void> => {
  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (connectSession && connectSession.accessToken) {
    return {
      Authorization: `Bearer ${connectSession.accessToken}`,
      'api-version': apiVersion,
      'Content-Type': 'application/json',
    } as StringMap
  }
  console.error('No valid access token in memory - re-directing to login.')
  return reapitConnectBrowserSession.connectLoginRedirect()
}
