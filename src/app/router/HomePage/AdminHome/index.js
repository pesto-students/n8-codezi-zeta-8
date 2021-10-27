import React, { useEffect, memo } from 'react'
import { Helmet } from 'react-helmet'

import { Button, Container, Table, Col, Row } from 'react-bootstrap'
import { List, Schedule, Person, Add, Search } from '@material-ui/icons'

import { Link } from 'react-router-dom'

import LoadingIndicator from 'components/LoadingIndicator'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useAuth } from 'authentication'

import {
   makeSelectLoading,
   makeSelectError,
   makeSelectAssessments,
   makeSelectDialog,
   makeSelectSubmitting,
} from './selectors'

import AddTest from './AddTest'
import reducer from './reducer'
import saga from './saga'
import {
   loadAssessments,
   openAssessmentDialog,
   closeAssessmentDialog,
   addUpdateAssessment,
} from './actions'

const key = 'adminHome'

export function CreateTest({
   loading,
   // error,
   assessments,
   getAssessments,
   handleOpenAssessmentDialog,
   open,
   handleCloseAssessmentDialog,
   handleAddUpdateAssessment,
   submitting,
}) {
   useInjectReducer({ key, reducer })
   useInjectSaga({ key, saga })

   const { authUser } = useAuth()

   useEffect(() => {
      getAssessments(authUser.objectId)
   }, [])

   return (
      <Container className=" my-3 my-md-5">
         <Helmet>
            <title>Assessment Page </title>
         </Helmet>

         <AddTest
            open={open}
            handleCloseAssessmentDialog={handleCloseAssessmentDialog}
            handleAddUpdateAssessment={handleAddUpdateAssessment}
            authUser={authUser}
            getAssessments={getAssessments}
            submitting={submitting}
         />
         <Row className="mb-3 align-items-center">
            <Col md={6} className=" dashboard-title mb-0">
               Assessments
            </Col>
            <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
               <Button onClick={handleOpenAssessmentDialog}>
                  <Add /> Add
               </Button>
            </Col>
            {/* <Col md={12} className="empty-placeholder">
               <Search />
               No Record found
            </Col> */}
         </Row>

         {!loading && assessments.length === 0 && (
            <Col md={12} className="empty-placeholder">
               <Search />
               No Record found
            </Col>
         )}

         {loading && <LoadingIndicator />}

         {!loading && assessments.length && (
            <Table responsive striped hover className="shadow table-theme">
               <thead>
                  <tr>
                     <th className="pl-0">Assessment name</th>
                     <th className="text-center">Not Attempted</th>
                     <th className="text-center">Completed</th>
                     <th className="text-center">To Evaluate</th>
                  </tr>
               </thead>
               <tbody>
                  {assessments.map((assessment) => (
                     <tr key={assessment.objectId}>
                        <td className="test-lists">
                           <div>
                              <Link
                                 to={`/assessment-detail/${assessment.objectId}`}
                                 className="test-list-title"
                              >
                                 {assessment.title}
                              </Link>
                           </div>
                           <div>
                              <Link
                                 to={`/assessment-detail/${assessment.objectId}`}
                                 className="test-list-desc"
                              >
                                 {assessment.role}
                              </Link>
                           </div>
                           <ul className="test-list-info">
                              <li>
                                 <List />0
                              </li>
                              <li>
                                 <Schedule />
                                 {assessment.duration} m
                              </li>
                              <li>
                                 <Person />
                                 {`${authUser.firstName || ''} ${
                                    authUser.lastName || ''
                                 }`}
                              </li>
                              <li>{assessment.level}</li>
                           </ul>
                        </td>
                        <td className="text-center">0</td>
                        <td className="text-center">0</td>
                        <td className="text-center">0</td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         )}
      </Container>
   )
}

CreateTest.propTypes = {
   loading: PropTypes.bool,
   error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
   assessments: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
   getAssessments: PropTypes.func,
   handleOpenAssessmentDialog: PropTypes.func,
   open: PropTypes.bool,
   handleCloseAssessmentDialog: PropTypes.func,
   handleAddUpdateAssessment: PropTypes.func,
   submitting: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
   assessments: makeSelectAssessments(),
   loading: makeSelectLoading(),
   error: makeSelectError(),
   open: makeSelectDialog(),
   submitting: makeSelectSubmitting(),
})

export function mapDispatchToProps(dispatch) {
   return {
      getAssessments: (userId) => dispatch(loadAssessments(userId)),
      handleOpenAssessmentDialog: (assessment) =>
         dispatch(openAssessmentDialog(assessment)),
      handleCloseAssessmentDialog: (assessment) =>
         dispatch(closeAssessmentDialog(assessment)),
      handleAddUpdateAssessment: (assessment) =>
         dispatch(addUpdateAssessment(assessment)),
   }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, memo)(CreateTest)
