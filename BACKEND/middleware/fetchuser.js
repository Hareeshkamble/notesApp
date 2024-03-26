const jwt = require("jsonwebtoken")
const jwtSecreatKey="HareeshKamble"

const fetchuser=(req,res,next)=>{
const token=req.header("auth-token")
if(!token){
    res.status(500).send({error:"please validate with a valid token"})
}
try {
    const data=jwt.verify(token,jwtSecreatKey);
    req.user=data.user;
    next();
} catch (error) {
    res.status(500).send({error:"please validate with a valid token"})
}
}
module.exports=fetchuser