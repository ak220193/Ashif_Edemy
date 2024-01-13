import { blogDataSchema } from "../../Schema/blogSchema.js";

export const addBlogdata = (req, res) => {

    const {Domain, subDomain, 
            title1, body1, 
            title2, body2, 
            title3, body3, 
            title4, body4,
            title5, body5,
            title6, body6,
            title7, body7} = req.body;

    const blogData = new blogDataSchema({
            Domain, 
            subDomain, 
            title1, 
            body1, 
            title2, 
            body2, 
            title3, 
            body3, 
            title4, 
            body4,
            title5, 
            body5,
            title6, 
            body6,
            title7, 
            body7
    });

    blogData.save((err, data) => {
        if(err) {
            return res.send(err)
        }
        return res.status(200).send({
            message: "Blog added successfully"
        })
    })
};

export const getFullSelectedBlogData = (req, res) => {
    const {Domain, subDomain} = req.query;
    console.log(Domain, subDomain)
    blogDataSchema.find({Domain: req.query.Domain, subDomain: req.query.subDomain}, (err, data) => {
        if(err){
            console.log(err)
        }else{
            if (data.length){
                return res.send({
                    status: 200,
                    message: "Blog Data found",
                    data: data
                });
            } else {
                return res.send({
                    status: 200,
                    message: "No blog data found"
                })
            }
        }
    })
}

export const getPartialBlogData = (req, res) => {
    blogDataSchema.find({Domain: req.query.Domain}, (err, data) => {
        if(err){
            console.log(err)
        }else {
            if (data.length){
                return res.send({
                    status: 200,
                    message: "Blog Data found",
                    data: data
                });
            } else {
                return res.send({
                    status: 200,
                    message: "No blog data found"
                })
            }
        }
    })
}

export const getAllBlogData = (req, res) => {
    blogDataSchema.find((err, data) => {
        if (err) {
            console.log(err)
        }else {
            console.log('====')
            return res.send({
                status: 200,
                message: "blog details",
                data: data
            })
        }
    })
}

export const deleteSelectiveBlog = (req, res) => {
    let {blogId} = req.params
    blogDataSchema.deleteOne({_id: blogId}, (err, data) => {
        if(err){
            console.log(err)
        }else {
            return res.send({
                status: 200,
                message: "blog deleted",
                data: data
            })
        }
    })
}

export const editBlogData = (req, res) => {
    let {Domain, subDomain, _id, title7, body7} = req.body;

    blogDataSchema.updateOne(
        {_id: _id},
        {
            $set: {
                Domain, subDomain, title7, body7
            }
        },
        {upsert: true},
        (err, data) => {
            if (err) {
                console.log(err)
            } else {
                return res.send({
                    status: 200,
                    message: "Blog Updated successfully",
                    data: data
                });
            }
        }
    )
};
