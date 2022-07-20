module.exports=(io)=>{

const orderDeliveryNamespace=io.of('/orders/delivery');

orderDeliveryNamespace.on('connection',function(socket){
    console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery ');

    socket.on('position',function(data){
        console.log(`EMITO ${JSON.stringify(data)} `);
        orderDeliveryNamespace.emit(`position/${data.id_order}`,{lat:data.lat,lng:data.lng})
    }
    );

    socket.on('disconnet',function(data){
        console.log('USUARIO DESCONECTADO');

    });
}

);


}