import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { Schedule } from '@material-ui/icons'
export default function Test() {
   return (
      <Container className="main">
         <Row className="bg-light mb-3 py-3">
            <Col className=" ">
               <strong>
                  Upixels Back-End Developer (.NET) Hiring TestDraft
               </strong>
            </Col>
            <Col className="col-auto ">
               {' '}
               <div class="question-timer">
                  <Schedule />
                  <div> 5:10 min</div>
               </div>
            </Col>
         </Row>
         <Row className=" mb-3">
            <Col>
               <p>1. Question</p>
               <p>
                  <strong> lorem imposum dolloer sit amit text</strong>
               </p>
            </Col>
            <Col className="col-auto text-right d-flex align-items-center"></Col>
            <Col className="col-12 mt-3">
               <ul className="ans-option-list">
                  <li>
                     <Form.Check
                        id="option1"
                        type="radio"
                        label="Option 1"
                        className="loginas-input"
                        value="candidate"
                        name="ans-option"
                     />
                  </li>
                  <li>
                     <Form.Check
                        id="option2"
                        label="Option 2"
                        type="radio"
                        className="loginas-input"
                        value="candidate"
                        name="ans-option"
                     />
                  </li>
                  <li>
                     {' '}
                     <Form.Check
                        id="option3"
                        label="Option 3"
                        type="radio"
                        className="loginas-input"
                        value="candidate"
                        name="ans-option"
                     />
                  </li>
                  <li>
                     {' '}
                     <Form.Check
                        id="option4"
                        label="Option 4"
                        type="radio"
                        className="loginas-input"
                        value="candidate"
                        name="ans-option"
                     />
                  </li>
               </ul>
            </Col>
         </Row>
         <Row className="mb-3">
            <Col className="col-md-6">
               <Button className="px-3">Back</Button>
            </Col>
            <Col className="col-md-6 d-flex justify-content-end">
               <Button className="px-3 me-3" variant="light">
                  Skip
               </Button>
               <Button className="px-3">Submit</Button>
            </Col>
         </Row>
      </Container>
   )
}
