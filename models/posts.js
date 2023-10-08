const mongoose = require("mongoose");
const Joi = require("joi");

const PostSchema = new mongoose.Schema(
  {
  title: {
    type: String,
    required: true, 
    trim:true,
    minlength:2,
    maxlength:200
  },
  description: {
    type: String,
    required: true, 
    trim:true,
    minlength:10,
   
  }},
   {timestamps: true,  }
     
);

const Post = mongoose.model('Post', PostSchema);

//validation create Post
function validateCreatePost(obj){
    const Schema =Joi.object({
        title:Joi.string().trim().min(2).max(200).required(),
        description:Joi.string().trim().min(10).required(),

    })
    return Schema.validate(obj)
}

//validation Update Post
function validateUpdatePost(obj){
    const Schema =Joi.object(
      {
        title:Joi.string().trim().min(2).max(200),
        description:Joi.string().trim().min(10),
    })
    return Schema.validate(obj)
}


module.exports ={Post ,
validateCreatePost,
validateUpdatePost} ;