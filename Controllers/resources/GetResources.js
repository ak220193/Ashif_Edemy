import { ResourceModel } from "../../Schema/resources.js";
import mongoose from "mongoose";

const getSelectiveResource = (req, res) => {
    ResourceModel.find().sort({ SlNo: 1 }).exec((err, data) => {
        if(err) {
            console.log(err)
        }else {
            return res.send({
                status: 200,
                message: "resource found",
                data: data
            })
        }
    })
};

export default getSelectiveResource;
