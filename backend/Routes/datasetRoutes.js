import express from "express";
import {
  addDataset,
  updateDataset,
  deleteDataset,
  getDataset,
} from "../Controllers/datasetController.js";

const router = express.Router();

// Add Dashbaord recode
router.get("/", getDataset);

// Add Dashbaord recode
router.post("/add", addDataset);

// Update Dashboard Recode
router.put("/:id", updateDataset);

// Update Dashboard Recode
router.delete("/:id", deleteDataset);

export default router;
