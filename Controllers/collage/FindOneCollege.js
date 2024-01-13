import { collages } from "../../Schema/collageSchema.js";
const getSelectedCollege = async (req, res) => {
    try {
        const c_id = req.query.c_id;
        if (!c_id) {
            return res.status(400).send({ status: 400, message: "Bad Request. Missing required parameter: c_id."});
        }
        const data = await collages.findOne({ c_id: c_id });
        if (!data) {
            return res.status(404).send({ status: 404, message: "College not found for the given c_id." });
        }
        return res.send({ status: 200, message: "College data retrieved successfully", data: data });

    } catch (error) {
        console.error("Unexpected error in getSelectedCollege:", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};

export default getSelectedCollege;
