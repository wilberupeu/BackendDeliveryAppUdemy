const CategoriesController=require('../controllers/categoriesController');
const passport=require('passport');

module.exports=(app)=>{

        // TRAER DATOS
        app.get('/api/categories/getAll',CategoriesController.getAll);

        //GUARDAR DATOS
        app.post(
            '/api/categories/create',            
            CategoriesController.create);

             
} 

