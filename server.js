import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';

const server = express();
server.use(bodyParser.json());
server.use('/api/products',productRouter);
server.use('/api/users',userRouter);

server.get('/',(req,res)=>{
    res.send('Welcome to API');
})

server.listen(3000);