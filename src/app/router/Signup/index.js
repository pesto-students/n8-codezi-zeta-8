import React, { useState, useRef } from 'react'

// import logo from 'logo.svg'
import { useForm } from 'react-hook-form'
import { useAuth } from 'authentication'
import { Spinner, Button, Form } from 'react-bootstrap'
import { useHistory, Link, useLocation } from 'react-router-dom'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

export default function SignIn() {
   var query = useQuery(),
      type = query.get('type'),
      formInitType = 'candidate'

   if (
      type &&
      (type.toLowerCase() === 'company' || type.toLowerCase() === 'candidate')
   ) {
      formInitType = type.toLowerCase()
   }

   let [initFormType, setinitFormType] = useState(formInitType)

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      defaultValues: {},
   })

   const password = useRef({})
   password.current = watch('password', '')

   const {
      isLoading,
      // error,
      userSignup,
   } = useAuth()
   const history = useHistory()

   const onSubmit = (data) => {
      let finalData = {
         firstName: data.firstName,
         lastName: data.lastName,
         email: data.email,
         password: data.password,
         userType: initFormType,
      }
      userSignup(finalData, () => {
         history.push('/')
      })
   }

   const handleChange = (evt) => {
      setinitFormType(evt.target.value)
   }

   return (
      <div className="accountpage main">
         <div className="loginbox">
            {/* <div className="text-center">
               <img
                  src={logo}
                  width="120"
                  height="30"
                  className="logo mb-5 mx-atuo"
               />
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-group mb-3 d-flex align-items-center justify-content-center">
                  <Form.Check
                     id="Candidate"
                     label="As Candidate"
                     className="loginas-input"
                     value="candidate"
                     checked={initFormType === 'candidate'}
                     onChange={handleChange}
                  />

                  <Form.Check
                     id="Company"
                     label="As Company"
                     className="loginas-input"
                     value="company"
                     checked={initFormType === 'company'}
                     onChange={handleChange}
                  />
               </div>

               <div className="form-group mb-3">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="First Name"
                     {...register('firstName', { required: true })}
                  />
                  {errors.firstName && (
                     <span className="error">This field is required</span>
                  )}
               </div>

               <div className="form-group mb-3">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Last Name"
                  />
               </div>
               <div className="form-group mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Enter Email"
                     {...register('email', {
                        required: 'This field is required',
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: 'invalid email address',
                        },
                     })}
                  />
                  {errors.email && (
                     <span className="error">{errors.email.message}</span>
                  )}
               </div>
               <div className="form-group mb-3">
                  <input
                     type="password"
                     placeholder="Enter Password"
                     className="form-control"
                     {...register('password', {
                        required: 'You must specify a password',
                        minLength: {
                           value: 8,
                           message: 'Password must have at least 8 characters',
                        },
                     })}
                  />
                  {errors.password && (
                     <span className="error">{errors.password.message}</span>
                  )}
               </div>

               <div className="form-group mb-3">
                  <input
                     type="password"
                     placeholder="Confirm Password"
                     className="form-control"
                     name="password_repeat"
                     {...register('password_repeat', {
                        validate: (value) =>
                           value === password.current ||
                           'The passwords do not match',
                     })}
                  />
                  {errors.password_repeat && (
                     <span className="error">
                        {errors.password_repeat.message}
                     </span>
                  )}
               </div>
               <div className="form-group mb-3">
                  <Button className="btn-primary form-control" type="submit">
                     {!isLoading ? 'Sign Up' : ''}
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
               Already have Account? <Link to="/signin">Sign In</Link>
            </div>
         </div>
      </div>
   )
}
