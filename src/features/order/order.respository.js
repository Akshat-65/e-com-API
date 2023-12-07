import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userID) {
    try {
      const db = getDB();

      // get cart items and calculate total Amount
      const items = await this.getTotalAmount(userID);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);
      // create an order record
      const newOrder = new OrderModel(
        new ObjectId(userID),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder);
      // Reduce the stock
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } }
          );
      }
      // clear the cart
      await db.collection("cartItems").deleteMany({
        userID: new ObjectId(userID),
      });
    } catch (err) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getTotalAmount(userID) {
    const db = getDB();
    const items = await db
      .collection("cartItems")
      .aggregate([
        // get cart items for the user
        {
          $match: { userID: new ObjectId(userID) },
        },
        // get the products from product collection
        {
          $lookup: {
            from: "products",
            localField: "productID",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        // Unwind the productInfo
        {
          $unwind: "$productInfo",
        },
        // calculate total amount for each cart item
        {
          $addFields: {
            totalAmount: {
              $multiply: ["$productInfo.price", "$quantity"],
            },
          },
        },
      ])
      .toArray();
    return items;
  }
}
export default OrderRepository;
