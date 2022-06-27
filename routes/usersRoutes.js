const UsersController=require('../controllers/usersController');
const passport=require('passport');


module.exports=(app,upload)=>{
    // TRAER DATOS
    app.get('/api/users/getAll',UsersController.getAll);
    //passport.authenticate('jwt',{session:false}),
    app.get('/api/users/findById/:id',     
    UsersController.findByUserId); 
 

    //GUARDAR DATOS
    app.post(
        '/api/users/create',
        upload.array('image',1),
        UsersController.registerWithImage);

    app.post('/api/users/login',UsersController.login);
    
    // ACTUALIZAR DATOS

    app.put(
        '/api/users/update',
       // passport.authenticate('jwt',{session:false}),
        upload.array('image',1),
        UsersController.update);    
} 


  