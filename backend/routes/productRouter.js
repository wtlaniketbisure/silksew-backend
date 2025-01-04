import express from 'express'
import { addproduct, deleteProduct, productList, singleproduct } from '../controller/productController.js';
const productRouter = express.Router();

productRouter.post('/addproduct',addproduct)
productRouter.get('/productList',productList)
productRouter.post('/deleteproduct',deleteProduct)
productRouter.post("/singleproduct",singleproduct)

export { productRouter}