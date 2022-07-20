const AddressController=require('../controllers/addressController');
const passport=require('passport');
 
module.exports=(app)=>{

        // TRAER DATOS
        app.get('/api/address/findByUser/:id_user',AddressController.findByUser);

        //GUARDAR DATOS
        app.post(
            '/api/address/create',            
            AddressController.create);

               
} 

