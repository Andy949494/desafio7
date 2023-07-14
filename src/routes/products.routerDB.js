import Routers from "./router.js";
import {getProducts, getProductsById, addProduct, updateProduct, deleteProduct} from "../controllers/productsController.js"
import {uploader} from '../utils.js';

export default class ProductsRouter extends Routers{
    init(){
        this.get('/', ["PUBLIC"], getProducts);

        this.get('/:pid', ["PUBLIC"], getProductsById);

        this.post('/', ["PUBLIC"], uploader.array('thumbnails'), addProduct);

        this.put('/:pid', ["PUBLIC"], updateProduct);

        this.delete('/:pid', ["PUBLIC"], deleteProduct);
    }
}