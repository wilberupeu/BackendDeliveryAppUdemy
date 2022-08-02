const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const logger=require('morgan');
const cors=require('cors');
const multer=require('multer');
const admin=require('firebase-admin');
const serviceAccount=require('./serviceAccountKey.json');
const passport=require('passport');
const io=require('socket.io')(server);
const mercadopago=require('mercadopago');

/**
 * MERCADO PAGO CONFIGURACION
 */

mercadopago.configure({
    access_token:'TEST-55'
});

/*
 *  SOCKETS 
 */

const orderDeliverySocket=require('./sockets/orders_delivery_socket');

/*
 * INICIALIZAR FIREBASE ADMIN  
 */
admin.initializeApp(
    {
        credential:admin.credential.cert(serviceAccount)
    }
);

const upload=multer({
    storage:multer.memoryStorage()
})

/*
* RUTAS
*/
const users=require('./routes/usersRoutes');
const categories=require('./routes/categoriesRoutes');
const products=require('./routes/productsRouters');
const address=require('./routes/addressRoutes');
const orders=require('./routes/ordersRoutes');
const orders_delivery_socket = require('./sockets/orders_delivery_socket');
const mercadoPagoRoutes=require('./routes/mercadoPagoRoutes');


const port=process.env.PORT || 3000;
app.set('port',port);


//app.use(logger);
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
})); 

/*
* LLAMANDO A LA RUTAS
*/
users(app,upload); 
categories(app); 
address(app); 
orders(app);
products(app,upload); 
mercadoPagoRoutes(app); 



app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.disable('x-powered-by');
app.set('port',port);

//LLAMAR A SOCKETS

orderDeliverySocket(io);

server.listen(3000,'10.2.203.119' || 'localhost', function(){

    console.log('Aplicacion de NodeJS  process.pid '+process.pid+'  , port '+port+' Iniciada ');
}); 

/*
app.get('/',(req,res)=>{
    res.send('Ruta raiz del backend')
});
app.get('/test',(req,res)=>{
    res.send('Este es la ruta TEST ')
});*/

// ERROR HANDLER
app.use( (err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
 
});

module.exports={
    app:app,
    server:server
}

//  200 ok
//  404 no existe
//  500 error del servidor