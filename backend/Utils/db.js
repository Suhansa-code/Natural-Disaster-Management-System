import mongoose from "mongoose";

const Dbcon = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB is connected!");
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
	}
};

export default Dbcon;
