import routeDispatcher from '../route-dispatcher'
import store from '@/core/store'

import Routes from '@/constants/routes'
import { RouteValue } from '@/types/core'
import { fetchAppDetail, fetchApps, fetchDeveloperApps, fetchFeatureApps } from '@/actions/apps'
import { APPS_PER_PAGE, INSTALLED_APPS_PERPAGE } from '@/constants/paginator'

jest.mock('@reapit/elements')

jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
}))

jest.mock('@/sagas/apps')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(() => ({
    connectSession: () => ({
      loginIdentity: {
        developerId: 'SOME_ID',
        clientId: 'SOME_CLIENT_ID',
      },
    }),
  })),
}))

describe('routeDispatcher', () => {
  it('should dispatch to three endpoints for the APPS route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchDeveloperApps({
        pageNumber: 1,
        pageSize: 9,
        developerId: ['SOME_ID'],
      }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(fetchFeatureApps({ pageNumber: 1, pageSize: 3 }))
    expect(store.dispatch).toHaveBeenCalledWith(fetchApps({ pageNumber: 1, pageSize: 9, isInfinite: true }))
  })

  it('should dispatch to a single endpoint for the APP_DETAIL route', async () => {
    await routeDispatcher(Routes.APP_DETAIL as RouteValue, { appid: 'SOME_ID' })
    expect(store.dispatch).toHaveBeenCalledWith(fetchAppDetail({ id: 'SOME_ID', clientId: 'SOME_CLIENT_ID' }))
  })

  it('should dispatch to a single endpoint for the APP_DETAIL_MANAGE route', async () => {
    await routeDispatcher(Routes.APP_DETAIL_MANAGE as RouteValue, { appid: 'SOME_ID' })
    expect(store.dispatch).toHaveBeenCalledWith(fetchAppDetail({ id: 'SOME_ID', clientId: 'SOME_CLIENT_ID' }))
  })

  it('should dispatch to fetchApps for the INSTALLED_APPS route', async () => {
    await routeDispatcher(Routes.INSTALLED_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchApps({
        pageNumber: 1,
        pageSize: INSTALLED_APPS_PERPAGE,
        onlyInstalled: true,
        isDirectApi: false,
        developerId: undefined,
      }),
    )
  })

  it('should dispatch to fetchApps for the MY_APPS route', async () => {
    await routeDispatcher(Routes.MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchApps({
        pageNumber: 1,
        pageSize: APPS_PER_PAGE,
        onlyInstalled: true,
        developerId: undefined,
      }),
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
