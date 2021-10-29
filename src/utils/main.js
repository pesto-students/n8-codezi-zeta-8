Parse.Cloud.define('getAssessmentTags', async (request) => {
   const queryAssessmentTags = new Parse.Query('AssessmentTags')
   const resultsAssessmentTags = await queryAssessmentTags.find()
   return resultsAssessmentTags
})

Parse.Cloud.define('getMyAssessment', async (request) => {
   const userId = request.params.userId
   const queryMyAssessment = new Parse.Query('Assessment')
   const userPointer = {
      __type: 'Pointer',
      className: '_User',
      objectId: userId,
   }
   queryMyAssessment.equalTo('userRef', userPointer)
   queryMyAssessment.include('role')
   const resultsMyAssessment = await queryMyAssessment.find()
   return resultsMyAssessment
})

Parse.Cloud.define('getQuestionsByAssessment', async (request) => {
   const assessmentId = request.params.assessmentId,
      queryQuestions = new Parse.Query('Questions'),
      assessmentPointer = {
         __type: 'Pointer',
         className: 'Assessment',
         objectId: assessmentId,
      }

   queryQuestions.equalTo('assessmentRef', assessmentPointer)

   const resultsQuestions = await queryQuestions.find()

   return resultsQuestions
})

Parse.Cloud.define('startAssessment', async (request) => {
   const userId = request.params.userId,
      assessmentId = request.params.assessmentId,
      queryClass = new Parse.Query('AssessmentResults'),
      assessmentPointer = {
         __type: 'Pointer',
         className: 'Assessment',
         objectId: assessmentId,
      },
      userPointer = {
         __type: 'Pointer',
         className: '_User',
         objectId: userId,
      }

   queryClass.equalTo('userRef', userPointer)
   queryClass.equalTo('assessmentRef', assessmentPointer)
   queryClass.equalTo('status', 0)

   const results = await queryClass.find()

   if (results && results.length > 0) {
      let curSession = results[0]
      return curSession
   } else {
      const myNewObject = new Parse.Object('AssessmentResults')
      myNewObject.set('startTime', new Date())
      myNewObject.set('status', 0)
      myNewObject.set('userRef', userPointer)
      myNewObject.set('assessmentRef', assessmentPointer)
      return await myNewObject.save()
   }
})
