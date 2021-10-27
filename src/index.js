import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from 'utils/history'

import './index.css'
import App from './app'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './authentication'

import configureStore from './appRedux/store'
import ErrorBoundary from 'components/ErrorBoundary'
import { ToastContainer } from 'react-toastify'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'react-toastify/dist/ReactToastify.css'

const initialState = {},
   store = configureStore(initialState, history),
   MOUNT_NODE = document.getElementById('root')

ReactDOM.render(
   <ErrorBoundary>
      <Provider store={store}>
         <AuthProvider>
            <ConnectedRouter history={history}>
               <ToastContainer />
               <App />
            </ConnectedRouter>
         </AuthProvider>
      </Provider>
   </ErrorBoundary>,
   MOUNT_NODE,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
