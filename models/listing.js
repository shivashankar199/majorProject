const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");

const listingSchema=new Schema({
    title:{
        type:String,
    },
    description:String,
    image: {
        url:{
             type:String,
             default:"https://unsplash.com/photos/a-large-white-house-sitting-on-top-of-a-lush-green-field-o2QVnNtRE_g",
        },
        filename:String,
       // set:(v)=> v===""?"link":v
        
    },
    price:Number,
    country:String,
    location:String,
    reviews :[{
        type:Schema.Types.ObjectId,
        ref:"Review",
       // default:""
    }],
    owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
    },
    geometry:{
        type:{
           type:String,
           enum:['Point'],
           required:true
        },
        coordinates:{
           type:[Number],
           required:true
        }
    }
});

// middleware
listingSchema.post("findByIdAndDelete",async(listing)=>{
    if (listing){
    await Review.deleteMany({_id : {$in :listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;
