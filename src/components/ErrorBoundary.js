import React from 'react'

export default class ErrorBoundary extends React.PureComponent {
   static getDerivedStateFromError() {
      return { hasError: true }
   }

   state = {
      hasError: false,
   }

   render() {
      if (this.state.hasError) {
         return (
            <div style={{ margin: '100px 40px 40px' }}>
               <h2 style={{ fontSize: '24px', lineHeight: '36px' }}>Whoops!</h2>
               <p style={{ color: '#333' }}>
                  Rahil Memon Something went wrong on our side, sorry about
                  that!
                  <br />
                  Try refreshing the page. If you continue to have issues,
                  please contact us.
               </p>
            </div>
         )
      }

      return this.props.children
   }
}
