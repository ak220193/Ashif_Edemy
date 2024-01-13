import { excelToJsonModel } from "../../Schema/excelToJson.js";
// import GenerateSchema from "generate-schema";
// import mongoose from "mongoose";
import fs from "fs";
import  { MongoClient, ObjectId } from 'mongodb';

const postUniversities = (req, res) => {
  // let schema = GenerateSchema.json("trialexceltojson", req.body[0]);
  // const universitiesModel = mongoose.model("trialexceltojson", excelToJsonModel);

  // universitiesModel
  //   .insertMany(req.body)
  //   .then(function (response) {
  //     console.log("Data inserted"); // Success
  //     return res.send("Data inserted");
  //   })
  //   .catch(function (error) {
  //     console.log(error); // Failure
  //   });
  excelToJsonModel.insertMany(req.body)
  .then(function(response){
      console.log("data inserted");
      return res.send("data inserted");
  })
  .catch(function (error) {
      console.log(error);
  });
};

const postFormUniversities = (req, res) => {
  let {
    S_No, 
    State, 
    Type, 
    Yrofestab, 
    Location_Coordinates, 
    Name,
    City,
    District,
    PIN,
    url,
    Phone,
    Village,
    Email,
    Image,
    AboutCollege,
    Logo,
    isTopUniv
  } = req.body;

    const addUniv = new excelToJsonModel({
      S_No, 
      State, 
      Type, 
      Yrofestab, 
      Location_Coordinates, 
      Name,
      City,
      District,
      PIN,
      url,
      Phone,
      Village,
      Email,
      Image,
      AboutCollege,
      Logo,
      isTopUniv,
      brochure: {
        data: fs.readFileSync("downloadpdf/" + req.file.filename),
        contentType: "application/pdf"
      }
    })

    addUniv.save((err, data) => {
      if (err) {
        res.send (err)
      }
      res.send ({
        status: 200,
        message: "University given successfully",
        data: data
      })
    })
}

const getUniversities = async (req, res) => {
  try {
    const page = (req.query.page != 0) ?  req.query.page : 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    console.log('=== skipskipskipskip ', req.query.page, page - 1, skip)
    const data = await excelToJsonModel.find().skip(parseInt(skip)).limit(parseInt(limit)).exec();
    if (!data || data.length === 0) {
      return res.status(404).json({ status: 404, message: "No universities found" });
    }
    return res.status(200).json({ status: 200, message: "Universities details", data: data });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
  }
};
;

const getSelectedUniversity = async (req, res) => {
  try {
    const U_id = req.query.U_id;
    const data = await excelToJsonModel.findOne({ U_id: U_id }).exec();
    if (!data) {
      return res.status(404).json({  status: 404, message: "The entered identifier is invalid" });
    }
    return res.status(200).json({ status: 200, message: "Data is collected", data: data });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message});
  }
};

const getUniversityById = async (req, res) => {

  try {
    const recordId = req.params.recordId;
    if(ObjectId.isValid(recordId)){

      const data = await excelToJsonModel.findOne({ _id: recordId }).exec();
      if (!data) {
        return res.status(404).json({  status: 404, message: "Record Not Found" });
      }
      return res.status(200).json({ status: 200, message: "Successfully Got", data: data });

    }else{
      return res.status(500).json({  status: 500, message: "Internal Server Error" });
    }    

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message});
  }
  
};

const getRandomUniversity = async (req, res) => {

  try {

      const search = req.query.search || null;
      let responseData = [];

      if(search){
          const recordNameRegex = new RegExp(search, 'i'); 
          responseData = await excelToJsonModel.aggregate([
            { $match: { Univ_name: { $regex: recordNameRegex } } },
            { $sample: { size: 20 } }
          ]);
      }else{
        responseData= await excelToJsonModel.aggregate([
            { $sample: { size: 20 } },
          ]);
      }
      
      if (responseData && responseData.length == 0)  {
        return res.status(404).json({  status: 404, message: "Record Not Found" });
      }
      return res.status(200).json({ status: 200, message: "Successfully Got", data: responseData }); 

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message});
  }
  
};


export {
  getUniversities, 
  postUniversities, 
  getSelectedUniversity, 
  getUniversityById, 
  postFormUniversities, 
  getRandomUniversity 
};
