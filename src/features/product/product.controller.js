import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: Math.floor(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdProduct = ProductModel.add(newProduct);
    res.status(201).send(createdProduct);
  }

  getOneProduct(req, res) {
    const getProductId = req.params.id;
    let product = ProductModel.getProductById(getProductId);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.status(200).send(product);
  }

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    try {
      ProductModel.rateProduct(userID, productID, rating);
    } catch (error) {
      return res.status(400).send(error.message);
    }
   return  res.status(200).send("Rating has been added");
  }

  filterProducts(req, res) {
    console.log(req.query);
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
}
