const User=require("../models/user.js");

// render signup

module.exports.renderSignupForm=(req,res)=>{
    res.render("listings/users/signup.ejs");
}

//  signup

module.exports.signup=async(req,res)=>{
    try{
     let {username,email,password}=req.body;
     const newUser=new User({email,username});
     const  registerdUser=await  User.register(newUser,password);
     req.login(registerdUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    });
     // console.log(registerdUser);
   //  res.redirect("/listings");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

// renderloginform
module.exports.renderLoginForm=(req,res)=>{
    res.render("listings/users/login.ejs");
}

//login

module.exports.login=async (req,res)=>{
     req.flash("success","welcome to WanderLust");
     let redirectUrl=res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
}


// logout

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","your logged out successfully");
        res.redirect("/listings");
    });
}