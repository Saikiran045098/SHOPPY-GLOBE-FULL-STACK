import products from "../Apidata.js";
import mongoose from "mongoose";
import Product from "../models/Productmodel.js";

  try {

    if (!Array.isArray(products)) {
        console.log("invalid data format");
        
    }

    await Product.insertMany(products);
    console.log("products stored successfully.");
    

  } catch (error) {
    console.error("Error saving products",error);
   
  }
;