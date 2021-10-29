import React, { lazy, Suspense } from 'react'

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
   const LazyComponent = lazy(importFunc)
   return (props) => (
      <Suspense fallback={fallback}>
         <LazyComponent {...props} />
      </Suspense>
   )
}

export default loadable

export const formatMinute = (totalMinutes, seconds = false) => {
   if (totalMinutes) {
      let hours = Math.floor(totalMinutes / 60),
         minutes = totalMinutes % 60,
         hFormat = '',
         mFormat = ''

      if (hours) hFormat = `${hours}h `
      if (minutes) mFormat = `${minutes}m`

      return `${hFormat}${mFormat}`
   }
   return '0h'
}
