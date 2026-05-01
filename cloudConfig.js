// const cloudinary = require('cloudinary');
// const CloudinaryStorage= require('multer-storage-cloudinary');


// cloudinary.config({
//        cloud_name:process.env.CLOUD_NAME,
//        api_key:process.env.CLOUD_API_KEY,
//        api_secret:process.env.CLOUD_API_SECRET
// });


// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'wanderLust_DEV',
//     resource_type: "auto",
//     allowed_formats: ["png","jpg","jpeg"],
//   },
// });

// module.exports={cloudinary,storage};

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust",
    allowed_formats: ["jpeg", "png", "jpg","avif"]
  }
});

module.exports = {
  cloudinary,
  storage
};