const express = require("express");
const router = express.Router();

//Insert model

const Disaster = require("../Model/disasterModel");

//Insert User controllers 

const DisasterController = require("../Controllers/DisasterControllers");

router.get("/",DisasterController.getAllDisasters);
router.post("/",DisasterController.insertDisaster);
router.get("/:id",DisasterController.getDisasterById);
router.put("/:id",DisasterController.updateDisaster);
router.delete("/:id",DisasterController.deleteDisaster);



module.exports = router;

