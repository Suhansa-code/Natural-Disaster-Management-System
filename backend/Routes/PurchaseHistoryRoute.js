import express from "express";
import {
  createPurchaseHistory,
  getPurchaseHistoryByUser,
  getAllPurchaseHistories,
  deletePurchaseHistory,
  getAllPurchaseHistories2,
} from "../Controllers/PurchaseHistoryCtrl.js";

const router = express.Router();

router.post("/", createPurchaseHistory);
router.get("/user/:userId", getPurchaseHistoryByUser);
router.get("/", getAllPurchaseHistories);
router.get("/all", getAllPurchaseHistories2);
router.delete("/:id", deletePurchaseHistory);

export default router;
