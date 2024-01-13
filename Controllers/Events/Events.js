import { eventModel } from "../../Schema/EventsSchema.js";
import fs from "fs";

export const uploadEvents = (req, res) => {
  const {eventName, eventDescription, eventDate, eventTime, author, status} = req.body
  console.log(req)
      const addImage = new eventModel({
        eventName: eventName,
        eventDescription: eventDescription,
        eventId: Math.floor(1000 + Math.random() * 9000),
        eventDate: eventDate,
        author: author,
        eventTime: eventTime,
        eventImage: {
          data: fs.readFileSync("uploadimage/" + req.file.filename),
          contentType: "image/png"
        },
        status: status
      });
      addImage.save((err, data) => {
        if (err) {
          res.send(err);
        }
        res.send({
          status: 200,
          message: "Posted successfully",
          data: data
        })
      });
    }
