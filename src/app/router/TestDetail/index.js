/* eslint-disable */
import { useEffect, useState } from 'react'
import { Button, Container, Table, Col, Row, Dropdown } from 'react-bootstrap'
import { Edit, MoreVert, Add, Search } from '@material-ui/icons'
import { useAuth } from 'authentication'
import { httpClient } from 'utils/Api'
import LoadingIndicator from 'components/LoadingIndicator'
import AddTest from '../HomePage/AdminHome/AddTest.js'
import AddUpdateQuestions from './AddUpdateQuestions.js'

export default function CreateTest({ match }) {
   const { id } = match.params
   const { authUser } = useAuth()
   const [loading, setLoading] = useState(true)
   const [assessment, setAssessment] = useState(null)
   const [opeenAssessment, setOpeenAssessment] = useState(false)
   const [submitting, setSubmitting] = useState(false)
   const [loadingQuestions, setLoadingQuestions] = useState(true)
   const [questions, setQuestions] = useState([])
   const [openQuestionDialog, setOpenQuestionDialog] = useState(false)

   useEffect(() => {
      setLoading(true)
      httpClient
         .get(`classes/Assessment/${id}`)
         .then(({ data }) => {
            if (data) {
               setAssessment(data)
               // Loading Que
               setLoadingQuestions(true)
               httpClient
                  .post('functions/getQuestionsByAssessment', {
                     assessmentId: id,
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
                  })
                  .finally(() => {
                     setLoadingQuestions(false)
                  })
            }
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])

   const handleAddUpdateAssessment = (data) => {
      setSubmitting(true)
      httpClient
         .put(`classes/Assessment/${id}`, data)
         .then((response) => {
            httpClient
               .get(`classes/Assessment/${id}`)
               .then(({ data }) => {
                  if (data) setAssessment(data)
               })
               .finally(() => {
                  setOpeenAssessment(false)
               })
         })
         .finally(() => {
            setSubmitting(false)
         })
   }

   const afterSubmit = () => {
      setActiveQuestion(null)

      httpClient
         .post('functions/getQuestionsByAssessment', {
            assessmentId: id,
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
         })
         .finally(() => {})
   }

   const [activeQuestion, setActiveQuestion] = useState(null)
   const editQuestion = (que) => {
      setActiveQuestion(que)
      setOpenQuestionDialog(true)
   }

   const toggleDialog = (val) => {
      setActiveQuestion(null)
      setOpenQuestionDialog(val)
   }
   return (
      <Container className="main">
         {loading && <LoadingIndicator />}

         {assessment && (
            <>
               <AddTest
                  open={opeenAssessment}
                  handleCloseAssessmentDialog={setOpeenAssessment}
                  authUser={authUser}
                  assessment={assessment}
                  handleAddUpdateAssessment={handleAddUpdateAssessment}
                  submitting={submitting}
               />

               <AddUpdateQuestions
                  open={openQuestionDialog}
                  toggleDialog={toggleDialog}
                  id={id}
                  assessment={assessment}
                  afterSubmit={afterSubmit}
                  activeQuestion={activeQuestion}
               />
               <Row className="mb-3 align-items-center">
                  <Col
                     md={9}
                     className=" dashboard-title dashbaord-title-withicon mb-0"
                  >
                     {assessment.title}
                     <Button
                        onClick={setOpeenAssessment}
                        variant="outline-primary"
                        className="btn-outline-primary rounded-circle square-btn mx-3"
                     >
                        <Edit className="" />
                     </Button>
                  </Col>
                  <Col
                     md={3}
                     className="d-flex justify-content-md-end mt-3 mt-md-0"
                  >
                     <Button onClick={setOpenQuestionDialog}>
                        <Add /> Add
                     </Button>
                  </Col>
               </Row>

               {loadingQuestions && <LoadingIndicator />}

               {!loadingQuestions && questions.length == 0 && (
                  <Col md={12} className="empty-placeholder">
                     <Search />
                     No Questions found
                  </Col>
               )}

               {!loadingQuestions && questions.length > 0 && (
                  <Table
                     responsive
                     striped
                     hover
                     className="shadow table-theme"
                  >
                     <thead>
                        <tr>
                           <th>Questions({questions.length})</th>
                           <th className="text-center">Type</th>
                           <th className="text-center">Score</th>
                           {/*<th className="text-center">Sills</th>
                           <th className="text-center">Score</th> */}
                           <th className="text-center">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {questions.map((question, index) => (
                           <tr key={`${question.objectId}-${index}`}>
                              <td>
                                 <div>
                                    <a className="test-list-title">
                                       {question.question}
                                    </a>
                                 </div>
                              </td>

                              <td className="text-center">
                                 {question.questionType}
                              </td>
                              <td className="text-center">{question.score}</td>
                              {/* <td className="text-center">5 mins</td> */}
                              {/* <td className="text-center">N/A</td> */}
                              {/* <td className="text-center">10</td> */}
                              <td className="text-center">
                                 <Dropdown>
                                    <Dropdown.Toggle
                                       variant="secondary"
                                       className="table-action square-btn"
                                       id="dropdown-basic"
                                    >
                                       <MoreVert />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                       onClick={() => editQuestion(question)}
                                    >
                                       <Dropdown.Item>Edit</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               )}
            </>
         )}
      </Container>
   )
}
