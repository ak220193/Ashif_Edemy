import { eventModel } from "../../Schema/EventsSchema.js";

export const deleteEvent = (req, res) => {
    let {eventId} = req.params
    console.log(eventId)
    eventModel.deleteOne({
      eventId: eventId
    }, (err, data) => {
      return res.send({
          status: 200,
          message: "Data deleted",
          data: data
      });
    })
  }
  