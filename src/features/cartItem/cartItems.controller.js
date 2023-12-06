import { ApplicationError } from "../../error-handler/applicationError.js";
// import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;

      const userID = req.userID;
      await this.cartItemsRepository.add(productID, userID, quantity);
      res.status(201).send("Cart is updated");
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartItemsRepository.get(userID);
      return res.status(200).send(items);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.params.id;
    const isDeleted = await this.cartItemsRepository.delete(userID, cartItemID);
    if (!isDeleted) {
      return res.status(404).send("Item not found");
    }
    return res.status(200).send("Cart item is removed");
  }
}
