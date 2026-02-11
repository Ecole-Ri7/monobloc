import express from "express"
import "dotenv/config"
import { bookRouter } from "./routes/bookRouter.js"
import { userRouter } from "./routes/userRouter.js"

const app = express()
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(bookRouter)
app.use(userRouter)

app.listen(process.env.PORT, (error)=>{
    error ? console.log("Erreur") : console.log(`Connecté sur le port ${process.env.PORT}`);
})