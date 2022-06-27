const CategoriesController=require('../controllers/CategoriesController');
const passport=require('passport');

module.exports=(app,upload)=>{

        //GUARDAR DATOS
        app.post(
            '/api/categories/create',            
            CategoriesController.create);

            
} 

