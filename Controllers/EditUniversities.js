import { excelToJsonModel } from "../Schema/excelToJson.js";
export const editUniversities = (req, res) => {
  try {

    const { S_No, State, Type, Yrofestab, Location_Coordinates, Name, City, District, PIN, url, Phone, Village, Email, Image, AboutCollege, Logo, isTopUniv } = req.body.values;
    const parsedS_No = parseInt(S_No, 10);
    excelToJsonModel.updateOne({ S_No: parsedS_No }, { $set: { State, Type, Yrofestab, Location_Coordinates, Name, City, District, PIN, url, Phone, Village, Email, Image, Logo, AboutCollege, isTopUniv } }, { upsert: true }, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
      } else {
        return res.status(200).json({ status: 200, message: "Updated Universities details", data });
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
  }
};
