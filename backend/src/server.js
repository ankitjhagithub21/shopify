import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./db/conn.js";
import productRouter from "./routes/product.route.js"
import authRouter from "./routes/auth.route.js"
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"



const app = express();
const port = process.env.PORT || 5000

connectDB();

app.use(express.json())
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(cookieParser())

app.use("/api/products",productRouter)
app.use("/api/auth",authRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})