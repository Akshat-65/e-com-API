import express from 'express';
import * as ProductRouter from './src/features/product/product.routes';

const server = express();
server.use('/api/products',ProductRouter)

server.get('/',(req,res)=>{
    res.send('Welcome to API');
})

server.listen(3000);