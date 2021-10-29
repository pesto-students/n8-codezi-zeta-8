import { Helmet } from 'react-helmet'
import {
   Switch,
   Route,
   Redirect,
   useLocation,
   useRouteMatch,
} from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import LoadingIndicator from 'components/LoadingIndicator'
import Header from 'components/Header'
import Footer from 'components/Footer'
import HomePage from './router/HomePage/Loadable'
import Signin from './router/Signin/Loadable'
import Signup from './router/Signup/Loadable'
import ThankYou from './router/ThankYou'
import StartTest from './router/StartTest/Loadable'
import TestDetail from './router/TestDetail'
import Test from './router/Test'
import NotFoundPage from 'components/NotFoundPage'
import { useAuth } from 'authentication'
import StartTestOld from './router/StartTest/old'

/* eslint-disable react/jsx-no-duplicate-props */
const RestrictedRoute = ({
   component: Component,
   location,
   authUser,
   ...rest
}) => (
   <Route
      {...rest}
      render={(props) =>
         authUser ? (
            <Component {...props} />
         ) : (
            <Redirect
               to={{
                  pathname: '/signin',
                  state: { from: location },
               }}
            />
         )
      }
   />
)

const AuthRoute = ({ component: Component, location, authUser, ...rest }) => (
   <Route
      {...rest}
      render={(props) =>
         !authUser ? (
            <Component {...props} />
         ) : (
            <Redirect
               to={{
                  pathname: '/',
               }}
            />
         )
      }
   />
)

function App() {
   const { authUser, isLoadingUser } = useAuth()

   const location = useLocation()
   const match = useRouteMatch()

   return isLoadingUser ? (
      <LoadingIndicator />
   ) : (
      <div className="layout">
         <Helmet titleTemplate="%s - Codezi" defaultTitle="Codezi App">
            <meta name="description" content="Codezi App" />
         </Helmet>
         <Header />
         <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/session/:id" component={Test} />
            {/* <Route path="/home" component={Dashboard} /> */}
            <AuthRoute path="/signin" component={Signin} />
            <AuthRoute path="/signup" component={Signup} />
            <RestrictedRoute
               path={`${match.url}`}
               authUser={authUser}
               location={location}
               path="/thankyou"
               component={ThankYou}
            />
            <RestrictedRoute
               path={`${match.url}`}
               authUser={authUser}
               location={location}
               path="/start/:id"
               component={StartTest}
            />
            <RestrictedRoute
               path={`${match.url}`}
               authUser={authUser}
               location={location}
               path="/start-test-old"
               component={StartTestOld}
            />

            <RestrictedRoute
               path={`${match.url}`}
               authUser={authUser}
               location={location}
               path="/assessment-detail/:id"
               component={TestDetail}
            />
            <Route path="" component={NotFoundPage} />
         </Switch>
         <Footer />
      </div>
   )
}

export default App
