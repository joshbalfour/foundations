import { ReapitConnectSession } from '../index'
import { ReapitConnectBrowserSessionInitializers } from '../types'

export const mockLoginIdentity = {
  email: 'name@mail.com',
  name: 'name',
  developerId: 'SOME_DEVELOPER_ID',
  clientId: 'SOME_CLIENT_ID',
  adminId: 'SOME_ADMIN_ID',
  userCode: 'SOME_USER_ID',
  groups: [],
}

export const mockBrowserSession: ReapitConnectSession = {
  accessToken: JSON.stringify({
    exp: Math.round(new Date().getTime() / 1000) + 360, // time now + 6mins - we refresh session if expiry within 5mins
  }),
  refreshToken: 'SOME_REFRESH_TOKEN',
  idToken: JSON.stringify({
    name: mockLoginIdentity.name,
    email: mockLoginIdentity.email,
    'custom:reapit:developerId': mockLoginIdentity.developerId,
    'custom:reapit:clientCode': mockLoginIdentity.clientId,
    'custom:reapit:marketAdmin': mockLoginIdentity.adminId,
    'custom:reapit:userCode': mockLoginIdentity.userCode,
    'cognito:groups': mockLoginIdentity.groups,
  }),
  loginIdentity: mockLoginIdentity,
}

export const mockBrowserInitializers: ReapitConnectBrowserSessionInitializers = {
  connectClientId: 'SOME_CLIENT_ID',
  connectOAuthUrl: 'SOME_URL',
  connectLoginRedirectPath: '/some-route',
  connectLogoutRedirectPath: '/some-other-route',
}

export const setMockBrowserSessionToLocalStorage = (session = mockBrowserSession) => {
  window.localStorage.setItem(
    `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.accessToken`,
    session.accessToken,
  )

  window.localStorage.setItem(
    `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.idToken`,
    session.idToken,
  )

  window.localStorage.setItem(
    `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.refreshToken`,
    session.refreshToken,
  )

  window.localStorage.setItem(
    `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.LastAuthUser`,
    session.loginIdentity.email,
  )
}

export const mockSessionFromLocalStorage = (session = mockBrowserSession) => {
  return {
    loginUser: window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.LastAuthUser`,
    ),
    accessToken: window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.accessToken`,
    ),
    idToken: window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.idToken`,
    ),
    refreshToken: window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${mockBrowserInitializers.connectClientId}.${session.loginIdentity.email}.refreshToken`,
    ),
  }
}

export const mockTokenResponse = {
  access_token: mockBrowserSession.accessToken,
  refresh_token: mockBrowserSession.refreshToken,
  id_token: mockBrowserSession.idToken,
}
