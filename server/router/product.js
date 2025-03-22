import express from 'express';
import authoAdmin from '../middleware/autho.js';
import { 
  AddProducts, 
  ListProducts, 
  deleteProduct, 
  updateProduct, 
  getProductById, 
  productDetail
} from "../controller/product.js";
import upload from '../middleware/multer.js';

const productRouter = express.Router(); 

productRouter.post('/add_product',authoAdmin,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]), AddProducts);  
productRouter.get('/list_product', ListProducts);  
productRouter.delete('/delet_product/:id', deleteProduct);  
productRouter.put('/update_product/:id', updateProduct);  
productRouter.get('/product/:id', getProductById);
productRouter.get('/detail_product/:id', productDetail);

export default productRouter;
