/* eslint-disable */
import { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Schedule } from '@material-ui/icons'
import { httpClient } from 'utils/Api'
import LoadingIndicator from 'components/LoadingIndicator'

export default function StartTest({ match }) {
   const { id } = match.params

   const [loading, setLoading] = useState(true)
   const [assessment, setAssessment] = useState(null)

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
               <Row className="q-col-gutter-md mb-3">
                  <Col className="col-12 d-flex justify-content-end">
                     <Button className="px-3">Start Assignment</Button>
                  </Col>
               </Row>
               <Row className="bg-light mb-3">
                  <Col className="col-12 pt-3 mb-3">
                     <strong>{assessment.title}</strong>
                  </Col>
                  <Col className="col-auto pb-3">{assessment.role}</Col>
                  <Col className="col-auto d-flex align-items-center pb-3">
                     <Schedule className="me-2" />
                     {/* 1h 30m */}
                     {assessment.duration}
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
