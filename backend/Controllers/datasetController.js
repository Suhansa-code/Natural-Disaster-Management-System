import Dataset from "../Models/Dataset.js";

// Function to add the dataset to the database
export const addDataset = async (req, res) => {
  try {
    const dataset = new Dataset(req.body);
    await dataset.save(); // Save the dataset to the database
    res.status(201).json({ message: "Dataset added successfully!", dataset });
  } catch (error) {
    res.status(500).json({ message: "Failed to add dataset", error });
  }
};

export const updateDataset = async (req, res) => {
  const { id } = req.params; // Dataset ID to be updated
  const updatedData = req.body; // Data to update

  try {
    // Find dataset by ID and update it with new data
    const dataset = await Dataset.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated dataset
      runValidators: true, // Run validation on the updated data
    });

    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    res.status(200).json(dataset);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating dataset", error: error.message });
  }
};

// Delete dataset by ID
export const deleteDataset = async (req, res) => {
  const { id } = req.params; // Dataset ID to be deleted
  console.log(id);

  try {
    // Find and delete dataset by ID
    console.log("sample1");
    const dataset = await Dataset.findByIdAndDelete(id);
    console.log("sample");
    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    res.status(200).json({ message: "Dataset deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting dataset", error: error.message });
  }
};

// Get dataset by ID
export const getDataset = async (req, res) => {
  const { id } = req.params; // Dataset ID to fetch

  try {
    // Find dataset by ID
    const dataset = await Dataset.find();

    if (!dataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    res.status(200).json(dataset);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dataset", error: error.message });
  }
};
