import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
const prisma = new PrismaClient({ adapter })

export async function authguard(req, res, next){
    if(req.session.user){
        try{
            const user = await prisma.user.findUnique({
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    mail:true
                },
                where:{
                    id: req.session.user
                }
            })
            if(user){
                req.user = user
                return next()
            }
            else
                res.redirect("/login")
        }
        catch(error){
            console.error(error);
            res.redirect("/login")
        }
    }
    else{
        res.redirect("/login")
    }
}