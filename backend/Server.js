import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbcon from "./Utils/db.js";
import AuthRoutes from "./Routes/Auth.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import cookieparser from "cookie-parser";
import cloudinary from "cloudinary";
import productsRoute from "./Routes/ProductRoute.js";
import cart from "./Routes/CartRoute.js";
import purchaseHistoryRoute from "./Routes/PurchaseHistoryRoute.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

Dbcon();
app.use(express.json());
const allowedOrigins = [
  // "http://localhost:5173",
  // "http://localhost:3001",
  "https://artisanbespokefurniture.com",
  "https://www.artisanbespokefurniture.com/",
  "https://www.artisanbespokefurniture.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieparser());

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/cart", cart);
app.use("/api/v1/purchase-history", purchaseHistoryRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
