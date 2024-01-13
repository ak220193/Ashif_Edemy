import { addingSchoolModel } from "../Schema/addSchools.js";

const getSelectedSchool = (req, res) => {
    const SlNo = req.query.SlNo
    addingSchoolModel.findOne({SlNo: SlNo},
        (err, data) => {
            if(err) {
                res.send(err)
            }else {
                if(!data){
                    return res.send("the params is not present")
                }
                return res.send({
                    status: 200,
                    message: "data is collected",
                    data: data
                })
            }
        })
}

export default getSelectedSchool;
