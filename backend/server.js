import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json()) //alows to accept json data in the req.body

app.use("/api/products" ,productRoutes);

if(process.env.NODE_ENV === "production") {
    //make it static
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    //anything other than "/api/products"
    app.use("*" , (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"));
    });
}


app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});

