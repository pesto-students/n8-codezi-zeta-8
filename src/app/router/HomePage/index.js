import { Helmet } from 'react-helmet'
import { useAuth } from 'authentication'

import CandidateHome from './CandidateHome/Loadable.js'
import AdminHome from './AdminHome/Loadable.js'
import GuestHome from './GuestHome/Loadable.js'

export default function HomePage() {
   const { authUser } = useAuth()

   return (
      <>
         <Helmet>
            <title>Home </title>
         </Helmet>
         {authUser ? (
            authUser.userType === 'candidate' ? (
               <CandidateHome />
            ) : (
               <AdminHome />
            )
         ) : (
            <GuestHome />
         )}
      </>
   )
}
