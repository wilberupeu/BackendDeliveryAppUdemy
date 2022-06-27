const { create } = require('../models/category');
const Category = require('../models/category');


module.exports={
    async create(req,res,next){

        try {
            const category=req.body;

            console.log(`Categoria enviada : ${category} `);

            const data= await Category.create(category);

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