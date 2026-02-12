import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js"
const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension)
import bcrypt from "bcrypt"

export function home(req, res){
    res.render("pages/index.twig", 
        { 
            title : "Yolo",
            user: req.user
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
    if(password === confirmPassword){
        try{
            await prisma.user.create({
                data:{
                    firstName, 
                    lastName, 
                    mail, 
                    password
                }
            })
            res.redirect("/login")
        }
        catch(error){
            if(error.code === "P2002"){
                res.render("pages/register.twig",
                    {
                        title:"Inscription",
                        error: "Ce mail est déjà utilisé"
                    }
                )
            }
            res.render("pages/register.twig",
                {
                    title:"Inscription",
                    error: "Erreur lors de l'inscription"
                }
            )
        }
    }
    else{
        res.render("pages/register.twig",
            {
                title:"Inscription",
                error: "Veuillez rentrer des mot de passe similaires"
            }
        )
    }
}

export function getLogin(req, res){
    res.render("pages/login.twig",
        {
            title:"Connexion"
        }
    )
}

export async function postLogin(req, res){
    try{
        // Retourne soit l'utilisateur sous forme d'objet soit null
        const user = await prisma.user.findUnique({
            where : {
                mail : req.body.mail
            }
        })
        // Si user est différent de false ou de null
        if(user){
            if(await bcrypt.compare(req.body.password, user.password)){
                req.session.user = user.id
                res.redirect("/")
            }
            else{
                throw new Error("Mot de passe incorrect")
            }
        }
        else{
            throw new Error("Mail incorrect")
        }
    }
    catch(error){
        console.error(error);
        res.render("pages/login.twig",
            {
                title:"Connexion",
                error: "Identifiants invalides"
            }
        )
    }
}