import { ReapitConnectSession } from '@reapit/connect-session'

export const auth: ReapitConnectSession = {
  accessToken: '1231231',
  idToken: '1231321',
  loginIdentity: {
    adminId: '1',
    clientId: '1',
    developerId: '1',
    email: '123',
    groups: [
      'AgencyCloudDeveloperEdition',
      'OrganisationAdmin',
      'ReapitUser',
      'ReapitDeveloper',
      'ReapitDeveloperAdmin',
    ],
    userCode: '123',
    name: '1312',
    orgName: 'Reapit Ltd',
    orgId: 'SOME_ORG_ID',
    offGroupIds: 'MKV',
    offGrouping: true,
    offGroupName: 'Cool Office Group',
    officeId: 'MVK',
    orgProduct: 'agencyCloud',
  },
  refreshToken: '131',
}
