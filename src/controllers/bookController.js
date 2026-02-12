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
