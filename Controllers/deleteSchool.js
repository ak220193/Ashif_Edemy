import { addingSchoolModel } from "../Schema/addSchools.js";
export const DeleteSchool = async (req, res) => {
  try {

    let { SlNo } = req.params;
    SlNo = parseInt(SlNo, 10);
    if (isNaN(SlNo)) {
      return res.status(400).json({ status: 400, message: "Invalid parameter value for SlNo" });
    }
    const deletionResult = await addingSchoolModel.deleteOne({ SlNo: SlNo });
    if (deletionResult.deletedCount > 0) {
      return res.status(200).json({ status: 200, message: "Data deleted", data: deletionResult });
    } else {
      return res.status(404).json({ status: 404, message: "No matching data found for deletion" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message});
  }
};
