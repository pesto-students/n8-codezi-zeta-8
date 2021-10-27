import React, { useEffect, memo } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import LoadingIndicator from 'components/LoadingIndicator'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { Search } from '@material-ui/icons'

import { makeSelectLoading, makeSelectAssessments } from './selectors'

import reducer from './reducer'
import saga from './saga'
import { loadAssessments } from './actions'

const key = 'candidateHome'

export function CandidateHome({
   loading,
   // error,
   assessments,
   getAssessments,
}) {
   useInjectReducer({ key, reducer })
   useInjectSaga({ key, saga })

   useEffect(() => {
      getAssessments()
   }, [])

   return (
      <Container className="main">
         {/* <Breadcrumb className="bg-light breadcrumb-container">
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
         </Breadcrumb> */}
         <Row className="my-3 my-md-5">
            <Col className="col-12 dashboard-title">Assessments</Col>

            {!loading && assessments.length === 0 && (
               <Col md={12} className="empty-placeholder">
                  <Search />
                  No Record found
               </Col>
            )}

            {loading && <LoadingIndicator />}
            {!loading &&
               assessments &&
               assessments.length > 0 &&
               assessments.map((assessment, index) => (
                  <Col
                     key={`${assessment.objectId}${index}`}
                     md={4}
                     className="mb-3"
                  >
                     <Link to={`/start-test/${assessment.objectId}`}>
                        <div className="dashbard-card">
                           <div className="dashbard-card-title">
                              {assessment.title}
                           </div>
                           <div className="dashbard-card-desc">
                              {assessment.role}
                           </div>
                           <Button>Start Test</Button>
                        </div>
                     </Link>
                  </Col>
               ))}
         </Row>
      </Container>
   )
}

CandidateHome.propTypes = {
   loading: PropTypes.bool,
   error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
   assessments: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
   getAssessments: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
   assessments: makeSelectAssessments(),
   loading: makeSelectLoading(),
})

export function mapDispatchToProps(dispatch) {
   return {
      getAssessments: (userId) => dispatch(loadAssessments(userId)),
   }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, memo)(CandidateHome)
