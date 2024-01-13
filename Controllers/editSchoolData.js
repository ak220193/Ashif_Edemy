import { addingSchoolModel } from "../Schema/addSchools.js";
export const editSchool = async (req, res) => {
  try {

    const {
      SlNo, name, code, estdYr, Catagory, address, village, city, pin, district,
      state, location, areaType, principal, url, email, phone, AffiliationBody,
      AfiliationNumber, ClassesFrom, ClassesTo, Mol, streamsOffered, AboutSchool,
      facilities, events, managemnet, gender, AccStatus, schoolArea, facultyStrength,
      studentStrength, des, blogPosts, Gallery, Apply, isTopSchool
    } = req.body.values;
    const result = await addingSchoolModel.updateOne(
      { SlNo },
      { $set: { name, code, estdYr, Catagory, address, village, city, pin, district,
                state, location, areaType, principal, url, email, phone, AffiliationBody,
                AfiliationNumber, ClassesFrom, ClassesTo, Mol, streamsOffered, AboutSchool,
                facilities, events, managemnet, gender, AccStatus, schoolArea, facultyStrength,
                studentStrength, des, blogPosts, Gallery, Apply, isTopSchool } },
      { upsert: true }
    );
    return result.nModified > 0
      ? res.status(200).json({ status: 200, message: "School details updated", data: result })
      : res.status(404).json({ status: 404, message: "No matching school found for update" });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
};
