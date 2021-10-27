import produce from 'immer'
import { INIT_URL } from 'constants/ActionTypes'

import { NAV_STYLE, NAV_STYLE_FIXED } from 'constants/ThemeSetting'

export const initialState = {
   navStyle: NAV_STYLE_FIXED,
   themeType: 1,
   initURL: '',
}

const SettingsReducer = (state = initialState, action) =>
   produce(state, (draft) => {
      switch (action.type) {
         case NAV_STYLE:
            draft.navStyle = action.navStyle
            break
         case INIT_URL:
            draft.initURL = action.payload
            break
      }
   })

export default SettingsReducer
