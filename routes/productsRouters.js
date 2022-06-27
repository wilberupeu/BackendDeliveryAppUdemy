const ProductsController=require('../controllers/productsController');
const passport=require('passport');

module.exports=(app,upload)=>{
        //GUARDAR DATOS
        app.post(
            '/api/products/create',
            upload.array('image',3),
            ProductsController.create);
}

