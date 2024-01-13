import { QuizResultsModel } from "../Schema/resultsSchema.js";

export const submitResult = (req, res) => {
    const submittedResults = new QuizResultsModel({
        name: req.body.name,
        phonenum: req.body.phonenum,
        email: req.body.email,
        marks: req.body.marks
    })
    console.log(submittedResults)
    submittedResults.save((err, data) => {
        console.log(data)
        if (err) {
            return res.send(err)
        }
        return res.send(200)
    });
}

export const getResults = (req, res) => {
    QuizResultsModel.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            return res.send({
                status: 200,
                message: "quiz found",
                data: data,
            })
        }
    })
}
