const { create } = require('../models/product');
const Product = require('../models/product');
const storage=require('../utils/cloud_storage');
const asyncForEach =require('../utils/async_foreach');

module.exports={
    async create(req,res,next) {

        try {
            const product=JSON.parse(req.body.product);
            const files=req.files;
            let inserts =0;
            if(files.length===0){
                return res.status(501).json({
                     message: 'Error al registrar el producto  no tiene imagen',
                     success:false
                });
            }else{

                try {
                    const data= await Product.create(product); // save products
                    product.id=data.id;
                    const start =async ()=>{
                        await asyncForEach(files,async (file)=>{
                            const pathImage=`image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                            const url = await storage(file,pathImage);
                            if(url!==undefined && url !==nulll ){

                                if(inserts==0){ //IMAGEN 1
                                    product.image1=url;
                                }else if(inserts==1){ // IMAGEN 2
                                    product.image2=url;
                                }else if(inserts==2){ // IMAGEN 3
                                    product.image3=url;
                                }
                            }
                            await Product.update(product);
                            inserts= inserts+1;
                            if(inserts==files.length){
                                return res.status(201).json({
                                    success:true,
                                    message:'El producto se ha registrado correctamente'
                                });
                            }

                        });


                    }

                    start();
                    
                } catch (error) {
                    console.log(`Error: ${error} `);
                    return res.status(501).json({
                        message: `Error al registrar el producto ${error}`,
                        success:false,
                        error:error
                   });
                }

            }
    

            console.log(`Categoria enviada : ${product} `);

            const data= await Product.create(product);

            return res.status(201).json(
                {
                    success:true,
                    message:'la categoria se creo correctamente ',
                    data: data.id
                }
            );
        }
            catch(error){
                console.log(`Error : ${error}`);   
                return res.status(501).json({
                    success:false,
                    message:'Hubo un error al crear la categoria '
                });         
            }

    }
}