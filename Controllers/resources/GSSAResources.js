import { ResourceModel } from "../../Schema/resources.js";

const gettingGSSAResource = (req, res) => {
    const {cutoff} = req.body;

    const mutateData = parseInt(cutoff)

    ResourceModel.find({
        // $or: [
        //     {
        //         GSSAMaxCutoff: {$gt: mutateData},
        //         GSSAMinCutoff: {$gt: mutateData}
        //     }
        // ]
        $and: [
            {
                GSSAMaxCutoff: {$gt: mutateData}
            },
            {
                GSSAMinCutoff: {$lt: mutateData}
            }
        ]
    }).sort({SlNo: 1}).exec((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: 500, message: "Internal Server Error" });
        }
        if (data.length === 0){
            return res.status(404).send({ status: 404, message: "No data found" });
        }
        return res.send({status: 200, message: "Resource found", data: data})
    })
}

export default gettingGSSAResource;
