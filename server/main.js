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

      try {
         let assessmentClass = new Parse.Query('Assessment')
         const object = await assessmentClass.get(assessmentId)
         object.increment('attempted')
         object.save()
      } catch (error) {}

      return await myNewObject.save()
   }
})

Parse.Cloud.define('submitAssessment', async (request) => {
   const sessionId = request.params.sessionId,
      queryClass = new Parse.Query('AssessmentResults'),
      // questionClass = new Parse.Query('Questions'),
      result = JSON.parse(request.params.result)

   let totalScore = 0,
      earnedScore = 0

   for (let i = 0; i < result.length; i++) {
      if (result[i].score) totalScore += result[i].score

      if (result[i].answer == result[i]['userAnswer']) {
         earnedScore += result[i].score
      }
   }

   let score = Math.round((earnedScore * 100) / totalScore)

   const object = await queryClass.get(sessionId)

   object.set('score', score)
   object.set('status', 1)
   object.set('result', request.params.result)
   object.set('assessment', request.params.assessment)

   try {
      await object.save()

      let { assessment } = request.params
      if (assessment) {
         let assessmentClass = new Parse.Query('Assessment')
         const assessmentObj = await assessmentClass.get(assessment.objectId)
         assessmentObj.increment('completed')
         assessmentObj.save()
      }

      return true
   } catch (error) {
      return false
   }
})

Parse.Cloud.afterSave('Questions', function (request) {
   const question = request.object
   // console.log('Assessment inside: ' + question)
   // console.log('assessmentRef  : ' + question.get('assessmentRef'))
   const assessmentId = question.get('assessmentRef').id //question.assessmentRef.objectId;
   //   console.log("assessmentRef  : " + question.assessmentRef);
   // console.log('Assessment  : ' + question.get('assessmentRef').id)
   var queryupdate = new Parse.Query('Assessment')

   queryupdate
      .get(assessmentId)
      .then(function (assessment) {
         assessment.increment('questionCounts')
         return assessment.save()
      })
      .catch((error) => console.log(error))
})
