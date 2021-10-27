import { put, takeLatest } from 'redux-saga/effects'
import {
   LOAD_ASSESSMENT,
   ADD_UPDATE_ASSESSMENT,
   ADD_UPDATE_ASSESSMENT_DONE,
} from './actionType'
import { httpClient } from 'utils/Api'
import {
   assessmentsLoaded,
   loadAssessments,
   closeAssessmentDialog,
} from './actions'

export function* getAssessments(action) {
   try {
      const response = yield httpClient.post('functions/getMyAssessment', {
         userId: action.userId,
      })

      if (response.data && response.data.result)
         yield put(assessmentsLoaded(response.data.result))

      return response
   } catch (err) {
      return false
   }
}

export function* addUpdateAssessments(action) {
   try {
      const response = yield httpClient.post('classes/Assessment', {
         ...action.assessment,
      })

      yield put(loadAssessments(action.assessment.userRef.objectId))
      yield put(closeAssessmentDialog())

      return response
   } catch (err) {
      return false
   } finally {
      yield put({ type: ADD_UPDATE_ASSESSMENT_DONE })
   }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* assessmentsData() {
   yield takeLatest(LOAD_ASSESSMENT, getAssessments)
   yield takeLatest(ADD_UPDATE_ASSESSMENT, addUpdateAssessments)
}
