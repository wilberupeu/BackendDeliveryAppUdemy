const OrderController=require('../controllers/ordersController');
const passport=require('passport');
 
module.exports=(app)=>{

        // TRAER DATOS
        app.get('/api/orders/findByStatus/:status',
        passport.authenticate('jwt', {session: false}),
        OrderController.findByStatus);
        app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status',
        passport.authenticate('jwt', {session: false}),
        OrderController.findByDeliveryAndStatus);
        app.get('/api/orders/findByClientAndStatus/:id_client/:status',
        passport.authenticate('jwt', {session: false}),OrderController.findByClientAndStatus);

        /*
        * POST ROUTES
        */
        app.post('/api/orders/create',
            passport.authenticate('jwt', {session: false}),            
            OrderController.create);

        //PUT ROUTES
        app.put('/api/orders/updateToDispatched',   
            passport.authenticate('jwt', {session: false}),         
            OrderController.updateToDispatched);                
        app.put( '/api/orders/updateToOnTheWay',
                passport.authenticate('jwt', {session: false}),            
                OrderController.updateToOnTheWay);            
        app.put('/api/orders/updateToDelivered',
                    passport.authenticate('jwt', {session: false}),            
                    OrderController.updateToDelivered);   
        app.put('/api/orders/updateLatlng',passport.authenticate('jwt', {session: false}),
            OrderController.updateLatlng);                     
               
} 

