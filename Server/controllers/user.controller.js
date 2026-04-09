import {prisma} from "../lib/prisma.js";

const register = async(req , res)=>{

    try {
        const clerkId = req.auth.userId;
        const {name , email} = req.body

        if(!email || !name){
            return res.status(401).json({
                message :"email and the name is required"
            })
        }

        if(!clerkId){
            return res.status(500).json({
                message :"Something went wrong at the time authentication "
            })
        }

        const user = await prisma.user.create({
                data:{
                     user,
                     email,
                     clerkId
                }
        })

        if(!user){
            return res.status(500).json({
                message :"registration failed!!"
            })
        }

    } catch (error) {
        
        console.log('error at the time of creating the registration' ,error)
        return res.status(500).json({
                message :"registration failed!!"
            })
    }

}

export{
    register
}