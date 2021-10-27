import { LOAD_MY_ASSESSMENT, LOAD_MY_ASSESSMENT_SUCCESS } from './actionType'

export function assessmentsLoaded(assessments) {
   return {
      type: LOAD_MY_ASSESSMENT_SUCCESS,
      assessments,
   }
}

export function loadAssessments(userId) {
   return {
      type: LOAD_MY_ASSESSMENT,
      userId,
   }
}
