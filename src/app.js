import express from "express"
import "dotenv/config"
import { bookRouter } from "./routes/bookRouter.js"
import { userRouter } from "./routes/userRouter.js"
import session from "express-session"

const app = express()
app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(session({
    // Secret à mettre dans le .env
    secret: 'r56htjr4*t$^pkojihugzjvfebjdkpoiuyh',
    resave: true,
    saveUninitialized: true
}))
app.use("books", bookRouter)
app.use(userRouter)

app.listen(process.env.PORT, (error)=>{
    error ? console.log("Erreur") : console.log(`Connecté sur le port ${process.env.PORT}`);
})