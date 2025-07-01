import jwt from "jsonwebtoken"

const jwtToken = (tokenData , res)=>{
   
    const token = jwt.sign(tokenData , process.env.JWT_SECRET,{
        expiresIn:'3d'
    })
    res.cookie('jwt',token,{
        maxAge: 3 *24 *60 *60 *1000,  // 3 days
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV === "development" ? false : true
    })
}

export default jwtToken