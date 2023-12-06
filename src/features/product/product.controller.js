import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        null,
        parseFloat(price),
        req.file.filename,
        null,
        sizes.split(",")
      );
      const createdProduct = await this.productRepository.add(newProduct);
      console.log(createdProduct);
      res.status(201).send(createdProduct);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getOneProduct(req, res) {
    try {
      const getProductId = req.params.id;
      const product = await this.productRepository.get(getProductId);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        res.status(200).send(product);
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rateProduct(req, res) {
    try {
      const userID = req.userID;
      const productID = req.query.productID;
      const rating = req.query.rating;
     await this.productRepository.rate(userID, productID, rating);
    } catch (error) {
      return res.status(400).send(error.message);
    }
    return res.status(200).send("Rating has been added");
  }

  async filterProducts(req, res) {
    try {
      console.log(req.query);
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
