import productModel from "../model/productModel.js";

const addproduct = async (req, res)=>{
    
    try {
        const {name, description,price,category,subCategory,sizes} = req.body;
        console.log(name, description, price, category, subCategory,sizes);

        const productData = {
            name,
            description, 
            price:Number(price),
            category,
            subCategory,
            sizes:sizes,
        }
        
        const product = new productModel(productData);
        await product.save();

        console.log(product);

        res.json({success:true, message:"product is added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"add product is failed"})
    }
}

const productList = async (req, res) =>{
    
    try {
        const products = await productModel.find();
        console.log(products)

        res.json({success:true, message:products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:products})
    }
}


const deleteProduct = async(req,res)=>{
    try {
        
        const {id} = req.body;
        const product = await productModel.findByIdAndDelete(id);

        if(!product){
            console.log("product is not exist")
            return res.json("product is not exist")
        }

        
        res.json({success:true,message:"product deleted successfully"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const singleproduct = async(req,res)=>{
    try {
        const {id} = req.body;
        const product = await productModel.findById(id);
        console.log(product)
        res.json({success:true,message:product})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addproduct, productList,deleteProduct,singleproduct}