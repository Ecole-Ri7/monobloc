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

export async function postLogin(req, res){
    // Récupérer l'utilisateur par son mail
    // Vérifier la correspondance des mots de passe grâce à bcrypt.compare
    // Si tout est bon, console.log("connecté")
    // Sinon, afficher une erreur comme lors de l'inscription
}