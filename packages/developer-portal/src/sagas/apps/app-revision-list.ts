import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchAppRevisionList, fetchAppRevisionListSuccess, fetchAppRevisionListFailed } from '@/actions/apps'
import { fetchAppRevisionsList, FetchAppRevisionsListParams } from '@/services/apps'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements-legacy'

export const fetchAppRevisionListSaga = function* ({ data }: Action<FetchAppRevisionsListParams>) {
  try {
    const response = yield call(fetchAppRevisionsList, data)
    yield put(fetchAppRevisionListSuccess(response))
  } catch (err) {
    yield put(fetchAppRevisionListFailed(err))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const fetchAppRevisionListListen = function* () {
  yield takeLatest<Action<FetchAppRevisionsListParams>>(fetchAppRevisionList.type, fetchAppRevisionListSaga)
}

const appListSagas = function* () {
  yield all([fork(fetchAppRevisionListListen)])
}

export default appListSagas
