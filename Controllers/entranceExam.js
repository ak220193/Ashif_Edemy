import { EntranceModel } from "../Schema/entranceExamSchema.js";

export const postEntranceExams = (req, res) => {

    const {type, subType, content, date, examLink, examName, endDate, dateofExam, examFee} = req.body;

    const entranceExamDetails = new EntranceModel({
        type, 
        subType, 
        content, 
        date, 
        examLink,
        examName,
        endDate,
        dateofExam,
        examFee
    })

    console.log(entranceExamDetails)

    entranceExamDetails.save((err, data) => {
        if(err) {
            return res.send(err)
        }
        return res.status(200).send({
            message: "Entrance exam details added successfully"
        })
    })
}

export const getEntranceExamsByType = (req, res) => {
    EntranceModel.find({type: req.query.type}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length) {
                return res.send ({
                    status: 200,
                    message: "Content found",
                    data: data
                });
            } else {
                return res.send ({
                    status: 404,
                    message: "content not found"
                })
            }
        }
    })
}

export const getEntranceExamsBySubType = (req, res) => {
    EntranceModel.find({subType: req.query.subType}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length) {
                return res.send ({
                    status: 200,
                    message: "Content found",
                    data: data
                });
            } else {
                return res.send ({
                    status: 404,
                    message: "content not found"
                })
            }
        }
    })
}

export const getEntranceExamsByStateExam = (req, res) => {
    EntranceModel.find({examName: req.query.examName}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            if (data.length) {
                return res.send ({
                    status: 200,
                    message: "Content found",
                    data: data
                });
            } else {
                return res.send ({
                    status: 404,
                    message: "content not found"
                })
            }
        }
    })
}
