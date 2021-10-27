/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { LOAD_MY_ASSESSMENT, LOAD_MY_ASSESSMENT_SUCCESS } from './actionType'

// The initial state of the App
export const initialState = {
   loading: false,
   error: false,
   assessments: [],
}

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
   produce(state, (draft) => {
      switch (action.type) {
         case LOAD_MY_ASSESSMENT:
            draft.loading = true
            draft.error = false
            // draft.assessments = []
            break

         case LOAD_MY_ASSESSMENT_SUCCESS:
            draft.assessments = action.assessments
            draft.loading = false
            break
      }
   })

export default homeReducer
