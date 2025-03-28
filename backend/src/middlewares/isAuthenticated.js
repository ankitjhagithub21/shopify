import jwt from "jsonwebtoken";

export const isAuthenticated = (req,res,next) => {
    const token = req.cookies.token || req.headers["Authorization"]?.split(' ')[1]
    
    if(!token){
        return res.status(401).json({success:false,message:"Token not provided."})
    }
   
    try{
       
        const decoded = jwt.verify(token,process.env.JWT_SEC);
       
        if(!decoded){
           return res.status(401).json({success:false,message:"Invalid token."})
        }

        req.userId = decoded.id;

        next();
    }catch(error){
        
        res.status(401).json({success:false,message:"Unauthorized."})
    }
}