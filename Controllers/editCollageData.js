import { collages } from "../Schema/collageSchema.js";
export const editCollage = async (req, res) => {
    try {
        const { SNo } = req.body.values;
        if (!SNo || isNaN(SNo)) {
            return res.status(400).send({ status: 400, message: "Bad Request. Invalid or missing SNo." });
        }
        const existingData = await collages.findOne({ SNo: SNo });
        if (!existingData) {
            return res.status(404).send({ status: 404, message: "Collage data not found" });
        }
        const updateObject = {};
        const fieldsToUpdate = [
            "c_id", "State", "college_District", "Yrofestab", "College_Name",
            "Specialisation", "Type", "url", "Phone", "Email", "location_coordinates",
            "Image_Gallery", "Logo", "About", "Updates", "Programmes_Offered",
            "Admissions", "Placement", "admissio_Test", "Perceptions",
            "NAAC_Grade_Validity", "Ranking", "fB", "tR", "yT", "iG", "LinkedIn", "isTopCol",
            "collegeAddress", "village", "city", "pinCode", "affiliatingUnivName", "affu_id", "univType"
        ];
        fieldsToUpdate.forEach(field => {
            const newValue = req.body.values[field];
            const isEmpty = newValue === undefined || newValue === "" || newValue === null;            
            if (!isEmpty && newValue !== existingData[field]) {
                updateObject[field] = newValue;
            }
        });
        if (Object.keys(updateObject).length > 0) {
            const updatedData = await collages.updateOne(
                { SNo: SNo },
                { $set: updateObject },
                { upsert: true }
            );
            return res.send({ status: 200, message: "Updated events", data: updatedData });
        } else {
            return res.send({ status: 200, message: "No fields to update", data: null });
        }
    } catch (error) {
        console.error("Unexpected error: editCollage", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};
