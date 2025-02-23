import Product from "../Models/Product.js";
import cloudinary from "../Middleware/cloudinary.js";

// Create Product with Multiple Images
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stoke } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload each image to Cloudinary and store the URLs and public IDs
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const { path, filename } = file;
        return { url: path, public_id: filename };
      })
    );

    // Create and save the product
    const product = new Product({
      name,
      description,
      price,
      category,
      images: uploadedImages,
      stoke,
    });

    try {
      await product.save();
    } catch (error) {
      // If saving the product fails, remove the uploaded images from Cloudinary
      await Promise.all(
        uploadedImages.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
      throw error; // Re-throw the error to be caught by the outer catch block
    }

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Delete Product with Multiple Images
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove all images from Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      })
    );

    // Remove the product from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//get single product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stoke } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stoke = stoke;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//product by category
const getSuggestedProducts = async (req, res) => {
  try {
    const { category } = req.params;

    // Find products related to the specified category
    const relatedProducts = await Product.find({ category }).limit(6);

    if (relatedProducts.length >= 6) {
      // If 6 or more related products are found, return them
      return res.status(200).json(relatedProducts);
    }

    // If fewer than 6 related products, fetch additional products from other categories
    const remainingCount = 6 - relatedProducts.length;
    const otherProducts = await Product.find({
      category: { $ne: category },
    }).limit(remainingCount);

    // Combine related products and other products
    const combinedProducts = [...relatedProducts, ...otherProducts];

    res.status(200).json(combinedProducts);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getSuggestedProducts,
  getSingleProduct,
};
