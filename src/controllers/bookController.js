import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
const prisma = new PrismaClient({ adapter });

export async function addBook(req, res) {
  try {
    const book = await prisma.book.create({
      data: {
        title:req.body.title, 
        author:req.body.author,
        userId:req.user.id
      },
    });
    res.redirect("/")
  } catch (error) {
    res.render("pages/index.twig",{error:"Problème lors de la création du livre"})
  }
}

export async function deleteBook(req, res){
  try{
    await prisma.book.delete({
      where:{
        id: parseInt(req.params.id)
      }
    })
    res.redirect("/")
  }
  catch(error){
    console.error(error);
    res.render("pages/index.twig",{
      error:"Problème lors de la suppresion du livre",
      books: await prisma.book.findMany()
    })
  }
}

export async function getUpdateBook(req, res){
  try{
      const books = await prisma.book.findMany()
      res.render("pages/index.twig", 
          { 
              title : "Yolo",
              user: req.user,
              books,
              update: req.params.id,
          }
      )
  }
  catch(error){
      res.render("pages/index.twig", 
          { 
              title : "Yolo",
              user: req.user,
              error: "Une erreur est survenue lors de la récupération des livres"
          }
      )
  }
}

export async function postUpdateBook(req, res){
  try {
    await prisma.book.update({
      data:{
        title: req.body.title,
        author: req.body.author
      },
      where:{
        id: parseInt(req.params.id)
      }
    })
    res.redirect("/")
  } catch (error) {
    console.log(error);
    
    res.render("pages/index.twig", 
          { 
              title : "Yolo",
              user: req.user,
              error: "Une erreur est survenue lors de la modification du livre"
          }
      )
  }
}