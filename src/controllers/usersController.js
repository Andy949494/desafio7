import jwt from 'jsonwebtoken';
import { createHash } from '../utils.js';
import config from '../config/config.js'
import userModel from '../dao/models/user.js';


const privateKey = config.privateKey

const renderLogin = (req, res) => {
    res.render('login')
}

const login = (req, res) => {
    const {firstname, lastname, email, age, role} = req.user;
   
    try {
        const token = jwt.sign({firstname, lastname, email, age, role}, privateKey, { expiresIn: '1h' });
        res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
        res.redirect('/products');
    } catch (error){
        res.sendServerError('Internal server error.')
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error){
        res.sendServerError('Internal server error.')
    }
}

const renderRecovery = (req, res) => {
    res.render('recovery')
}

const recovery = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.redirect('/recovery');
        } else {
            const passHash = createHash(password);
            user.password = passHash;
            await user.save();
            res.redirect('/login');
        }
    } catch (error) {
        res.sendServerError('Error al restablecer la contraseña.')
        res.redirect('/recovery');
    }
}

export {
    login,
    renderLogin,
    logout,
    recovery,
    renderRecovery
}