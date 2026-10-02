const jwt = require("jsonwebtoken");

const verifyToken=async(req,res,next)=>{
    try {

        const token=req.headers.token

        
        
        if(!token){
            return res.status(401).json({message:"Invalid Authentication",success:false})
        }
        const decoded = jwt.verify(token, process.env.KEY);
        
        
        req.token=decoded


        next()

    } catch (error) {
        return res.status(401).json({
            message:"Invalid or expired Token",
            success: false
        })
    }
}


module.exports = verifyToken;