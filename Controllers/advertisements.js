import { AdvertisementModel } from "../Schema/adverisementSchema.js";
import fs from "fs";

export const addAdvertisements = (req, res) => {
    console.log(req)
    const {Title, catagory, subCatagory, timeScreening, userEmail, status} = req.body

    const addAdvertisement = new AdvertisementModel({
        Title: Title,
        catagory: catagory,
        subCatagory: subCatagory,
        timeScreening: timeScreening,
        userEmail: userEmail,
        status: status,
        advertisementID: Math.floor(1000 + Math.random() * 9000),
        adImage: {
            data: fs.readFileSync("AdImages/" + req.file.filename),
            contentType: "image/png"
        },
        date: new Date()
    });
    addAdvertisement.save((err, data) => {
        if (err) {
          res.send(err);
        }
        res.send({
          status: 200,
          message: "Advertisement given successfully",
          data: data
        })
      });
}

export const getAdvertisemnts = (req, res) => {
  AdvertisementModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      return res.send({
        status: 200,
        message: "advertisements found",
        data: data,
      });
    }
  })
}

export const editAdvertisements = (req, res) => {
  const {status, advertisementID} = req.body;
  console.log(req)
  AdvertisementModel.updateOne(
    {advertisementID: advertisementID}, 
    {
      $set: {
        status: status,
        date: new Date()
      },
  },
  { upsert: true },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return res.send({
          status: 200,
          message: "updated advertisements",
          data: data,
        });
      }
    }
  );
};

export const deletAdvertisements = (req, res) => {
  let {advertisementID} = req.params;
  AdvertisementModel.deleteOne({
    advertisementID: advertisementID
  }, (err, data) => {
    return res.send({
      status: 200,
      message: "Advertisement deleted",
      data: data
    })
  })
}
