/* eslint-disable */

import { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Schedule } from '@material-ui/icons'
import { httpClient } from 'utils/Api'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from 'components/LoadingIndicator'
// import thankyou from 'thankyou.png'

export default function Test({ match }) {
   const { id } = match.params
   const [session, setSession] = useState(null)
   const [assessment, setAssessment] = useState(null)
   const [questions, setQuestions] = useState([])
   const [expired, setExpired] = useState(false)
   const [loading, setLoading] = useState(false)
   const [submitting, setSubmitting] = useState(false)
   const [index, setIndex] = useState(0)
   const history = useHistory()
   const [selChoice, setSelChoice] = useState(null)
   const [answers, setAnswers] = useState({})
   // const [isDone, setIsDone] = useState(false)
   const [timerStarted, setTimerStarted] = useState(false)

   useEffect(() => {
      setLoading(true)
      httpClient
         .get(`classes/AssessmentResults/${id}`)
         .then(({ data }) => {
            if (data) {
               if (
                  data.status == 0 &&
                  data.assessmentRef &&
                  data.assessmentRef.objectId
               ) {
                  setSession(data)
                  let promises = []

                  promises.push(
                     httpClient
                        .get(
                           `classes/Assessment/${data.assessmentRef.objectId}`,
                        )
                        .then((response) => {
                           let localAssessment = response.data,
                              startTime = new Date(data.startTime.iso),
                              expectedEnd = new Date(
                                 startTime.getTime() +
                                    localAssessment.duration * 60000,
                              )

                           setAssessment(localAssessment)

                           if (expectedEnd.getTime() < new Date()) {
                              setExpired(true)
                              httpClient.put(
                                 `classes/AssessmentResults/${data.objectId}`,
                                 {
                                    status: 3,
                                 },
                              )
                           }
                        }),
                  )

                  promises.push(
                     httpClient
                        .post('functions/getQuestionsByAssessment', {
                           assessmentId: data.assessmentRef.objectId,
                        })
                        .then(({ data }) => {
                           if (data && data.result) {
                              data.result.sort(function (a, b) {
                                 var keyA = new Date(a.createdAt),
                                    keyB = new Date(b.createdAt)
                                 // Compare the 2 dates
                                 if (keyA < keyB) return 1
                                 if (keyA > keyB) return -1
                                 return 0
                              })

                              setQuestions(data.result)
                           }
                        }),
                  )

                  Promise.all(promises).finally(() => setLoading(false))
               } else {
                  setTimeout(() => {
                     history.push(`/`)
                  }, 0)
               }
            }
         })
         .catch((err) => {
            setLoading(false)
         })
   }, [])

   const [timer, setTimer] = useState(0)

   useEffect(() => {
      if (assessment && session && !expired) startTimer()
   }, [session, assessment])

   const toHHMMSS = (secs) => {
      var sec_num = parseInt(secs, 10)
      var hours = Math.floor(sec_num / 3600)
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60

      return [hours, minutes, seconds]
         .map((v) => (v < 10 ? '0' + v : v))
         .filter((v, i) => v !== '00' || i > 0)
         .join(':')
   }

   const startTimer = () => {
      setInterval(() => {
         if (!session || !assessment || expired) return

         let expectedEnd = new Date(
            new Date(session.startTime.iso).getTime() +
               assessment.duration * 60000,
         )

         let diff = Math.abs(
            Math.round((expectedEnd.getTime() - new Date().getTime()) / 1000),
         )

         setTimer(diff)

         if (!timerStarted) setTimerStarted(true)
      }, 1000)
   }
   const previous = () => {
      if (index != 0) {
         setIndex(index - 1)
         setSelChoice(
            answers.hasOwnProperty(index - 1) ? answers[index - 1] : null,
         )
      }
   }

   const next = () => {
      if (!selChoice) return

      setAnswers(Object.assign({}, answers, { [index]: selChoice }))

      if (index == questions.length - 1) {
         completeTest(true)
      } else {
         setIndex(index + 1)
         setSelChoice(
            answers.hasOwnProperty(index + 1) ? answers[index + 1] : null,
         )
      }
   }

   const completeTest = (confirm = false) => {
      const doSubmit = () => {
         setSubmitting(true)

         let localQuestions = [...questions]

         for (let i = 0; i < localQuestions.length; i++) {
            localQuestions[i]['userAnswer'] = answers[i]
            localQuestions[i]['answer'] = localQuestions[i]['answer'][0] || 0
         }

         httpClient
            .post(`functions/submitAssessment`, {
               sessionId: session.objectId,
               result: JSON.stringify(localQuestions),
               assessment,
            })
            .finally(() => {
               // setIsDone(true)
               setSubmitting(false)
               history.push(`/thankyou/${session.objectId}`)
            })
      }

      if (confirm) {
         window
            .swal({
               title: 'Are you sure you want to submit test?',
               text: '',
               icon: 'warning',
               buttons: true,
               dangerMode: false,
            })
            .then((data) => {
               if (data) doSubmit()
            })
      } else {
         doSubmit()
      }
   }

   const setChoice = (evt) => {
      setSelChoice(evt.target.value)
      setAnswers(Object.assign({}, answers, { [index]: evt.target.value }))
   }

   // if (isDone) {
   //    return (
   //       <div className="d-flex align-items-center flex-column mb-5">
   //          <img
   //             src={thankyou}
   //             width="300"
   //             height="350"
   //             className="img-fluid"
   //             alt="thankyou"
   //          />
   //          <p className="thankyou-title">
   //             We will sent and result on your email soon.
   //          </p>
   //       </div>
   //    )
   // }

   return (
      <Container className="main">
         {loading && <LoadingIndicator />}
         {session && assessment && (
            <>
               <Row className="bg-light mb-3 py-3">
                  <Col className=" ">
                     <strong>{assessment.title}</strong>
                  </Col>
                  <Col className="col-auto ">
                     <div className="question-timer">
                        {timerStarted && (
                           <>
                              <Schedule />
                              <div> {toHHMMSS(timer)}</div>
                           </>
                        )}
                     </div>
                  </Col>
               </Row>

               {expired && (
                  <Col md={12} className="empty-placeholder">
                     <Schedule />
                     <h4 style={{ marginTop: '30px' }}>
                        You Are running out of time.
                     </h4>
                  </Col>
               )}

               {!expired && questions && questions.length > 0 && (
                  <>
                     <Row className=" mb-3">
                        <Col>
                           <p>{index + 1}. Question</p>
                           <p>
                              <strong>{questions[index].question}</strong>
                           </p>

                           {questions[index].description && (
                              <p
                                 dangerouslySetInnerHTML={{
                                    __html: questions[index].description,
                                 }}
                              />
                           )}
                        </Col>
                        <Col className="col-auto text-right d-flex align-items-center"></Col>
                        <Col className="col-12 mt-3">
                           <ul className="ans-option-list">
                              {questions[index].choices.map((choice, index) => (
                                 <li key={index}>
                                    <Form.Check
                                       id={`option${index}`}
                                       type="radio"
                                       label={choice}
                                       className="loginas-input"
                                       name="ans-option"
                                       value={index}
                                       onChange={setChoice}
                                       checked={selChoice == index}
                                    />
                                 </li>
                              ))}
                           </ul>
                        </Col>
                     </Row>
                     <Row className="mb-3">
                        <Col className="col-md-6">
                           <Button
                              className="px-3"
                              onClick={previous}
                              variant="light"
                           >
                              Previous
                           </Button>
                        </Col>
                        <Col className="col-md-6 d-flex justify-content-end">
                           <Button
                              className="px-3 me-3"
                              onClick={() => completeTest(true)}
                           >
                              Finish
                           </Button>
                           <Button
                              onClick={next}
                              className="px-3 ml-3"
                              disabled={selChoice == null}
                           >
                              {!submitting
                                 ? index == questions.length - 1
                                    ? 'Submit'
                                    : 'Next'
                                 : ''}
                              {submitting ? (
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
                  </>
               )}
            </>
         )}
      </Container>
   )
}
