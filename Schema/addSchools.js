"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const addingSchoolSchema = new Schema(
    {    
        SlNo: { type: Number, default: null },
        name: { type: String, default: "" },
        code: { type: String, default: "" },
        estdYr: { type: Number, default: null },
        Catagory: { type: String, default: "" },
        address: { type: String, default: "" },
        village: { type: String, default: "" },
        city: { type: String, default: "" },
        pin: { type: String, default: "" },
        district: { type: String, default: "" },
        state: { type: String, default: "" },
        location: { type: String, default: "" },
        areaType: { type: String, default: "" },
        principal: { type: String, default: "" },
        url: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        AffiliationBody: { type: String, default: "" },
        AfiliationNumber: { type: String, default: "" },
        ClassesFrom: { type: String, default: "" },
        ClassesTo: { type: String, default: "" },
        Mol: { type: String, default: "" },
        streamsOffered: { type: String, default: "" },
        AboutSchool: { type: String, default: "" },
        facilities: { type: String, default: "" },
        events: { type: String, default: "" },
        managemnet: { type: String, default: "" },
        gender: { type: String, default: "" },
        AccStatus: { type: String, default: "" },
        schoolArea: { type: String, default: "" },
        facultyStrength: { type: String, default: "" },
        studentStrength: { type: String, default: "" },
        des: { type: String, default: "" },
        blogPosts: { type: String, default: "" },
        Gallery: { type: String, default: "" },
        Apply: { type: String, default: "" },
        isTopSchool: { type: Boolean, default: false }
    },
    {
        timestamps: {
          createdAt: "created_at", 
          updatedAt: "updated_at", 
        },
    }
)
export const addingSchoolModel = mongoose.model("list-of-school", addingSchoolSchema);