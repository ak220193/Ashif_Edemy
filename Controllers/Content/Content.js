import { contentDetailsSchema } from "../../Schema/ContentSchema.js";

export const uploadContent = (req, res) => {
    const {topic, subject, content} = req.body;
    console.log(req.body)

    const addContent = new contentDetailsSchema({
        topic: topic,
        subject: subject,
        content: content
    });
    addContent.save((err, data) => {
        if (err) {
            res.send(err)
        }
        res.send({
            status: 200,
            message: "content added successfully",
            data: data
        })
    })
}

export const getContent = (req, res) => {
    contentDetailsSchema.find({topic: req.query.topic}, (err, data) => {
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

export const getContentBySubject = (req, res) => {
    contentDetailsSchema.find({subject: req.query.subject}, (err, data) => {
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
