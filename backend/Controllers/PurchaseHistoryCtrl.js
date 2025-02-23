import PurchaseHistory from "../Models/PurchaseHistory.js";
import Product from "../Models/Product.js";

// Create a new purchase history
const createPurchaseHistory = async (req, res) => {
  try {
    const {
      user,
      purchaseId,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderNotes,
      discount,
      invoiceUrl,
    } = req.body;

    // Create and save purchase history
    const purchaseHistory = new PurchaseHistory({
      user,
      purchaseId,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderNotes,
      discount,
      invoiceUrl,
    });

    await purchaseHistory.save();

    // Update product stock
    for (const item of products) {
      const productId = item.products; // Get the product ID from the request
      const quantityPurchased = item.quantity; // Get the quantity purchased

      // Update the product stock
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (product.stoke < quantityPurchased) {
        throw new Error(
          `Insufficient stock for product: ${product.name}. Available: ${product.stoke}, Requested: ${quantityPurchased}`
        );
      }

      product.stoke -= quantityPurchased; // Reduce stock
      await product.save(); // Save the updated product
    }

    res.status(201).json({
      message:
        "Purchase history created and product stock updated successfully",
      purchaseHistory,
    });
  } catch (error) {
    console.error("Error creating purchase history:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get purchase history by user ID
const getPurchaseHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchaseHistory = await PurchaseHistory.find({
      user: userId,
    }).populate("products.products");

    if (!purchaseHistory || purchaseHistory.length === 0) {
      return res
        .status(404)
        .json({ message: "No purchase history found for this user" });
    }

    res.status(200).json(purchaseHistory);
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get all purchase histories (admin access)
const getAllPurchaseHistories = async (req, res) => {
  try {
    const purchaseHistories = await PurchaseHistory.find()
      .populate("user")
      .populate("products.products");
    res.status(200).json(purchaseHistories);
  } catch (error) {
    console.error("Error fetching purchase histories:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getAllPurchaseHistories2 = async (req, res) => {
  try {
    const purchaseHistories = await PurchaseHistory.aggregate([
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Flatten the userDetails array
      },
      {
        $lookup: {
          from: "products", // The name of the Product collection
          localField: "products.products",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          _id: 1,
          purchaseId: 1,
          purchaseDate: 1,
          totalAmount: 1,
          paymentMethod: 1,
          paymentStatus: 1,
          orderNotes: 1,
          discount: 1,
          invoiceUrl: 1,
          "userDetails._id": 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
          products: 1,
          productDetails: {
            $map: {
              input: "$products",
              as: "item",
              in: {
                productId: "$$item.products",
                quantity: "$$item.quantity",
                price: "$$item.price",
                totalPrice: "$$item.totalPrice",
                imageUrl: "$$item.imageUrl",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "product",
                        cond: { $eq: ["$$product._id", "$$item.products"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(purchaseHistories);
  } catch (error) {
    console.error("Error fetching purchase histories:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Delete a purchase history by ID
const deletePurchaseHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const purchaseHistory = await PurchaseHistory.findByIdAndDelete(id);

    if (!purchaseHistory) {
      return res.status(404).json({ message: "Purchase history not found" });
    }

    res.status(200).json({ message: "Purchase history deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase history:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export {
  createPurchaseHistory,
  getPurchaseHistoryByUser,
  getAllPurchaseHistories,
  deletePurchaseHistory,
  getAllPurchaseHistories2,
};
