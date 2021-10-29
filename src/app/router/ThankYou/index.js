import { Container, Row, Form, Col } from 'react-bootstrap'
import { CheckCircle, Cancel } from '@material-ui/icons'
// import thankyou from 'thankyou.png'

export default function Thankyou() {
   return (
      // <Container className="main">
      //    <div className="d-flex align-items-center flex-column mb-5">
      //       <img
      //          src={thankyou}
      //          width="300"
      //          height="350"
      //          className="img-fluid"
      //          alt="thankyou"
      //       />
      //       <p className="thankyou-title">
      //          We will sent and result on your email soon.
      //       </p>
      //    </div>
      // </Container>

      <Container className="py-5">
         <Row className=" p-3 mb-5 test-thankyou-score">
            <Col className="col-12  text-center ">
               <CheckCircle className="text-success" />
               <div> Congratulation</div>
               <p>You Scored 50%</p>
            </Col>
         </Row>

         <Row className=" mb-3">
            <Col>
               <p class="d-flex align-items-center">
                  <span class="d-inline-block me-2"> 1 Question</span>
                  <CheckCircle className="text-success" />
               </p>
               <p>
                  <strong>Hello question</strong>
               </p>

               <p>Desc</p>
            </Col>
            <Col className="col-auto text-right d-flex align-items-center"></Col>
            <Col className="col-12 mt-3">
               <ul className="ans-option-list radio-no-select">
                  {/* class="wrong-ans" */}
                  <li>
                     <Form.Check
                        id="rdo-btn"
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option"
                        value="ans-option"
                     />
                  </li>
                  <li class="right-ans">
                     <Form.Check
                        id="rdo-btn"
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option"
                        value="ans-option"
                     />
                  </li>
                  <li>
                     <Form.Check
                        id="rdo-btn"
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option"
                        value="ans-option"
                     />
                  </li>
                  <li>
                     <Form.Check
                        id="rdo-btn"
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option"
                        value="ans-option"
                     />
                  </li>
               </ul>
            </Col>
         </Row>
         <Row className=" mb-3">
            <Col>
               <p class="d-flex align-items-center">
                  <span class="d-inline-block me-2"> 2 Question</span>
                  <Cancel className="text-danger" />
               </p>
               <p class="d-flex align-items-center">
                  <strong>Hello question</strong>
               </p>

               <p>Desc</p>
            </Col>
            <Col className="col-auto text-right d-flex align-items-center"></Col>
            <Col className="col-12 mt-3">
               <ul className="ans-option-list radio-no-select">
                  <li class="right-ans">
                     <Form.Check
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option1"
                     />
                  </li>
                  <li>
                     <Form.Check
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option1"
                     />
                  </li>
                  <li class="wrong-ans">
                     <Form.Check
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option1"
                     />
                  </li>
                  <li>
                     <Form.Check
                        type="radio"
                        label="Hello"
                        className="loginas-input"
                        name="ans-option1"
                     />
                  </li>
               </ul>
            </Col>
         </Row>
      </Container>
   )
}
