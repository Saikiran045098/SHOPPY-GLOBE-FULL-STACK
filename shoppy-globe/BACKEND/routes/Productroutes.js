import { fetchproducts, fetchProductById } from "../controllers/Productsfetching.js";

export function routes(router) {
  router.get("/products", fetchproducts);
  router.get("/products/:id", fetchProductById);
}
