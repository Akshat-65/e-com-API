import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import userRouter from './src/features/user/user.routes.js';

const server = express();
server.use(bodyParser.json());
server.use('/api/products',jwtAuth, productRouter);
server.use('/api/users',userRouter);

server.get('/',(req,res)=>{
    res.send('Welcome to API');
})

server.listen(3000);