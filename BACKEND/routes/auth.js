const express=require("express")
const fetchuser=require("../middleware/fetchuser")
const User=require("../models/Users")
const becrypt=require("bcryptjs")
const router=express.Router()
const {body,validationResult} =require("express-validator")
const jwt=require("jsonwebtoken")
const jwtSecreatKey="HareeshKamble"
// ROUTE1  SIGNN UP IN WEBSITE  
router.post("/createuser",[
    body("name","name should contain 3 letters").isLength({min:3}),
    body("password","password is too short").isLength({min:6}),
    body("email","enter a valid email").isEmail(),

    ],async(req,res)=>{  
let success=false
    // console.log(req.body)
    //if there are errors then it will be displayed
    const errors=validationResult(req);
    if(!errors.isEmpty())  {
        return res.status(400).json({errors:errors.array()})
    }
    // check wheather the same email id exists in the 
    try{
    let user= await User.findOne({email: req.body.email });
    if(user){
        return res.status(400).json({success,error:"sorry this email id already exists "})
    }
    let salt= await becrypt.genSalt(10);
    let SecurePassword= await becrypt.hash(req.body.password,salt)

    user= await User.create({
         name:req.body.name,
         password:SecurePassword,
         email:req.body.email,
    })
const data={
    user:{
        id:user.id
    }
}
const authToken=jwt.sign(data,jwtSecreatKey)
// success=true
res.json({success:true,authToken})
// res.json(user)
}catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
});


// ROUTE 2 for User lOGINN

router.post("/login",[
    body("email","enter a valid email adress").isEmail(),
    body("password","password doesn't match ").exists(),
],async(req,res)=>{
    let success=false
//  if there are errors in the entered value
const errors=validationResult(req);
if(!errors.isEmpty())  {
    return res.status(400).json({errors:errors.array()})
}
const {email,password}=req.body
try{
    let user= await User.findOne({email})
    if(!user){
        success=false
        return res.json({success,error:"login with coreect email"})
    }
    const comparePass= await becrypt.compare(password,user.password)
    if(!comparePass){
        success=false
        return res.json({success,error:"login with correct credentials"})
    }
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,jwtSecreatKey)
    success=true
    res.json({success,authToken})
}catch(error){
    console.error(error.message);
    res.status(500).send("internal server error occured");
}
});

// ROUTE 3 get user details using "api/auth/login" 
router.post("/getuser",fetchuser,async(req, res) =>{
    try{
      userId = req.user.id;
      const user = await User.findById(userId).select("-password ");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occurred");
    }
  });  
module.exports = router
