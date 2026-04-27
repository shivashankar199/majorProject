const Listing =require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// index 
module.exports.index=async (req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index",{ allListings });}

// new

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

// show

module.exports.showListing=async (req,res)=>{
     let {id}=req.params;
     const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
     if(!listing){
          req.flash("error","listing your looking for does not exist!");
           return   res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});}
    
// create

module.exports.createListing = async (req, res, next) => {
     console.log(req.file);
  try {
    if (!req.user) {
      req.flash("error", "Login required");
      return res.redirect("/login");
    }

    let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    }).send();

    if (!response.body.features.length) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
    }

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "New listing created!");
    res.redirect("/listings");

  } catch (err) {
    console.log(err);
    next(err);
  }
};

// edit

module.exports.renderEditForm=async (req,res)=>{
     let {id}=req.params;
     const listing= await Listing.findById(id);
     if(!listing){
          req.flash("error","listing your looking for does not exist!");
           return   res.redirect("/listings");
     }
     res.render("listings/edit.ejs",{listing});}


// update

module.exports.updateListing=async (req,res)=>{
   let {id}=req.params;
   let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if (typeof req.file!="undefined"){
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename}
   await listing.save();
   }
   req.flash("success","listing updated!");
   res.redirect(`/listings/${id}`);}


// delete

module.exports.destroyListing=async (req,res)=>{
     let {id}=req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","listing Deleted!");
     res.redirect("/listings");}

    