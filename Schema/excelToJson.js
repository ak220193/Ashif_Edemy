"use strict";
import mongoose from "mongoose";
const { Schema } = mongoose;

const enrolledCoursesSchema = new mongoose.Schema({
  value: String,
  label: String,
});

const excelToJsonSchema = new Schema(
  {
      S_No: { type: Number, default: null },
      U_id: { type: String, default: ""  },
      State: { type: String, default: ""  },
      Type: { type: String, default: ""  },
      Yrofestab:{ type:  mongoose.Mixed },
      Location_Coordinates: { type: String, default: ""  },
      Univ_name: { type: String, default: ""  },
      City: { type: String, default: ""  },
      District: { type: String, default: ""  },
      PIN: { type: mongoose.Mixed },
      url: { type: String, default: ""  },
      Phone: { type: String, default: ""  },
      Village: { type: String, default: ""  },
      Specialised: { type: String, default: ""  },
      UorR: { type: String, default: ""  },
      Email: { type: String, default: ""  },
      Image: { type: String, default: ""  },
      Logo: { type: String, default: ""  },
      AboutCollege: { type: String, default: ""  },
      coursesOffered: { type: [enrolledCoursesSchema] },
      isTopUniv: { type: Boolean, default: false},
      brochure: { data: Buffer, contentType: String }
  },
  {
      timestamps: {
        createdAt: "created_at", 
        updatedAt: "updated_at", 
      },
  }
);

export const excelToJsonModel = mongoose.model("trialexceltojson", excelToJsonSchema);
