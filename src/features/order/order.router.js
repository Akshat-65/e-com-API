import  express  from "express";
import OrderController from "./order.controller.js";

const orderController = new OrderController();
const orderRouter = express.Router();

orderRouter.post('/',(req,res)=>{
    orderController.placeOrder(req,res);
})

export default orderRouter;