const jwt = require("jsonwebtoken");

const verifyToken=async(req,res,next)=>{
    try {

        const token=req.headers.token

        
        
        if(!token){
            return res.status(400).json({message:"Invalid Authentication",success:false})
        }
        const decoded = jwt.verify(token, process.env.KEY);
        
        
        if(!decoded){
             return res.status(400).json({message:"Invalid Authentication",success:false})
        }

        req.token=decoded


        next()

    } catch (error) {
        console.log(error)
        
        return res.status(500).json({message:"Internal Server Error at verify token",success:false})
    }
}


module.exports = verifyToken;