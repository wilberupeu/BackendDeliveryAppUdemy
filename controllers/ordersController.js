const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');

module.exports={
 
    
    async findByStatus(req,res,next){
        try {
              
            const status=req.params.status;

            const data=await Order.findByStatus(status) ;

            console.log(` Orders ${JSON.stringify(data)} `);

            return res.status(201).json(
                data
            );            

        } 
        catch(error){
            console.log(`Error : ${error}`);   
            return res.status(501).json({
                success:false,
                message:'Hubo un error al tratar de obtener las ordenes por estado ',
                error:error
            });         
        }        

    }, 
 
    async findByDeliveryAndStatus(req,res,next){
        try {
              
            const id_delivery=req.params.id_delivery;
            const status=req.params.status;
            const data=await Order.findByDeliveryAndStatus(id_delivery,status) ;
            console.log(` Status delivery  ${JSON.stringify(data)} `);

            return res.status(201).json(
                data
            );            

        } 
        catch(error){
            console.log(`Error : ${error}`);   
            return res.status(501).json({
                success:false,
                message:'Hubo un error al tratar de obtener las ordenes por estado ',
                error:error
            });         
        }        

    }, 
    async findByClientAndStatus(req,res,next){
        try {
              
            const id_client=req.params.id_client;
            const status=req.params.status;
            const data=await Order.findByClientAndStatus(id_client,status) ;
            console.log(` Status delivery  ${JSON.stringify(data)} `);

            return res.status(201).json(
                data
            );            

        } 
        catch(error){
            console.log(`Error : ${error}`);   
            return res.status(501).json({
                success:false,
                message:'Hubo un error al tratar de obtener las ordenes por estado ',
                error:error
            });         
        }        

    }, 
    async create(req,res,next){
        try {
            let order=req.body;
            order.status='PAGADO';
            console.log(`Orden enviada : ${JSON.stringify(order)}    `);
            const data= await Order.create(order);
           
            // RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN
            for(const product of order.products){

                console.log(`---> Producto : ${JSON.stringify(product)}    `);  

await OrderHasProduct.create(data.id,product.id,product.quantity);
            }
            return res.status(201).json(
                {
                    success:true,
                    message:'la orden se creo correctamente ',
                    data: data.id
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al creando la orden '
                });         
            }
    },


    async updateToDispatched(req,res,next){
        try {
            let order=req.body;
            order.status='DESPACHADO';
            console.log(`Dirección enviada : ${order} `);
            await Order.update(order);

    
            return res.status(201).json(
                {
                    success:true,
                    message:'la orden se actualizo correctamente '
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al actualizar la orden '
                });         
            }
    },

    async updateToOnTheWay(req,res,next){
        try {
            let order=req.body;
            order.status='EN CAMINO';
            //order.status='DESPACHADO';
            console.log(`Dirección enviada : ${order} `);
            await Order.update(order);
 
    
            return res.status(201).json(
                {
                    success:true,
                    message:'la orden se actualizo correctamente '
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al actualizar la orden '
                });         
            }
    },
    async updateToDelivered(req,res,next){
        try {
            let order=req.body;
            //order.status='EN CAMINO';
            order.status='ENTREGADO';
            console.log(`Dirección enviada : ${order} `);
            await Order.update(order);
 
    
            return res.status(201).json(
                {
                    success:true,
                    message:'la orden se actualizo correctamente '
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al actualizar la orden '
                });         
            }
    },

    async updateLatlng(req,res,next){
        try {
            let order=req.body;
  
            
            console.log(`Dirección enviada : ${order} `);
            
            await Order.updateLatLng(order);
 
    
            return res.status(201).json(
                {
                    success:true,
                    message:'la orden se actualizo correctamente '
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al actualizar la orden '
                });         
            }
    },    

}