import express from "express";
import {
  getAllDisasters,
  insertDisaster,
  getDisasterById,
  updateDisaster,
  deleteDisaster,
  approveDisaster,
  rejectDisaster,
} from "../Controllers/DisasterControllers.js";
const router = express.Router();

//Insert User controllers
router.get("/", getAllDisasters);
router.post("/", insertDisaster);
router.get("/:id", getDisasterById);
router.put("/:id", updateDisaster);
router.delete("/:id", deleteDisaster);
router.put("/:id/approve", approveDisaster);
router.put("/:id/reject", rejectDisaster);

export default router;
