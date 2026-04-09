import { prisma } from "../lib/prisma"

export const attachUser = async (req, res, next) => {

    try {
        const clerkId = req.auth.userId;

        let user = await prisma.user.findUnique({
            where: { clerkId }
        })

        if (!user) {
            user = await prisma.user.create({
                data: { clerkId }
            })
        }

        req.user = user

        next()

    } catch (error) {
        next(error)
    }

}