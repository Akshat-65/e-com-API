import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes,id) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
    this.id = id;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = Math.floor(Math.random() * 100000);
    products.push(product);
    return product;
  }

  static getProductById(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    // console.log(minPrice, maxPrice, category);
    const filteredProducts = products.filter((p) => {
      // console.log(p.price,p.category)
      return (
        !minPrice ||
        (p.price >= minPrice && !maxPrice) ||
        (p.price <= maxPrice && !category) ||
        p.category == category
      );
    });
    // console.log(filteredProducts);
    return filteredProducts;
  }

  static rateProduct(userID, productID, rating) {
    //1. Validate user and Product
    const user = UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      throw new ApplicationError("User does not exists",404);
    }

    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError("product not found",400);
    }

    // 2. check if there is any ratings and if not add ratings array

    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userID: userID,
        rating: rating,
      });
    } else {
      //3. check if user rating is already available
      const existingRatingIndex = product.ratings.findIndex(
         (r) => r.userID == userID
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      }
      // 4. If no existing rating then add new rating
      else {
        product.ratings.push({
          userID: userID,
          rating: rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    18,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    ["S", "M", "XL"]
  ),
];
