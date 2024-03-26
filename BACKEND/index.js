const connectToMongo=require("./db");
var cors=require("cors")
const express=require("express");
connectToMongo();
const app=express()
app.use(express.json()) 
const port=80;

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hiii its me localhost <h1>60</h1>")
})
app.use("/api/auth",require('./routes/auth'))// router for this perticular used
app.use("/api/notes",require("./routes/notes"))

app.listen(port,()=>{
    console.log("your i noteBook has been online on port 80")
})


