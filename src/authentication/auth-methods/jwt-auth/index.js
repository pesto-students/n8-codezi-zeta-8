import { useEffect, useState } from 'react'
import { httpClient, setTokenOnHeader } from 'utils/Api'
import { toast } from 'react-toastify'

export const useProvideAuth = () => {
   const [authUser, setAuthUser] = useState(null)
   const [error, setError] = useState('')
   const [isLoadingUser, setIsLoadingUser] = useState(true)
   const [isLoading, setLoading] = useState(false)

   const fetchStart = () => {
      setLoading(true)
      setError('')
   }

   const fetchSuccess = () => {
      setLoading(false)
      setError('')
   }

   const fetchError = (error) => {
      setLoading(false)
      setError(error)
   }

   const userLogin = (user, callbackFun) => {
      fetchStart()

      httpClient
         .get(`login`, user)
         .then(({ data }) => {
            console.log(data)
            console.log('111111')

            fetchSuccess()
            localStorage.setItem('token', data.sessionToken)
            setAuthUser(data)
            if (callbackFun) callbackFun()
         })
         .catch((error) => {
            if (
               error &&
               error.response &&
               error.response.data &&
               error.response.data.error
            ) {
               toast.error(error.response.data.error, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               })
            }
            fetchError(error.message)
         })
   }

   const userSignup = (user, callbackFun) => {
      fetchStart()
      httpClient
         .post('users', { ...user, username: user.email, active: true })
         .then(({ data }) => {
            console.log(data)
            fetchSuccess()
            localStorage.setItem('token', data.sessionToken)
            setTokenOnHeader(data.sessionToken)
            getAuthUser()
            if (callbackFun) callbackFun()
         })
         .catch(function (error) {
            if (
               error &&
               error.response &&
               error.response.data &&
               error.response.data.error
            ) {
               toast.error(error.response.data.error, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
               })
            }
            fetchError(error.message)
         })
   }

   const userSignOut = (callbackFun) => {
      setTokenOnHeader('')
      localStorage.removeItem('token')
      setAuthUser(false)

      if (callbackFun) callbackFun()
   }

   const getAuthUser = () => {
      fetchStart()
      return httpClient
         .get(`users/me`)
         .then(({ data }) => {
            fetchSuccess()
            setAuthUser(data)
         })
         .catch(function (error) {
            fetchError(error.message)
            setAuthUser(false)
            userSignOut()
         })
   }

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) {
         setIsLoadingUser(false)
         return
      }

      setTokenOnHeader(token)
      getAuthUser().finally(() => {
         setIsLoadingUser(false)
      })
   }, [])

   // Return the user object and auth methods
   return {
      isLoadingUser,
      isLoading,
      authUser,
      error,
      setError,
      setAuthUser,
      getAuthUser,
      userLogin,
      userSignOut,
      userSignup,
   }
}
