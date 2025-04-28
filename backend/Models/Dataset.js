import mongoose from "mongoose";

// Define the schema for the dataset
const disasterSchema = new mongoose.Schema({
  type: String,
  count: Number,
});

const disasterInfoSchema = new mongoose.Schema({
  type: String,
  frequency: String,
  dateRange: String,
  detailsUrl: String,
});

const recodeSchema = new mongoose.Schema({
  Id: String,
  date: Date,
  remark: String,
  status: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profilePic: String,
});

const datasetSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  remark: { type: String, default: "Remark Not Added" },
  status: { type: String },
  Donations: String,
  savings: String,
  Distribution: String,
  BalanceAmount: String,
  usertraffic: Number,
  disasters: [disasterSchema],
  disasterLineChartData: [
    {
      date: String,
      count: Number,
    },
  ],
  users: [userSchema],
  disastersinfo: [disasterInfoSchema],
  recodes: [recodeSchema],
});

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;
