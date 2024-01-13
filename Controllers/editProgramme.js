import { programSchemaModel } from "../Schema/ProgramSchema.js";

export const editProgramme = (req, res) => {
    let {programmeID,
        programmeDomain,
        programmeSubDomain,
        programmeSpecialisation,
        programmeLevel,
        degreeDescription,
        degreeShortName,
        degreeFullName
    } = req.body.values;
    console.log(req.body);
    programSchemaModel.updateOne(
        {programmeID: programmeID},
        {
            $set: {
                programmeDomain,
                programmeSubDomain,
                programmeSpecialisation,
                programmeLevel,
                degreeDescription,
                degreeShortName,
                degreeFullName
            }
        },
        { upsert: true },
        (err, data) => {
        if (err) {
        console.log(err);
        } else {
        return res.send({
          status: 200,
          message: "updated events",
          data: data,
        });
      }
    }
    )
       
}
