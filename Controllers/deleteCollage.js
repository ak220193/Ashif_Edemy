import { collages } from "../Schema/collageSchema.js";
export const DeleteCollage = async(req, res) => {
    try {
        let { SNo } = req.params;
        if (!SNo || isNaN(SNo)) {
            return res.status(400).send({ status: 400,  message: "Bad Request. SNo should be a valid number." });
        }
        SNo = parseInt(SNo, 10);
        console.log("Deleting record with SNo:", SNo);
        await collages.deleteOne({ SNo: SNo }, (err, data) => {
            if (err) {
                console.error("Error deleting collage data:", err);
                return res.status(500).send({ status: 500, message: "Internal Server Error" });
            }
            if (data.deletedCount === 0) {
                return res.status(404).send({ status: 404, message: "No matching record found for deletion" });
            }
            return res.send({ status: 200, message: "Data deleted successfully", data: data });
        });
    } catch (error) {
        console.error("Unexpected error: DeleteCollage ", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};
