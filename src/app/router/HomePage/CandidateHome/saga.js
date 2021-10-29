import { put, takeLatest } from 'redux-saga/effects'
import { LOAD_MY_ASSESSMENT } from './actionType'
import { httpClient } from 'utils/Api'
import { assessmentsLoaded } from './actions'

export function* getAssessments() {
   try {
      const response = yield httpClient.get('classes/Assessment')
      if (response.data && response.data.results) {
         response.data.results.sort(function (a, b) {
            var keyA = new Date(a.createdAt),
               keyB = new Date(b.createdAt)
            // Compare the 2 dates
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
         })
         yield put(assessmentsLoaded(response.data.results))
      }

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
