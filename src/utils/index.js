export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const convertArrayToObject = (array, key, identifier = '') => {
   if (array === null) {
      return {}
   }

   if (!Array.isArray(array)) {
      return array
   }

   return array.reduce((obj, item) => {
      let itemKey = item[key]

      return {
         ...obj,
         [`${identifier ? identifier + '-' : ''}${itemKey}`]: item,
      }
   }, {})
}

export const isFunction = (functionToCheck) =>
   functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
