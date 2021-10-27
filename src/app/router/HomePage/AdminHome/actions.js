import {
   LOAD_ASSESSMENT_SUCCESS,
   LOAD_ASSESSMENT,
   OPEN_ASSESSMENT_DIALOG,
   CLOSE_ASSESSMENT_DIALOG,
   ADD_UPDATE_ASSESSMENT,
} from './actionType'

export function assessmentsLoaded(assessments) {
   return {
      type: LOAD_ASSESSMENT_SUCCESS,
      assessments,
   }
}

export function loadAssessments(userId) {
   return {
      type: LOAD_ASSESSMENT,
      userId,
   }
}

export function openAssessmentDialog(assessment) {
   return {
      type: OPEN_ASSESSMENT_DIALOG,
      assessment,
   }
}

export function closeAssessmentDialog() {
   return {
      type: CLOSE_ASSESSMENT_DIALOG,
   }
}

export function addUpdateAssessment(assessment) {
   return {
      type: ADD_UPDATE_ASSESSMENT,
      assessment,
   }
}
