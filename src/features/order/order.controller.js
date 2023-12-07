import OrderRepository from "./order.respository.js";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      const userID = req.userID;
      await this.orderRepository.placeOrder(userID);
      res.status(201).send("order is created");
    } catch (err) {
      console.log(err);
        return res.status(200).send("Something went wrong");
    }
  }
}
export default OrderController;
