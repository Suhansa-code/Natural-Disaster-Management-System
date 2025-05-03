import Disaster from "../Models/disasterModel.js";

export const getAllDisasters = async (req, res) => {
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

export const insertDisaster = async (req, res, next) => {
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
      status: "Pending",
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
export const getDisasterById = async (req, res, next) => {
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

export const updateDisaster = async (req, res, next) => {
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
      status: "Pending",
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

export const deleteDisaster = async (req, res, next) => {
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

// Approve Disaster
export const approveDisaster = async (req, res) => {
  const { id } = req.params;
  try {
    const disaster = await Disaster.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!disaster)
      return res.status(404).json({ message: "Disaster not found" });
    res.json({ message: "Disaster approved successfully", disaster });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve disaster" });
  }
};

// Reject Disaster
export const rejectDisaster = async (req, res) => {
  const { id } = req.params;
  try {
    const disaster = await Disaster.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );
    if (!disaster)
      return res.status(404).json({ message: "Disaster not found" });
    res.json({ message: "Disaster rejected successfully", disaster });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject disaster" });
  }
};
