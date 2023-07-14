import Routers from "./router.js";
import passport from 'passport';
import __dirname from '../utils.js';
import {login, renderLogin, logout, recovery, renderRecovery} from "../controllers/usersController.js"
import {index, home, chat, realTimeProducts, carts, products} from "../controllers/viewsController.js"




export default class ViewsRouter extends Routers{
    init(){
        this.post('/register',["PUBLIC"], passport.authenticate('register', {successRedirect: '/login', failureRedirect: '/', failureFlash: true}))

        this.get('/', ["PUBLIC"], index)

        this.get('/login', ["PUBLIC"], renderLogin);

        this.post('/login', ["PUBLIC"], passport.authenticate('login'), login)

        this.get('/logout', ["USER", "ADMIN"], logout);

        this.get('/recovery', ["PUBLIC"], renderRecovery)

        this.post('/recovery', ["PUBLIC"], recovery)

        this.get('/home', ["PUBLIC"], home);

        this.get('/chat', ["USER", "ADMIN"], chat)

        this.get('/realtimeproducts', ["USER", "ADMIN"], realTimeProducts);

        this.get('/carts', ["USER", "ADMIN"], carts);

        this.get('/products', ["USER", "ADMIN"], products)
        }
}