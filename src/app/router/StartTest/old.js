import { Button, Container, Row, Col } from 'react-bootstrap'
import { Schedule } from '@material-ui/icons'
export default function Thankyou() {
   return (
      <Container className="main">
         <Row className="q-col-gutter-md mb-3">
            <Col className="col-12 d-flex justify-content-end">
               <Button className="px-3">Start a Test</Button>
            </Col>
         </Row>
         <Row className="bg-light mb-3">
            <Col className="col-12 pt-3 mb-3">
               <strong>
                  Upixels Back-End Developer (.NET) Hiring TestDraft
               </strong>
            </Col>
            <Col className="col-auto pb-3">Back End Developer</Col>
            <Col className="col-auto d-flex align-items-center pb-3">
               <Schedule className="me-2" />
               1h 30m
            </Col>
         </Row>
         <Row className="q-col-gutter-md  mb-md-5 ">
            <Col className="col-12">
               <div>
                  <p>Dear Candidate,</p>

                  <p>Thank you for applying to XYZ!</p>

                  <p>
                     when you start the assessment, you will find two different
                     tests:
                  </p>
                  <p>
                     One test is to check your HTML, CSS capabilities and second
                     is to test your JavaScript capabilities.
                  </p>

                  <p>
                     You will have 50 minutes for HTML, CSS test and 70 minutes
                     for the JS test so once you start any one test, within the
                     time limit you need to complete the particular test.
                  </p>

                  <p>
                     Overall you will have 12 hours once you start the test so
                     within 12 hours, you need to complete both the tests.
                     (please note - once you start any test, each test would
                     have it's own time limit and after completing the same, you
                     can start another in 12 hours time limit).
                  </p>

                  <p>Feel free to contact us if you have any queries:</p>
                  <p>call: 8866217193</p>
                  <p>email - rmemon122@gmail.com</p>

                  <p>Best of luck!</p>
               </div>
            </Col>
         </Row>
      </Container>
   )
}
