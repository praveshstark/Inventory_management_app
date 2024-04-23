const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const userRoute = require("./routes/userRoute");

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.json());

//Routes 
app.use("/api/users", userRoute);
app.get("/", (req, res) =>{
    res.send("Testing");
})

const PORT = process.env.PORT || 5000;

// Connect to DB and start server

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            app.listen(PORT, ()=>{
                console.log(`Server running on PORT  ${PORT}`);
            })
        })
        .catch((err)=>{ console.log(err)})
