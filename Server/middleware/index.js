import { prisma } from "../lib/prisma.js"

export const attachUser = async (req, res, next) => {

    try {
        const clerkId = req.auth.userId;

        console.log('thhe clerk id is ' ,clerkId)

        let user = await prisma.user.findUnique({
            where: { clerkId:String(clerkId)  }
        })

        if (!user) {
            user = await prisma.user.create({
                data: { clerkId :String(clerkId) }
            })
        }

        req.user = user

        next()

    } catch (error) {
        next(error)
    }

}