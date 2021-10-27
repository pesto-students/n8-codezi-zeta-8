/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobal = (state) => state.candidateHome || initialState

const makeSelectLoading = () =>
   createSelector(selectGlobal, (globalState) => globalState.loading)

const makeSelectAssessments = () =>
   createSelector(selectGlobal, (globalState) => globalState.assessments)

export { selectGlobal, makeSelectLoading, makeSelectAssessments }
