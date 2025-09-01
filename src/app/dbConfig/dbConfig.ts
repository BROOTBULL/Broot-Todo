import mongoose from "mongoose"

export async function connect() {

    try {
        await mongoose.connect(process.env.MONGO_URI!)

        const connection=mongoose.connection
        connection.on("connected",()=>console.log("DB connected successfully"))
        connection.on("error",()=>{
        console.log("Error happend please check your db connection")
        process.exit()
        })
        
    } catch (error) {
        console.log("Something went worng",error);
        
    }
    
}