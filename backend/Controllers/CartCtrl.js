import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // Get product price for calculation
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        //check if the product is in stock
        if (product.stoke < cart.items[itemIndex].quantity + quantity) {
          return res.status(405).json({ message: "Product out of stock" });
        }
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        //check if the product is in stock
        if (product.stoke < quantity) {
          return res.status(405).json({ message: "Product out of stock" });
        }
        // Add new product
        cart.items.push({ product: productId, quantity });
      }

      // Recalculate total price
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.quantity * product.price,
        0
      );
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const messages = []; // Array to collect messages for the front end

    // Check if the product is in stock and adjust the quantity
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (product.stoke < item.quantity) {
        // Adjust quantity to available stock
        const adjustedQuantity = product.stoke;

        // Add message for the front end
        messages.push(
          `The quantity of "${product.name}" has been adjusted to ${adjustedQuantity} due to insufficient stock.`
        );

        // Update item quantity in the cart
        item.quantity = adjustedQuantity;

        // If no stock is available, remove the item from the cart
        if (adjustedQuantity === 0) {
          messages.push(
            `"${product.name}" has been removed from your cart as it is out of stock.`
          );
        }
      }
    }

    // Filter out items with zero quantity
    cart.items = cart.items.filter((item) => item.quantity > 0);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    await cart.save();

    res.status(200).json({ cart, messages });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the product to be removed
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const productPrice = item.price || 0; // Use `item.price` from the cart schema
      return total + item.quantity * productPrice;
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    //check if the product is in stock
    const product = await Product.findById(productId);
    if (product.stoke < item.quantity + 1) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    item.quantity += 1;
    cart.totalPrice += item.product.price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//decrease quantity
const decreaseQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity === 1) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be less than 1" });
    }

    item.quantity -= 1;
    cart.totalPrice -= item.product.price;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addToCart,
  clearCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
};
