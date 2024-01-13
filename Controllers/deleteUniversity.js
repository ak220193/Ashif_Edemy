import { excelToJsonModel } from "../Schema/excelToJson.js";
export const DeleteUniversity = (req, res) => {
    try {

        const S_No = parseInt(req.params.S_No, 10);
        if (isNaN(S_No)) {
            return res.status(400).json({ status: 400, message: "Invalid parameter value for S_No" });
        }
        excelToJsonModel.deleteOne({ S_No: S_No }, (err, data) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
            }  
            return res.status(200).json({ status: 200, message: "Data deleted", data: data});
        });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};
  
