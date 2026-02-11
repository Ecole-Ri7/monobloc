import { Prisma } from "../../generated/prisma/client.js"
import bcrypt from "bcrypt"

export const hashPasswordExtension = Prisma.defineExtension({
    name:"hashPassword",
    query: {
        user:{
            create: async({args, query})=>{
                try{
                    const hash = await bcrypt.hash(args.data.password, 10)
                    args.data.password = hash
                    return query(args)
                }
                catch(e){
                    throw e
                }
            }
        }
    }
})