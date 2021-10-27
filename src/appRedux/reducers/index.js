import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import Settings from './Settings'
import Common from './Common'
import history from 'utils/history'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
   const rootReducer = combineReducers({
      router: connectRouter(history),
      settings: Settings,
      common: Common,
      ...injectedReducers,
   })

   return rootReducer
}
