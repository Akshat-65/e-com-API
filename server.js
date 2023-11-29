import express from 'express';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cartItem/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type:'json'};

const server = express();
server.use(bodyParser.json());
server.use('/api-docs/',swagger.serve,swagger.setup(apiDocs));
server.use('/api/products',jwtAuth, productRouter);
server.use('/api/cartitems',jwtAuth, cartRouter);
server.use('/api/users',userRouter);

server.get('/',(req,res)=>{
    res.send('Welcome to API');
})

server.listen(3000);