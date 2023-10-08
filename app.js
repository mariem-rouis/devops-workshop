const express = require("express");
const connectedToDb = require("./config/connectToDb");
require("dotenv").config()

//connecte to DB 
connectedToDb();
// Init App 
const app = express ();


// Middelwares
app.use(express.json());

// Routes
app.use("/api/posts", require("./routes/postsRoute"));

// Running the server
const PORT = process.env.PORT || 3000 
app.listen(PORT,()=>console.log(`Server is runninng in ${process.env.NODE_ENV}mode on port ${PORT}`))