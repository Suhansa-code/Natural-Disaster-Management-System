const Disaster = require("../Model/disasterModel");

const getAllDisasters = async (req, res) => {
  let disasters;

  try {
    disasters = await Disaster.find();
  } catch (err) {
    console.log(err);
  }

  //if disaster not found
  if (!disasters) {
    return res.status(404).json({ message: "No disasters found" });
  }

  //display all disasters
  return res.status(200).json({ disasters });
};

//data insert

const insertDisaster = async (req, res, next) => {
  const {
  disasterType,
  severityLevel,
  description,
  numberOfPeopleAffected,
  images,
  date,
  Location,
  contact,
  } = req.body;

  let createdDisaster;

  try {
    createdDisaster = new Disaster({
      disasterType,
      severityLevel,
      description,
      numberOfPeopleAffected,
      images,
      date,
      Location,
      contact,
    });
    await createdDisaster.save();
  } catch (error) {
    console.log(error);
  }

  //if disaster not created
  if (!createdDisaster) {
    return res.status(404).send({ message: "Disaster not created" });
  }

  return res.status(200).send({ message: "Disaster created successfully" });
};
//Get by ID
const getDisasterById = async (req, res, next) => {
  const id = req.params.id;

  let disaster;

  try {
    disaster = await Disaster.findById(id);
  } catch (err) {
    console.log(err);
  }

  //if disaster not available
  if (!disaster) {
    return res.status(404).send({ message: "Disaster not found" });
  }

  return res.status(200).json({ disaster });
};

//Update disaster

const updateDisaster = async (req, res, next) => {
  const {
  disasterType,
  severityLevel,
  description,
  numberOfPeopleAffected,
  images,
  date,
  Location,
  contact,
  } = req.body;
  
  
  const id = req.params.id;

  let disaster;

  try {
    disaster = await Disaster.findByIdAndUpdate(id, {
  disasterType,
  severityLevel,
  description,
  numberOfPeopleAffected,
  images,
  date,
  Location,
  contact,
    });
    disaster = await disaster.save();
  } catch (err) {
    console.log(err);
  }

  if (!disaster) {
    return res.status(404).send({ message: "Unable to update disaster" });
  }

  return res.status(200).send({ message: "Disaster updated successfully" });
};

//Delete disaster

const deleteDisaster = async (req, res, next) => {
  const id = req.params.id;

  let disaster;

  try {
    disaster = await Disaster.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!disaster) {
    return res.status(404).send({ message: "Unable to delete disaster" });
  }

  return res.status(200).send({ message: "Disaster deleted successfully" });
};

exports.insertDisaster = insertDisaster;
exports.getAllDisasters = getAllDisasters;
exports.getDisasterById = getDisasterById;
exports.updateDisaster = updateDisaster;
exports.deleteDisaster = deleteDisaster;
