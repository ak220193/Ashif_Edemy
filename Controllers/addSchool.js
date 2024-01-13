import { addingSchoolModel } from "../Schema/addSchools.js";
import GenerateSchema from 'generate-schema';
import mongoose from "mongoose";
import  { MongoClient, ObjectId } from 'mongodb';

const AddSchoolData = async (req, res) => {
  try {

    const bodyData = req.body;
    if (bodyData && bodyData.length) {
      const chunkSize = 1000; 
      const failedSchoolsName = [];
      for (let i = 0; i < bodyData.length; i += chunkSize) {
        const chunk = bodyData.slice(i, i + chunkSize).map(data => ({
            SlNo: data.SlNo || null, 
            name: data.name || "",
            code: data.code || "",
            estdYr: data.estdYr || null,
            Catagory: data.Catagory || "",
            address: data.address || "",
            village: data.village || "",
            city: data.city || "",
            pin: data.pin || "",
            district: data.district || "",
            state: data.state || "",
            location: data.location || "",
            areaType: data.areaType || "",
            principal: data.principal || "",
            url: data.url || "",
            email: data.email || "",
            phone: data.phone || "",
            AffiliationBody: data.AffiliationBody || "",
            AfiliationNumber: data.AfiliationNumber || "",
            ClassesFrom: data.ClassesFrom || "",
            ClassesTo: data.ClassesTo || "",
            Mol: data.Mol || "",
            streamsOffered: data.streamsOffered || "",
            AboutSchool: data.AboutSchool || "",
            facilities: data.facilities || "",
            events: data.events || "",
            managemnet: data.managemnet || "",
            gender: data.gender || "",
            AccStatus: data.AccStatus || "",
            schoolArea: data.schoolArea || "",
            facultyStrength: data.facultyStrength || "",
            studentStrength: data.studentStrength || "",
            des: data.des || "",
            blogPosts: data.blogPosts || "",
            Gallery: data.Gallery || "",
            Apply: data.Apply || "",
            isTopSchool: data.isTopSchool || false 
        }));
        const insertResult = await addingSchoolModel.insertMany(chunk);
        const failedInserts = insertResult.filter(result => !result._id);
        if (failedInserts.length) {
          failedSchoolsName.push(...failedInserts.map((_, index) => chunk[index].name));
        }
      }
      if (failedSchoolsName.length) {
        return res.status(200).send("Some school data is not inserted [" + failedSchoolsName.join(', ') + "]");
      } else {
        return res.status(200).json({ success: 'Excel uploaded successfully.' });
      }
    } else {
      return res.status(200).json({ warning: 'Uploaded Excel contains empty values.' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
};


const getSchoolById = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    if(ObjectId.isValid(recordId)){

      const data = await addingSchoolModel.findOne({ _id: recordId }).exec();
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

const getRandomSchool = async (req, res) => {

  try {
      const search = req.query.search || null;
      let responseData = [];
      if(search){
          const recordNameRegex = new RegExp(search, 'i'); 
          responseData = await addingSchoolModel.aggregate([
            { $match: { name: { $regex: recordNameRegex } } },
            { $sample: { size: 20 } }
          ]);
      }else{
        responseData= await addingSchoolModel.aggregate([
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
  AddSchoolData,
  getSchoolById,
  getRandomSchool
}