const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");


const Mongo_URL="mongodb://127.0.0.1:27017/wanderLust";

main().then(()=>{
    console.log("Connected database");
}).catch(err=>{
    console.log(err);
});

async function main(){
     await  mongoose.connect(Mongo_URL);
}

const initDB= async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'69e50c470d7f945f11b028a7',geometry: {
  type: "Point",
  coordinates: [78.48, 17.38]
}}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();