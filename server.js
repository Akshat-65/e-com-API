import dotenv from'dotenv';
dotenv.config();
import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./src/features/product/product.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItem/cartItems.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from './src/features/order/order.router.js';

const server = express();
// load all the environment variables in application

// CORS policy configurartion

let corsOptions = {
    origin:"http://localhost:5500"
}
server.use(cors(corsOptions));
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // if you want to allow access to all the clients you can use '*' instead of specified port
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   // return OK for preflight request
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// });
server.use(bodyParser.json());
server.use("/api-docs/", swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware)
server.use("/api/orders", jwtAuth,orderRouter);
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cartitems", loggerMiddleware,jwtAuth, cartRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to API");
});

// Error handler middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong, please try later")
})


// Middleware to handle 404 requests.
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found.Please checkout our documentation for more information at this link localhost:3000/api-docs "
    );
});

server.listen(3000,()=>{
    connectToMongoDB();
});
