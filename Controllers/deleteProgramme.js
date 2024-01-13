import { programSchemaModel } from "../Schema/ProgramSchema.js";

export const DeleteProgramme = (req, res) => {
    let{programmeID} = req.params
    programSchemaModel.deleteOne({
        programmeID: programmeID
    }, (err, data) => {
        return res.send({
            status: 200,
            message: "Data deleted",
            data: data
        });
    })
}
