import {prisma} from "../lib/prisma.js";

const register = async(req , res)=>{

    try {
        const clerkId = req.auth.userId;
        console.log('the okk from the backend ')
        

        return res.json({
            message: "done",
            clerkId
        })

       

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