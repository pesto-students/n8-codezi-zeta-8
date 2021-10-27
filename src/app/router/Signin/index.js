// import logo from 'logo.svg'
import { useForm } from 'react-hook-form'
import { useAuth } from 'authentication'
import { useHistory } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SignIn() {
   const {
      register,
      handleSubmit,
      // watch,
      formState: { errors },
   } = useForm()

   const {
      isLoading,
      userLogin,
      // error
   } = useAuth()
   const history = useHistory()

   const onSubmit = (data) => {
      userLogin(data, () => {
         history.push('/')
      })
   }

   return (
      <div className="accountpage main">
         <div className="loginbox">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-group mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Enter Email"
                     {...register('email', { required: true })}
                  />
                  {errors.email && (
                     <span className="error">This field is required</span>
                  )}
               </div>
               <div className="form-group mb-3">
                  <input
                     type="password"
                     placeholder="Enter Password"
                     className="form-control"
                     {...register('password', { required: true })}
                  />
                  {errors.password && (
                     <span className="error">This field is required</span>
                  )}
               </div>
               <div className="form-group mb-3">
                  <Button className="btn-primary form-control" type="submit">
                     {!isLoading ? 'Login' : ''}
                     {isLoading ? (
                        <Spinner
                           as="span"
                           animation="border"
                           role="status"
                           aria-hidden="true"
                        />
                     ) : null}
                  </Button>
               </div>
            </form>

            {/* <div className="form-group mb-5 text-center">
               <a href="google.com">Forgot Passowrd?</a>
            </div> */}
            <div className="form-group  text-center">
               Don't have Account? <Link to="/signup">Register</Link>
            </div>
         </div>
      </div>
   )
}
