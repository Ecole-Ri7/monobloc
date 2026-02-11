import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js"
const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension)

export function home(req, res){
    res.render("pages/index.twig", 
        { 
            title:"Yolo"
        }
    )
}

export async function getRegister(req, res){
    res.render("pages/register.twig",
        {
            title:"Inscription"
        }
    )
}
 
export async function postRegister(req, res){
    const { firstName, lastName, mail, password, confirmPassword } = req.body
    // Code à faire
}