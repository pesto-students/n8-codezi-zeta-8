import { WINDOW_WIDTH } from 'constants/ActionTypes'

export function updateWindowWidth(width) {
   return {
      type: WINDOW_WIDTH,
      width,
   }
}
