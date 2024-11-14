import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res) => {
    try{
        const products = await Product.find({}) ;//fetch all the things from database
        res.status(200).json({success: true , data: products});
    }
    catch(error){
        res.status(500).json({success: false, message: "server error found"})
    }
}

export const postProducts =  async (req,res) => {
        const product = req.body; //user will send this data
    
        if(!product.name || !product.price || !product.image){
            return res.status(400).json({success:false, message: "Please provide all fields"});
        }
    
        const newProduct = new Product(product);
    
        try{
            await newProduct.save();
            res.status(201).json({ success: true , data: newProduct});
        }
        catch(error){
            console.error("Error in create product: ", error.message);
            res.status(500).json({ success: false, message: "Server Error"});
        }
        
    }


export const deleteProduct = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("error updating");
       return res.status(404).json({success: false , message: "ID not found"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true , message: "Product deleted"});
    }
    catch(error){
        res.status(500).json({ success: false , message: "Server Error"});
    }
}

export const updateProduct = async(req,res) => {
    const { id } = req.params;
    const product = req.body;

    //checking if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("error updating");
       return res.status(404).json({success: false , message: "ID not found"});
    }

    try{
       const updatedProduct =  await Product.findByIdAndUpdate(id , product , {new:true});
       res.status(200).json({success: true , data: updatedProduct});
    }
    catch(error){
        res.status(500).json({success: false , message: "Server error"});
    }
}