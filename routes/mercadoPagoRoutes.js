const MercadoPagoController=require('../controllers/mercadoPagoController');
const passport=require('passport');

 module.exports=(app)=>{
        //POST
        app.post(
            '/api/payments/createPay',            
            MercadoPagoController.createPaymentCreditCart);              
} 

