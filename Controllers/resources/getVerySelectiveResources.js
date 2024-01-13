import { ResourceModel } from "../../Schema/resources.js";

const gettingVerySelectiveResource = (req, res) => {
    const {cutoff} = req.body;

    const mutateData = parseInt(cutoff)

    ResourceModel.find({
        // $or: [
        //     {
        //         GAMaxCutoff: {$gt: mutateData},
        //         GAMinCutoff: {$gt: mutateData}
        //     }
        // ]
        $and: [
            {
                GAMaxCutoff: {$gt: mutateData}
            },
            {
                GAMinCutoff: {$lt: mutateData}
            }
        ]
    }).sort({SlNo: 1}).exec((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: 500, message: "Internal Server Error" });
        }
        return res.send({status: 200, message: "Resource found", data: data})
    })
}

export default gettingVerySelectiveResource;
