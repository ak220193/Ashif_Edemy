"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const enrolledCoursesSchema = new mongoose.Schema({
  value: String,
  label: String,
});

const CollageSchema = new Schema({
      SNo: { type: Number, default: null },
      c_id: { type: String, default: ""  },
      State: { type: String, default: ""  },
      college_District: { type: String, default: ""  },
      Yrofestab: { type: Number },
      College_Name: { type: String, default: ""  },
      Specialisation: { type: String, default: ""  },
      Type: { type: String, default: ""  },
      url: { type: String, default: ""  },
      Phone: { type: String, default: ""  },
      Email: { type: String, default: ""  },
      location_coordinates: { type: String, default: ""  },
      Image_Gallery: { type: String, default: ""  },
      Logo: { type: String, default: ""  },
      About: { type: String, default: ""  },
      Updates: { type: String, default: ""  },
      Programmes_Offered: { type: String, default: ""  },
      Admissions: { type: String, default: ""  },
      Placement: { type: String, default: ""  },
      admissio_Test: { type: String, default: ""  },
      Perceptions: { type: String, default: ""  },
      NAAC_Grade_Validity: { type: String, default: ""  },
      Ranking: { type: String, default: ""  },
      fB: { type: String, default: ""  },
      tR: { type: String, default: ""  },
      yT: { type: String, default: ""  },
      iG: { type: String, default: ""  },
      LinkedIn: { type: String, default: ""  },
      coursesOffered: { type: [enrolledCoursesSchema] },
      isTopCol: { type: Boolean, default: false },
      brochureCol: { data: Buffer, contentType: String},
      ownership:{ type: String, default: ""  },
      ruCode:{ type: String, default: ""  },
      collegeAddress:{ type: String, default: ""  },
      village:{ type: String, default: ""  },
      city:{ type: String, default: ""  },
      pinCode:{ type: String, default: ""  },
      affiliatingUnivName:{ type: String, default: ""  },
      affu_id:{ type: String, default: ""  },
      univType:{ type: String, default: ""  },
  },
  {
    timestamps: {
      createdAt: "created_at", 
      updatedAt: "updated_at", 
    },
  }
);

export const collages = mongoose.model("collages", CollageSchema);
