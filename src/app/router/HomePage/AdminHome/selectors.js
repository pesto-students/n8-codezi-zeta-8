/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobal = (state) => state.adminHome || initialState

const makeSelectLoading = () =>
   createSelector(selectGlobal, (globalState) => globalState.loading)

const makeSelectSubmitting = () =>
   createSelector(selectGlobal, (globalState) => globalState.submitting)

const makeSelectDialog = () =>
   createSelector(selectGlobal, (globalState) => globalState.dialog)

const makeSelectError = () =>
   createSelector(selectGlobal, (globalState) => globalState.error)

const makeSelectAssessments = () =>
   createSelector(selectGlobal, (globalState) => globalState.assessments)

export {
   selectGlobal,
   makeSelectLoading,
   makeSelectError,
   makeSelectAssessments,
   makeSelectDialog,
   makeSelectSubmitting,
}
