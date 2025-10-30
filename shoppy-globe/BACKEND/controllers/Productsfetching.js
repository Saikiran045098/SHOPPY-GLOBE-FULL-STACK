import Product from "../models/Productmodel.js";

//  Fetch all products
export function fetchproducts(req, res) {
  Product.find()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).send("No products found");
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error fetching all products:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
}

//  Fetch a single product by ID
export function fetchProductById(req, res) {
  const { id } = req.params;

  Product.findOne({ id: Number(id) })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error("Error fetching product by ID:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
}
