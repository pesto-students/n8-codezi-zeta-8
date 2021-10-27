import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import cc1 from 'cc1.png'
import cm2 from 'cm2.png'
import dv1 from 'dv1.png'

export default function GuestHome() {
   return (
      <>
         <Container fluid className="section main">
            <Row className="main_section">
               <Col className="d-none d-md-flex"></Col>
               <Col className=" main_section_content">
                  <h2 className="heading text-center">
                     Screen Applicants for Free with codezi
                  </h2>
                  <p className="heading_desc text-center">
                     Resumes aren't enough. Use Triplebyte's data-backed
                     assessment to identify skilled applicants before wasting
                     time in tech screens.
                  </p>

                  <div className="d-flex justify-content-between text-left main_section_row">
                     <div className="main_section_column main_section_column_left">
                        <img
                           src={cm2}
                           width="240"
                           height="415"
                           className="main_section_column_thumb"
                           alt="cm2"
                        />
                        <h3>For Companies</h3>
                        <p>
                           We are the market-leading technical interview
                           platform to identify and hire developers wherever
                           they are.
                        </p>
                        <Link to="/signup?type=company">
                           <Button className="btn-theme">Start Hiring</Button>
                        </Link>
                     </div>
                     <div className="main_section_column main_section_column_right order-1">
                        <img
                           src={dv1}
                           width="480"
                           height="271"
                           className="order-2 main_section_column_thumb"
                           alt="dv1"
                        />
                        <h3 className="h2">For Developer</h3>
                        <p className="font-18">
                           Join over developers.practice coding skills, prepare
                           for Interviews and get hired.
                        </p>
                        <Link to="/signup?type=developer">
                           <Button className="btn-theme">Sign Up</Button>
                        </Link>
                     </div>
                  </div>
               </Col>
               <Col className="d-none d-md-flex"></Col>
            </Row>
         </Container>
         <Container fluid className="main bg-gray pb-5">
            <Container className="section mb-md-5">
               <Row className="main_section align-items-center">
                  <Col className="col-12 mb-md-5">
                     <h2 className="heading text-center">
                        Assess candidates throughout the
                        <br /> technical recruiting process.
                     </h2>
                  </Col>
                  <Col className="" md={6}>
                     <img
                        src={cc1}
                        width="693"
                        height="350"
                        className="img-fluid mb-5 mt-3 mt-md-0 mb-md-0"
                        alt="cc1"
                     />
                  </Col>
                  <Col className="col-md-6 pl-md-5">
                     <h3 className="h2">Code Screening</h3>
                     <p className="font-18">
                        Select from 400+ challenges to create and customize code
                        screening assessments for any technical role in minutes.
                        Pick from one of our templates or automate your existing
                        process using our library of challenges and skill-based
                        questions.
                     </p>
                  </Col>
               </Row>
            </Container>
         </Container>
      </>
   )
}
