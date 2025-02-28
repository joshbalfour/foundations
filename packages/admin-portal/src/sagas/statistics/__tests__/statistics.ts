import statisticsSagas, { statisticsDataListen, statisticsDataFetch } from '../statistics'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { Action } from '@/types/core'

import { fetchStatisticsSucces, StatisticsRequestParams, fetchStatisticsFailed } from '@/actions/statistics'
import { getDateRange } from '@/utils/statistics'
import { fetchAppsList } from '@/services/apps'
import { notification } from '@reapit/elements-legacy'
import { errorMessages } from '@reapit/utils-common'

jest.mock('@reapit/elements')
jest.mock('@/services/apps')

describe('statisticsDataFetch', () => {
  const params: StatisticsRequestParams = { area: 'APPS', range: 'WEEK' }
  const gen = cloneableGenerator(statisticsDataFetch)({ data: params })
  const queryParams = {} as any
  if (params.range !== 'ALL') {
    const dateRange = getDateRange(params.range)
    queryParams.RegisteredFrom = dateRange.from.toISOString()
    queryParams.RegisteredTo = dateRange.to.toISOString()
  }

  expect(gen.next().value).toEqual(call(fetchAppsList, { pageSize: GET_ALL_PAGE_SIZE, ...queryParams }))

  test('api call success', () => {
    const clone = gen.clone()
    const response = { data: [], totalCount: 0 }
    expect(clone.next(response).value).toEqual(put(fetchStatisticsSucces(response)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail caused by error', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().value).toEqual(put(fetchStatisticsFailed(errorMessages.DEFAULT_SERVER_ERROR)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('statisticsSagas thunks', () => {
  describe('statisticsDataListen', () => {
    it('should request data when called', () => {
      const gen = statisticsDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<StatisticsRequestParams>>(ActionTypes.FETCH_STATISTICS, statisticsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('adminStatsSagas', () => {
    it('should listen data request', () => {
      const gen = statisticsSagas()

      expect(gen.next().value).toEqual(all([fork(statisticsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
