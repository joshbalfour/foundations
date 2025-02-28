import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { fetchInstallationsFilterListSuccess, fetchInstallationsFilterListFailed } from '@/actions/installations'
import { fetchInstallationsList, FetchInstallationsListParams } from '@/services/installations'
import { getDeveloperId } from '@/utils/session'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements-legacy'

export const fetchInstallationsFilterListSaga = function* ({ data }) {
  try {
    const developerId = yield call(getDeveloperId)
    const uniqueClientIds = [...new Set(data.clientId)]
    const response = yield call(fetchInstallationsList, { ...data, clientId: uniqueClientIds, developerId })
    yield put(fetchInstallationsFilterListSuccess(response))
  } catch (err) {
    yield put(fetchInstallationsFilterListFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const fetchInstallationsFilterListListen = function* () {
  yield takeLatest<Action<FetchInstallationsListParams>>(
    ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST,
    fetchInstallationsFilterListSaga,
  )
}

export const fetchInstallationsFilterListSagas = function* () {
  yield all([fork(fetchInstallationsFilterListListen)])
}

export default fetchInstallationsFilterListSagas
