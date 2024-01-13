import { excelToJsonModel } from "../Schema/excelToJson.js";

export const searchData = async (req, res) => {
  const val = req.query.Name
  console.log(val)
  excelToJsonModel.find(
    { Name_1: { $regex : `${val}`}},
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data) {
          // console.log(data)
          return res.send({
            status: 200,
            message: "Universities found",
            data: data,
          });
        } else {
          console.log("Universities not found")
          return res.send({
            status: 404,
            message: "college not found",
          });
        }
      }
    }
  );
};
