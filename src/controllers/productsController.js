import productsModel from '../dao/models/products.js';


const getProducts = async (req, res) => {
    try {
        let products = await productsModel.find();
        let limit = req.query.limit;
        if (limit){
            let LimitedProducts = products.slice(0,limit);
            return res.sendSuccess(LimitedProducts);
        } else {
            return res.sendSuccess(products);  
        }
    } catch (error) {
        res.sendServerError('Internal server error.')
    }
}

const getProductsById = async (req, res) => {
    try {
        let product = await productsModel.findById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {
        return res.sendSuccess(product);
        }
    } catch (error) {
        res.sendServerError('Internal server error.')
    }
}

const addProduct = async (req, res) => {
    try{
        let {title,description,code,price,status,stock,category,thumbnails} = req.body;
        if(!title||!description||!code||!price||!status||!stock||!category) {
            return res.sendUserError('Incomplete values');
        }
        if (req.files.length > 0) {
            let fileNames = req.files.map(file => `http://localhost:8080/images/${file.filename}`); //la función flecha transforma cada elemento del arreglo req.files en una URL completa de la imagen y se almacena en el arreglo fileNames.
            thumbnails = fileNames;
        }
        let result = await productsModel.create({
            title,description,code,price,status,stock,category,thumbnails});
            return res.sendSuccess(result);
    } catch {
        res.sendServerError('Internal server error.')
    }
}

const updateProduct = async (req, res) => {
    try {
        let product = await productsModel.findById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {    
        let productToReplace = req.body;
        let pid = req.params.pid;
        await productsModel.updateOne({_id:pid},productToReplace);
        return res.sendSuccess('Product updated successfully');
        }
    } catch (error) {
        res.sendServerError('Internal server error.')
    }
}

const deleteProduct = async (req, res) => {
    try {
        let product = await productsModel.findById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {    
        let pid = req.params.pid;
        await productsModel.deleteOne({_id:pid});
        return res.sendSuccess('Product deleted successfully');
        }
    } catch (error) {
        res.sendServerError('Internal server error.')
    }
}

export{
    getProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct
}