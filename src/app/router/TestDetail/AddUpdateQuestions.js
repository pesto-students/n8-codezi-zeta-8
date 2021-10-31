/* eslint-disable */
import { useState, useEffect } from 'react'
import {
   makeStyles,
   Dialog,
   DialogTitle,
   DialogContent,
   IconButton,
   DialogActions,
} from '@material-ui/core'

import {
   Button,
   Form,
   Col,
   Row,
   InputGroup,
   FormControl,
   Spinner,
} from 'react-bootstrap'
import { Close } from '@material-ui/icons'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useForm } from 'react-hook-form'
import { httpClient } from 'utils/Api'

const useStyles = makeStyles({
   dialog: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '40%',
      height: '100vh',
      margin: 0,
   },
})

export default function AddUpdateQuestions({
   toggleDialog,
   open,
   id,
   assessment,
   afterSubmit,
   activeQuestion,
}) {
   const classes = useStyles()
   const [submitting, setSubmitting] = useState(false)

   // const handleClickOpen = () => {
   //    toggleDialog(true)
   // }

   const handleClose = () => {
      toggleDialog(false)
   }

   const [answer, setAnswer] = useState(
      activeQuestion && activeQuestion.answer && activeQuestion.answer.length
         ? activeQuestion.answer[0]
         : 0,
   )

   const [description, setDescription] = useState(
      activeQuestion ? activeQuestion.description : '<p>Description!</p>',
   )

   const [ansDescription, setAnsDescription] = useState(
      activeQuestion
         ? activeQuestion.ansDescription
         : '<p>Answer Description!</p>',
   )

   const onSubmit = (data) => {
      setSubmitting(true)

      if (activeQuestion) {
         httpClient
            .put(`classes/Questions/${activeQuestion.objectId}`, {
               assessmentRef: {
                  __type: 'Pointer',
                  className: 'Assessment',
                  objectId: id,
               },
               description,
               ansDescription,
               answer: [answer],
               choices: [
                  data.choice1,
                  data.choice2,
                  data.choice3,
                  data.choice4,
               ],
               question: data.question,
               score: parseInt(data.score),
            })
            .then(({ data }) => {
               if (data) toggleDialog(false)
               afterSubmit()
            })
            .finally(() => {
               setSubmitting(false)
            })
      } else {
         httpClient
            .post('classes/Questions', {
               assessmentRef: {
                  __type: 'Pointer',
                  className: 'Assessment',
                  objectId: id,
               },
               description,
               ansDescription,
               answer: [answer],
               choices: [
                  data.choice1,
                  data.choice2,
                  data.choice3,
                  data.choice4,
               ],
               question: data.question,
               score: parseInt(data.score),
            })
            .then(({ data }) => {
               if (data) toggleDialog(false)
               afterSubmit()
            })
            .finally(() => {
               setSubmitting(false)
            })
      }
   }

   const {
      register,
      handleSubmit,
      // watch,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         // question: activeQuestion ? activeQuestion.question : '',
      },
   })

   useEffect(() => {
      setValue('question', '')
      setValue('score', '')
      setValue('choice1', '')
      setValue('choice2', '')
      setValue('choice3', '')
      setValue('choice4', '')

      if (activeQuestion) {
         setValue('question', activeQuestion.question)
         setValue('score', activeQuestion.score)
         activeQuestion.choices.forEach((choice, index) => {
            setValue(`choice${index + 1}`, choice)
         })
      }
   }, [activeQuestion, open])

   return (
      <Dialog
         open={!!open}
         classes={{
            paper: classes.dialog,
         }}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
               {activeQuestion && activeQuestion.objectId
                  ? 'Update Question'
                  : 'Create Question'}
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     position: 'absolute',
                     right: 8,
                     top: 8,
                     color: (theme) => theme.palette.grey[500],
                  }}
               >
                  <Close />
               </IconButton>
            </DialogTitle>
            <DialogContent>
               <Row>
                  <Col md={12}>
                     <Form.Group className="mb-3" controlId="">
                        <Form.Label>Problem Name*</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Problem Name"
                           name='question"'
                           {...register('question', {
                              required: 'This field is required',
                           })}
                        />
                        {errors.question && (
                           <span className="error">
                              {errors.question.message}
                           </span>
                        )}
                     </Form.Group>
                  </Col>
                  <Col md={12}>
                     <Form.Group className="mb-3" controlId="">
                        <Form.Label>Score*</Form.Label>
                        <Form.Control
                           type="number"
                           placeholder="Score"
                           {...register('score', {
                              required: 'This field is required',
                           })}
                        />
                        {errors.score && (
                           <span className="error">{errors.score.message}</span>
                        )}
                     </Form.Group>
                  </Col>

                  <Col md={12} className="mb-3">
                     <Form.Group className="mb-3" controlId="">
                        <Form.Label>Description*</Form.Label>
                        <CKEditor
                           editor={ClassicEditor}
                           data={description}
                           height="400"
                           onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              // console.log('Editor is ready to use!', editor)
                           }}
                           onChange={(event, editor) => {
                              const data = editor.getData()
                              setDescription(data)
                              //   console.log({ event, editor, data })
                           }}
                           onBlur={(event, editor) => {
                              // console.log('Blur.', editor)
                           }}
                           onFocus={(event, editor) => {
                              // console.log('Focus.', editor)
                           }}
                        />
                     </Form.Group>
                  </Col>
                  <Col md={12}>
                     <p>Choices</p>
                  </Col>
                  <Col md={6}>
                     <InputGroup className="mb-3">
                        <span className="ans-label">A</span>
                        <InputGroup.Radio
                           name="groupOptions"
                           aria-label="Radio button for following text input"
                           value="0"
                           checked={answer == 0}
                           onChange={(evt) => setAnswer(evt.target.value)}
                        />

                        <FormControl
                           placeholder="Option 1"
                           as="textarea"
                           aria-label="Text input with radio button"
                           {...register('choice1', {
                              required: 'This field is required',
                           })}
                        />
                     </InputGroup>
                     {errors.choice1 && (
                        <span className="error">{errors.choice1.message}</span>
                     )}
                  </Col>
                  <Col md={6}>
                     <InputGroup className="mb-3">
                        <span className="ans-label">B</span>
                        <InputGroup.Radio
                           name="groupOptions"
                           aria-label="Radio button for following text input"
                           value="1"
                           checked={answer == 1}
                           onChange={(evt) => setAnswer(evt.target.value)}
                        />
                        <FormControl
                           placeholder="Option 2"
                           as="textarea"
                           aria-label="Text input with radio button"
                           {...register('choice2', {
                              required: 'This field is required',
                           })}
                        />
                     </InputGroup>
                     {errors.choice2 && (
                        <span className="error">{errors.choice2.message}</span>
                     )}
                  </Col>
                  <Col md={6}>
                     <InputGroup className="mb-3">
                        <span className="ans-label">C</span>
                        <InputGroup.Radio
                           name="groupOptions"
                           aria-label="Radio button for following text input"
                           value="2"
                           checked={answer == 2}
                           onChange={(evt) => setAnswer(evt.target.value)}
                        />
                        <FormControl
                           placeholder="Option 3"
                           as="textarea"
                           aria-label="Text input with radio button"
                           {...register('choice3', {
                              required: 'This field is required',
                           })}
                        />
                     </InputGroup>
                     {errors.choice3 && (
                        <span className="error">{errors.choice3.message}</span>
                     )}
                  </Col>
                  <Col md={6}>
                     <InputGroup className="mb-3">
                        <span className="ans-label">D</span>
                        <InputGroup.Radio
                           name="groupOptions"
                           aria-label="Radio button for following text input"
                           value="3"
                           checked={answer == 3}
                           onChange={(evt) => setAnswer(evt.target.value)}
                        />
                        <FormControl
                           placeholder="Option 4"
                           as="textarea"
                           aria-label="Text input with radio button"
                           {...register('choice4', {
                              required: 'This field is required',
                           })}
                        />
                     </InputGroup>
                     {errors.choice3 && (
                        <span className="error">{errors.choice4.message}</span>
                     )}
                  </Col>

                  <Col md={12} className="mb-3">
                     <Form.Group className="mb-3" controlId="">
                        <Form.Label>Answer Description</Form.Label>
                        <CKEditor
                           editor={ClassicEditor}
                           data={ansDescription}
                           height="400"
                           onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              // console.log('Editor is ready to use!', editor)
                           }}
                           onChange={(event, editor) => {
                              const data = editor.getData()
                              setAnsDescription(data)
                              // console.log({ event, editor, data })
                           }}
                           onBlur={(event, editor) => {
                              // console.log('Blur.', editor)
                           }}
                           onFocus={(event, editor) => {
                              // console.log('Focus.', editor)
                           }}
                        />
                     </Form.Group>
                  </Col>
               </Row>
            </DialogContent>
            <DialogActions className="d-flex justify-content-between">
               <Button variant="outlined" onClick={handleClose}>
                  Cancel
               </Button>
               <Button type="submit">
                  {!submitting ? 'Save' : ''}
                  {submitting ? (
                     <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                     />
                  ) : null}
               </Button>
            </DialogActions>
            {/* <DialogActions></DialogActions> */}
         </form>
      </Dialog>
   )
}
