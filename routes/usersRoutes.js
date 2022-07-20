const UsersController=require('../controllers/usersController');
const passport=require('passport');


module.exports=(app,upload)=>{
    // TRAER DATOS
    app.get('/api/users/getAll',UsersController.getAll);
    //passport.authenticate('jwt',{session:false}),
    app.get('/api/users/findById/:id',     
    UsersController.findByUserId); 
 
    app.get('/api/users/findDeliveryMen',     
    UsersController.findDeliveryMen); 

    app.get('/api/users/getAdminsNotificationTokens',     
    UsersController.getAdminsNotificationTokens); 

    

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
        
        app.put(
            '/api/users/updateNotificationToken',
           // passport.authenticate('jwt',{session:false}),
 
            UsersController.updateNotificationToken);         
} 


  