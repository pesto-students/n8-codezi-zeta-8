import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import {
   makeStyles,
   Dialog,
   DialogTitle,
   DialogContent,
   IconButton,
   DialogActions,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Close } from '@material-ui/icons'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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

export default function AddTest({
   open,
   assessment = {},
   handleCloseAssessmentDialog,
   handleAddUpdateAssessment,
   authUser,
   getAssessments,
   submitting,
}) {
   const classes = useStyles()

   const [description, setDescription] = useState(
      assessment.description || '<p>Description!</p>',
   )

   const onSubmit = (data) => {
      handleAddUpdateAssessment({
         ...data,
         duration: parseInt(data.duration),
         description,
         userRef: {
            __type: 'Pointer',
            className: '_User',
            objectId: authUser.objectId,
         },
      })
   }

   const {
      register,
      handleSubmit,
      // watch,
      formState: { errors },
   } = useForm({
      defaultValues: {
         title: assessment.title || '',
         role: assessment.role || '',
         duration: assessment.duration || '',
         level: assessment.level || '',
      },
   })

   return (
      <Dialog
         open={!!open}
         classes={{
            paper: classes.dialog,
         }}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>
               {assessment && assessment.objectId
                  ? 'Update Assessment'
                  : ' Create Assessment'}

               <IconButton
                  onClick={handleCloseAssessmentDialog}
                  aria-label="close"
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
               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Title*</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Title"
                     {...register('title', {
                        required: 'This field is required',
                     })}
                  />
                  {errors.title && (
                     <span className="error">{errors.title.message}</span>
                  )}
               </Form.Group>
               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Role*</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Role"
                     {...register('role', {
                        required: 'This field is required',
                     })}
                  />
                  {errors.role && (
                     <span className="error">{errors.role.message}</span>
                  )}
               </Form.Group>

               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Duration(Mins)*</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Duration"
                     {...register('duration', {
                        required: 'This field is required',
                     })}
                  />
                  {errors.duration && (
                     <span className="error">{errors.duration.message}</span>
                  )}
               </Form.Group>

               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Assessment Level*</Form.Label>

                  <Form.Select
                     aria-label="Default select example"
                     {...register('level', {
                        required: 'This field is required',
                     })}
                  >
                     <option value="">select</option>
                     <option value="Easy">Easy </option>
                     <option value="Medium">Medium</option>
                     <option value="Hard">Hard</option>
                  </Form.Select>

                  {errors.level && (
                     <span className="error">{errors.level.message}</span>
                  )}
               </Form.Group>

               <Form.Group className="mb-3" controlId="">
                  <Form.Label>Description</Form.Label>
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
                     }}
                     onBlur={(event, editor) => {
                        // console.log('Blur.', editor)
                     }}
                     onFocus={(event, editor) => {
                        // console.log('Focus.', editor)
                     }}
                  />
               </Form.Group>
            </DialogContent>
            <DialogActions>
               <Button
                  variant="secondary"
                  autoFocus
                  onClick={handleCloseAssessmentDialog}
               >
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
         </form>
      </Dialog>
   )
}
