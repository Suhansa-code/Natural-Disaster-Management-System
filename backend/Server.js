import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbcon from "./Utils/db.js";
import AuthRoutes from "./Routes/Auth.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import cookieparser from "cookie-parser";
import cloudinary from "cloudinary";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

Dbcon();

app.use(express.json());
const allowedOrigins = [
  "https://artisanbespokefurniture.com",
  "https://www.artisanbespokefurniture.com/",
  "https://www.artisanbespokefurniture.com",
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
