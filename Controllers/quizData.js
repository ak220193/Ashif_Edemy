import { addQuizModel } from "../Schema/addQuizSchema.js";

export const quizData = (req, res) => {
  addQuizModel
    .find((err, data) => {
      if (err) {
        res.send(err);
      } else {
        return res.send({
          status: 200,
          message: "quiz found",
          data: data,
        })
      }
    })

};

export const filteredQuiz = (req, res) => {

const TypeOfAssessment = req.query.TypeOfAssessment;

const CourseTitle = req.query.CourseTitle;

const CognitiveLevel  = req.query.CognitiveLevel;

addQuizModel.find(
  {TypeOfAssessment: TypeOfAssessment, 
  CourseTitle: CourseTitle,
  CognitiveLevel: CognitiveLevel
  }, (err, data) => {
    if(err) {
      res.send(err)
  }else {
      if(!data){
          return res.send("the params is not present")
      }
      return res.send({
          status: 200,
          message: "data is collected",
          data: data
      })
    }
  })
}
