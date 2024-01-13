import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema({
   Title: {
      type: String
   },
   adImage: {
      data: Buffer,
      contentType: String
   },
   catagory: {
      type: String
   },
   subCatagory: {
      type: String
   },
   timeScreening: {
      type: String
   },
   userEmail: {
      type: String
   },
   status: {
      type: Number,
      default: 0
   },
   advertisementID: {
      type: String
   },
   date: {
      type: Date
   }
})

export const AdvertisementModel = new mongoose.model("AddAdverisement", AdvertisementSchema);
