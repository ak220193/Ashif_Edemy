import { addingSchoolModel } from "../Schema/addSchools.js";


const GetSchoolData = async(req, res) => {
  try {

    const page = parseInt(req.query.page, 18) || 1;
    const limit = parseInt(req.query.limit, 18) || 18;
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({ status: 400, message: "Invalid page or limit parameters" });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data = await addingSchoolModel.find().skip(startIndex).limit(endIndex).exec();
    return res.status(200).json({ status: 200, message: "School details", data });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
  }
};

export default GetSchoolData;

