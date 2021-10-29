import produce from 'immer'
import {
   FETCH_ERROR,
   FETCH_START,
   FETCH_SUCCESS,
   HIDE_MESSAGE,
   SHOW_MESSAGE,
} from 'constants/ActionTypes'
import { TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from 'constants/ActionTypes'

export const initialState = {
   error: '',
   loading: false,
   message: '',
   navCollapsed: true,
   width: window.innerWidth,
   pathname: '/',
}

/* eslint-disable default-case, no-param-reassign */
const CommonReducer = (state = initialState, action) =>
   produce(state, (draft) => {
      switch (action.type) {
         case '@@router/LOCATION_CHANGE':
            draft.pathname = action.payload.location.pathname
            draft.navCollapsed = false
            break

         case WINDOW_WIDTH:
            draft.width = action.width
            break

         case TOGGLE_COLLAPSED_NAV:
            draft.navCollapsed = action.navCollapsed
            break

         case FETCH_START:
            draft.error = ''
            draft.message = ''
            draft.loading = true
            break

         case FETCH_SUCCESS:
            draft.error = ''
            draft.message = ''
            draft.loading = false
            break

         case SHOW_MESSAGE:
            draft.error = ''
            draft.message = action.payload
            draft.loading = false
            break

         case FETCH_ERROR:
            draft.loading = false
            draft.error = action.payload
            draft.message = ''
            break

         case HIDE_MESSAGE:
            draft.loading = false
            draft.error = ''
            draft.message = ''
      }
   })

export default CommonReducer
