import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const product = new Product({
    name,
    price,
    image,
  });
  try {
    await product.save();
    res.status(201).json({ success: true, data: product,message:"Product created successfully." });
  } catch (error) {
    console.log("Error creating product :", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getSingleProduct = async (req, res) => {
  const {id} = req.params;
  try {
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({success:false,message:"Product not found."})
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is not valid." });
  }

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (error) {
    console.log("Error deleting product :", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
