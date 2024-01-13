import GenerateSchema from 'generate-schema';
import mongoose from "mongoose" ;
import fs from "fs";
import { collages } from "../../Schema/collageSchema.js";
import  { MongoClient, ObjectId } from 'mongodb';

const postCollage = async (req, res) => {
  try {
    const bodyData = req.body;
    if (bodyData && bodyData.length) {
      const chunkSize = 1000; 
      const failedCollegeNames = [];
      for (let i = 0; i < bodyData.length; i += chunkSize) {
        const chunk = bodyData.slice(i, i + chunkSize).map(data => ({
          SNo: data.SNo || null,
          c_id: data.c_id || "",
          State: data.state || "",
          college_District: data.collegeDistrict || "",
          Yrofestab: data.Yrofestab || "",
          College_Name: data.collegeName || "",
          Specialisation: data.Specialisation || "",
          Type: data.type || "",
          url: data.url || "",
          Phone: data.phone || "",
          Email: data.email || "",
          location_coordinates: data.locationCoordinates || "",
          Image_Gallery: data.Image || "",
          Logo: data.Logo || "",
          About: data.aboutTheCollege || "",
          Updates: data.Updates || "",
          Programmes_Offered: data.Programmes  || "",
          Admissions: data.Admissions || "",
          Placement: data.Placement || "",
          admissio_Test: data.TEST || "",
          Perceptions: data.Perceptions || "",
          NAAC_Grade_Validity: data.NAAC,
          Ranking: data.Ranking || "",
          fB: data.fB || "",
          tR: data.tR || "",
          yT: data.yT || "",
          iG: data.iG || "",
          LinkedIn: data.LinkedIn || "",
          coursesOffered: data.coursesOffered || {},
          isTopCol: data.isTopCol || false,
          brochureCol: data.brochureCol || {},
          ownership: data.ownership || "",
          ruCode: data.ruCode || "",
          collegeAddress: data.collegeAddress || "",
          village: data.village || "",
          city: data.city || "",
          pinCode: data.pinCode || "",
          affiliatingUnivName: data.affiliatingUnivName || "",
          affu_id: data.affu_id || "",
          univType: data.univType || "",
        }));
        const insertResult = await collages.insertMany(chunk);
        const failedInserts = insertResult.filter(result => !result._id);
        if (failedInserts.length) {
          failedCollegeNames.push(...failedInserts.map((_, index) => chunk[index].College_Name));
        }
      }
      if (failedCollegeNames.length) {
        return res.status(200).send("Some college data is not inserted [" + failedCollegeNames.join(', ') + "]");
      } else {
        return res.status(200).json({ success: 'Excel uploaded successfully.' });
      }
    } else {
      return res.status(200).json({ warning: 'Uploaded Excel contains empty values.' });
    }
  } catch (error) {
    console.error('postCollage  --->> ', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const getCollage = async(req, res) => {
  try {

    const { page = 1, limit = 10, searchKey = '' } = req.query;
    const skip = (page - 1) * limit;
    const query = {};

    if (searchKey) {
      query.$or = [
        { college_District: { $regex: new RegExp(searchKey, 'i') } }, 
        { College_Name: { $regex: new RegExp(searchKey, 'i') } },
        { State: { $regex: new RegExp(searchKey, 'i') } },
      ];
    }

    const data = await collages.find(query).skip(skip).limit(parseInt(limit)).exec();

    if (!data || data.length === 0) {
      return res.status(404).send({ status: 404, message: "Collage data not found" });
    }

    return res.status(200).send({ status: 200, message: "Collage details retrieved successfully", data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send({ status: 500, message: "Internal Server Error"});
  }
};

const postCollegeWIthPDF = async(req, res) => {
  try {
    let {
      SNo,c_id, State, college_District, Yrofestab, College_Name, Specialisation, Type, url,
      Phone, Email, location_coordinates, Image_Gallery, Logo, About, Updates, Programmes_Offered,
      Admissions, Placement, admissio_Test, Perceptions, NAAC_Grade_Validity, Ranking, fB, tR, yT,
      iG, LinkedIn, isTopCol, ownership, ruCode, collegeAddress, village, city, pinCode, affiliatingUnivName, affu_id, univType } = req.body;

    const newCollege = new collages({
      SNo,c_id, State, college_District, Yrofestab, College_Name, Specialisation, Type, url,
      Phone, Email, location_coordinates, Image_Gallery, Logo, About, Updates, Programmes_Offered,
      Admissions, Placement, admissio_Test, Perceptions, NAAC_Grade_Validity, Ranking, fB, tR, yT,
      iG, LinkedIn, isTopCol, ownership, ruCode, collegeAddress, village, city, pinCode, affiliatingUnivName, affu_id, univType,
      brochureCol: {
        data: fs.readFileSync("downloadpdfcol/" + req.file.filename),
        contentType: "application/pdf"
      }
    });

    newCollege.save((err, data) => {
      if (err) {
        return res.status(500).send({status: 500, message: "Internal Server Error" });
      }
      return res.send({ status: 200, message: "College added successfully", data: data });
    });

  } catch (error) {
    console.error("Unexpected error: postCollegeWIthPDF ", error);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

const downloadPDF = (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = `downloadpdfcol/${filename}.pdf`;
    if (!filename) {
      return res.status(400).send({ status: 400, message: "Bad Request. Filename is missing." });
    }
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading PDF:", err);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Unexpected error: downloadPDF ", error);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};



const getCollegeById = async (req, res) => {

  try {
    const recordId = req.params.recordId;
    if(ObjectId.isValid(recordId)){

      const data = await collages.findOne({ _id: recordId }).exec();
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

const getRandomCollege = async (req, res) => {

  try {

      const search = req.query.search || null;
      const affu_id = (req.query.affu_id && req.query.affu_id != "" && req.query.affu_id != undefined && req.query.affu_id != 'undefined') ? req.query.affu_id : null;

      console.log('=== affu_idaffu_id ', req.query.affu_id, affu_id)
      let responseData = [];

      if(affu_id){
          responseData = await collages.aggregate([
            { $match: { affu_id: affu_id} },
            { $sample: { size: 20 } }
          ]);
      }else{
        responseData= await collages.aggregate([
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
  postCollage, 
  getCollage, 
  postCollegeWIthPDF, 
  downloadPDF, 
  getRandomCollege, 
  getCollegeById
};

