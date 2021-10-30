/* eslint-disable */
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { Schedule } from '@material-ui/icons'
import { httpClient } from 'utils/Api'
import LoadingIndicator from 'components/LoadingIndicator'
import { formatMinute } from 'utils/loadable'
import { useAuth } from 'authentication'
import { useHistory } from 'react-router-dom'

export default function StartTest({ match }) {
   const { id } = match.params
   const [loading, setLoading] = useState(true)
   const [assessment, setAssessment] = useState(null)
   const [starting, setStarting] = useState(false)
   const { authUser } = useAuth()
   const history = useHistory()
   const [index, setIndex] = useState(0)

   const startTest = () => {
      setStarting(true)

      httpClient
         .post('functions/startAssessment', {
            userId: authUser.objectId,
            assessmentId: id,
         })
         .then(({ data }) => {
            let result = data.result

            // expectedEnd = new Date(result.startTime.iso)

            // expectedEnd = new Date(
            //    expectedEnd.getTime() + assessment.duration * 60000,
            // )

            setTimeout(() => {
               history.push(`/session/${result.objectId}`)
            }, 100)
         })
         .catch((error) => {})
         .finally(() => {
            setStarting(false)
         })
   }
   useEffect(() => {
      setLoading(true)
      httpClient
         .get(`classes/Assessment/${id}`)
         .then(({ data }) => {
            if (data) {
               setAssessment(data)
            }
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])
   return (
      <Container className="main">
         {loading && <LoadingIndicator />}
         {assessment && (
            <>
               <Row className="q-col-gutter-md mb-3"></Row>
               <Row className="bg-light mb-3">
                  <Col className="col-12 col-md-9">
                     <Col className="col-12 pt-3 mb-3">
                        <strong>{assessment.title}</strong>
                     </Col>
                     <Col className="col-auto pb-3">{assessment.role}</Col>
                     <Col className="col-auto d-flex align-items-center pb-3">
                        <Schedule className="me-2" />
                        {/* 1h 30m */}
                        {formatMinute(assessment.duration)}
                     </Col>
                  </Col>
                  <Col className="col-12 col-md-3 d-flex align-items-center justify-content-md-end col my-3">
                     <Button className="px-3" onClick={startTest}>
                        {!starting ? 'Start Assignment' : ''}
                        {starting ? (
                           <Spinner
                              as="span"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                           />
                        ) : null}
                     </Button>
                  </Col>
               </Row>
               <Row className="q-col-gutter-md  mb-md-5 ">
                  <Col className="col-12">
                     <div
                        dangerouslySetInnerHTML={{
                           __html: assessment.description,
                        }}
                     ></div>
                  </Col>
               </Row>
            </>
         )}
      </Container>
   )
}
