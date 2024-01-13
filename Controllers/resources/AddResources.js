import GenerateSchema from "generate-schema";
import mongoose from "mongoose";

const AddResources = (req, res) => {
    const schema = GenerateSchema.json("resources", req.body[0])
    console.log(schema)
    const resourceSchemaModel = mongoose.model("resources", schema.properties)

    resourceSchemaModel.insertMany(req.body)
    .then(function(response){
        console.log("data inserted")
        return res.send("data inserted")
    })
    .catch(function (error) {
        console.log(error)
    })
}

export default AddResources;
