/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import {
   LOAD_ASSESSMENT_SUCCESS,
   LOAD_ASSESSMENT,
   OPEN_ASSESSMENT_DIALOG,
   CLOSE_ASSESSMENT_DIALOG,
   ADD_UPDATE_ASSESSMENT,
   ADD_UPDATE_ASSESSMENT_DONE,
} from './actionType'

// The initial state of the App
export const initialState = {
   loading: false,
   error: false,
   assessments: [],
   dialog: false,
   assessment: {},
   submitting: false,
}

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
   produce(state, (draft) => {
      switch (action.type) {
         case LOAD_ASSESSMENT:
            draft.loading = true
            draft.error = false
            // draft.assessments = []
            break

         case LOAD_ASSESSMENT_SUCCESS:
            draft.assessments = action.assessments
            draft.loading = false
            break

         case OPEN_ASSESSMENT_DIALOG:
            draft.dialog = true
            draft.assessment = action.assessments || {}
            break

         case CLOSE_ASSESSMENT_DIALOG:
            draft.dialog = false
            draft.assessment = {}
            break

         case ADD_UPDATE_ASSESSMENT:
            draft.submitting = true
            break

         case ADD_UPDATE_ASSESSMENT_DONE:
            draft.submitting = false
            break
      }
   })

export default homeReducer
