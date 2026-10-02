require('dotenv').config()

const dbConnect = require("./db/db");
const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const notesRouter = require("./router/notesRouter")
app.use(express.json())




const startServer = async () =>{
    try {
        await dbConnect();
        app.listen(process.env.PORT,()=>{
            console.log(`Server has started and listening on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Server failed to start", error)
        
    }
}

startServer();



app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
