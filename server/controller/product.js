import { Product } from "../moduls/product.js"
import {v2 as cloudinary} from "cloudinary"
const ListProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json( {success:true ,products});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};


const AddProducts = async (req, res) => {
  try {
    const { name, price, bestSeller, size, description, category } = req.body;

    // Initialize your images array first
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    // Create an array of images
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload images to Cloudinary and retrieve secure URLs
    let imageUrls = await Promise.all(images.map(async (item) => {
      const result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image"  // Corrected 'resourctype' to 'resource_type'
      });
      return result.secure_url;  // Return the secure URL
    }));

    console.log(imageUrls);

    const parsedPrice = Number(price);

    const parsedBestSeller = bestSeller === 'true' ? true : false;

     const parsedSize = size ? JSON.parse(size) : size;

    const newProduct = new Product({
      name,
      price: parsedPrice,  
      images: imageUrls,
      bestSeller: parsedBestSeller,  
      size: parsedSize, 
      description,  
      category,
      day: today 
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product submitted successfully', newProduct });

  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to submit product' });
  }
};

// for delet
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.status(200).json({succes:true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ success:false,message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};
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

const productDetail = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
export {AddProducts, productDetail ,ListProducts,deleteProduct,updateProduct,getProductById}
