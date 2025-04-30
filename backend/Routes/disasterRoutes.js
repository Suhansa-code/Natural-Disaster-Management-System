import express from "express";
import {
  getAllDisasters,
  insertDisaster,
  getDisasterById,
  updateDisaster,
  deleteDisaster,
} from "../Controllers/DisasterControllers.js";
const router = express.Router();

//Insert User controllers
router.get("/", getAllDisasters);
router.post("/", insertDisaster);
router.get("/:id", getDisasterById);
router.put("/:id", updateDisaster);
router.delete("/:id", deleteDisaster);

export default router;
