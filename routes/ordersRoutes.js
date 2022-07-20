const OrderController=require('../controllers/ordersController');
const passport=require('passport');
 
module.exports=(app)=>{

        // TRAER DATOS
        app.get('/api/orders/findByStatus/:status',OrderController.findByStatus);
        app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status',OrderController.findByDeliveryAndStatus);

        app.get('/api/orders/findByClientAndStatus/:id_client/:status',OrderController.findByClientAndStatus);

        //GUARDAR DATOS
        app.post(
            '/api/orders/create',            
            OrderController.create);

        //PUT ROUTES
        app.put(
            '/api/orders/updateToDispatched',            
            OrderController.updateToDispatched);    
            
        app.put(
                '/api/orders/updateToOnTheWay',            
                OrderController.updateToOnTheWay);              

        app.put(
                    '/api/orders/updateToDelivered',            
                    OrderController.updateToDelivered);   

        app.put(
            '/api/orders/updateLatlng',            
            OrderController.updateLatlng);                     
               
} 

