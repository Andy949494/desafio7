import Routers from "./router.js";
import {addNewCart, addProductToCart, deleteAllProductsFromCart, deleteOneProductFromCart, getCartById, getCarts, updateCart, updateProductQuantity} from "../controllers/cartsController.js"

export default class ProductsRouter extends Routers{
    init(){
        this.post('/', ["PUBLIC"], addNewCart);

        this.get('/', ["PUBLIC"], getCarts);

        this.get('/:cid', ["PUBLIC"], getCartById);

        this.post('/:cid/product/:pid', ["PUBLIC"], addProductToCart);

        this.put('/:cid', ["PUBLIC"], updateCart);

        this.put('/:cid/product/:pid', ["PUBLIC"], updateProductQuantity);

        this.delete('/:cid/product/:pid', ["PUBLIC"], deleteOneProductFromCart);

        this.delete('/:cid', ["PUBLIC"], deleteAllProductsFromCart);

    }
}