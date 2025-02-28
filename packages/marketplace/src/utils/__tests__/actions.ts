import { actionCreator, isType } from '../actions'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { FetchAppsParams } from '@/services/apps'
import { fetchApps, fetchAppsSuccess } from '@/actions/apps'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: FetchAppsParams = {
        pageNumber: 1,
        product: 'agencyCloud',
      }
      const action = { data: actionData, type: 'FETCH_APPS' }
      expect(
        actionCreator<FetchAppsParams>(ActionTypes.FETCH_APPS)({
          pageNumber: 1,
          product: 'agencyCloud',
        }),
      ).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: FetchAppsParams = {
        pageNumber: 1,
        product: 'agencyCloud',
      }
      const action: Action<any> = { data: actionData, type: ActionTypes.FETCH_APPS as 'FETCH_APPS' }
      expect(isType(action, fetchApps)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: ActionTypes.FETCH_APPS as 'FETCH_APPS' }
      expect(isType(anotherAction, fetchAppsSuccess)).toBe(false)
    })
  })
})
