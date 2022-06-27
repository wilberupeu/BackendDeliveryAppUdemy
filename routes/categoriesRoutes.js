const CategoriesController=require('../controllers/categoriesController');
const passport=require('passport');

module.exports=(app)=>{

        //GUARDAR DATOS
        app.post(
            '/api/categories/create',            
            CategoriesController.create);

            
} 

