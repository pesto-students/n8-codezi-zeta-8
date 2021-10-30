/* eslint-disable */
import { useState, useEffect } from 'react'
import { Container, Row, Form, Col } from 'react-bootstrap'
import { CheckCircle, Cancel } from '@material-ui/icons'
import { httpClient } from 'utils/Api'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'
import LoadingIndicator from 'components/LoadingIndicator'

export default function Thankyou({ match }) {
   const { id } = match.params
   const [session, setSession] = useState(null)
   const [loading, setLoading] = useState(false)
   const history = useHistory()
   const passingScore = 50

   useEffect(() => {
      setLoading(true)

      httpClient
         .get(`classes/AssessmentResults/${id}`)
         .then(({ data }) => {
            if (data) {
               if (data.status != 0) {
                  data.result = JSON.parse(data.result)
                  setSession(data)
               } else history.push(`/`)
            } else {
               history.push(`/`)
            }
         })
         .finally(() => setLoading(false))
   }, [])
   return (
      <Container className="py-5">
         {loading && <LoadingIndicator />}

         {session && (
            <>
               {session.score >= passingScore && (
                  <Row className=" p-3 mb-5 test-thankyou-score">
                     <Col className="col-12 text-center ">
                        <CheckCircle className="text-success" />
                        <div>Congratulation</div>
                        <p>You Scored {session.score}%</p>
                     </Col>
                  </Row>
               )}

               {session.score < passingScore && (
                  <Row className=" p-3 mb-5 test-thankyou-score-fail">
                     <Col className="col-12 text-center">
                        <CheckCircle className="text-danger" />
                        <div>Oops</div>
                        <p>You Scored {session.score}%</p>
                     </Col>
                  </Row>
               )}

               {session.result &&
                  session.result.length > 0 &&
                  session.result.map((questionAnswer, index) => (
                     <Row
                        key={`${questionAnswer.objectId}-${index}`}
                        className="mb-3"
                     >
                        <Col>
                           <p className="d-flex align-items-center">
                              <span className="d-inline-block me-2">
                                 {index + 1} Question
                              </span>

                              {questionAnswer.answer ==
                                 questionAnswer.userAnswer && (
                                 <CheckCircle className="text-success" />
                              )}

                              {questionAnswer.answer !=
                                 questionAnswer.userAnswer && (
                                 <Cancel className="text-danger" />
                              )}
                           </p>
                           <p>
                              <strong> {questionAnswer.question}</strong>
                           </p>
                           <p
                              dangerouslySetInnerHTML={{
                                 __html: questionAnswer.description,
                              }}
                           />
                        </Col>
                        <Col className="col-auto text-right d-flex align-items-center"></Col>
                        <Col className="col-12 mt-3">
                           {questionAnswer.choices &&
                              questionAnswer.choices.length > 0 && (
                                 <ul className="ans-option-list radio-no-select">
                                    {/* className="wrong-ans" */}
                                    {questionAnswer.choices.map(
                                       (choice, index) => (
                                          <li
                                             key={index}
                                             className={cx('list-choice-item', {
                                                'right-ans':
                                                   index ==
                                                   questionAnswer.answer,
                                                'wrong-ans':
                                                   questionAnswer.userAnswer !=
                                                      questionAnswer.answer &&
                                                   questionAnswer.userAnswer ==
                                                      index,
                                             })}
                                          >
                                             <Form.Check
                                                id="rdo-btn"
                                                type="radio"
                                                label={choice}
                                                className="loginas-input"
                                                name="ans-option"
                                                value="ans-option"
                                             />
                                          </li>
                                       ),
                                    )}
                                 </ul>
                              )}
                        </Col>
                     </Row>
                  ))}
            </>
         )}
      </Container>
   )
}
