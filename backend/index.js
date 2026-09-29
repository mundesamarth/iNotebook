require('dotenv').config()

const dbConnect = require("./db/db");
const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const notesRouter = require("./router/notesRouter")
app.use(express.json())

dbConnect();


app.listen(process.env.PORT, () =>{
    console.log(`Listning on port ${process.env.PORT}`)
})

app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)