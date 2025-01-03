import express from 'express'
import { addproduct, deleteProduct, productList, singleproduct } from '../controller/productController.js';
const router = express.Router();

router.post('/addproduct',addproduct)
router.get('/productList',productList)
router.post('/deleteproduct',deleteProduct)
router.post("/singleproduct",singleproduct)

export { router}