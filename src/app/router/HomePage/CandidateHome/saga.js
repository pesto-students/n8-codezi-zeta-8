import { put, takeLatest } from 'redux-saga/effects'
import { LOAD_MY_ASSESSMENT } from './actionType'
import { httpClient } from 'utils/Api'
import { assessmentsLoaded } from './actions'

export function* getAssessments() {
   try {
      const response = yield httpClient.get('classes/Assessment')
      if (response.data && response.data.results)
         yield put(assessmentsLoaded(response.data.results))

      return response
   } catch (err) {
      return false
   }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* assessmentsData() {
   yield takeLatest(LOAD_MY_ASSESSMENT, getAssessments)
}
