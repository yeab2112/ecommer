import { Product } from "../moduls/product.js"

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  };
  
  export{ getAllProducts}


const  Products=async (req, res) => {
    try {
    const { name, price,image,prand,descrption,catagory } = req.body;
    
     if (!name || !price ||!image) {
     return res.status(400).json({ error: 'Missing required fields' })};
     {
    const newProduct = new Product({ name, price, image,prand,descrption, catagory});

    await newProduct.save();
    
    res.status(201).json({ message: 'product submitted successfully' ,newProduct}) };
     }catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to submit product' });
    }
    };
    export{Products}
    // for delet
    const deleteProduct = async (req, res) => {
      try {
        const productId = req.params.id; 
        const deletedProduct = await Product.findByIdAndDelete(productId);
    
        if (deletedProduct) {
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
    };
    export{deleteProduct}
    //update
    const updateProduct = async (req, res) => {
      try {
        const productId = req.params.id; 
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    
        if (updatedProduct) {
          res.status(200).json(updatedProduct); // Send back the updated product
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
      }
    };
    export{updateProduct }

//forget to update
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; 
    const product = await Product.findById(productId);
console.log(product)
    if (product) {
      res.status(200).json(product); 
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};
export{getProductById }
const Search= async (req, res) => {
  const { name, prand, catagory, price } = req.query;

  let query = {}; 

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }
  if (prand) {
    query.prand = prand;
  }
  if (catagory) {
    query.catagory = catagory; 
  }
  if (price) {
    query.price = parseFloat(price); 
  }
  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products' });
  }
};
export{Search}
const broductDetail=async(req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
export{broductDetail}
