import { motion } from "framer-motion";
import planningBoard from "../../../assets/planning_board5.png";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EmergencyResponseSection({
  emergencyTypes,
  activeEmergency,
  setActiveEmergency,
}) {
  return (
    <section className="py-6 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Emergency Response Types
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Our advanced systems are designed to handle various types of natural
            disasters with precision and efficiency.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {emergencyTypes.map((type) => {
            const Icon = type.icon;

            return (
              <motion.div
                key={type.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-lg shadow-sm z-30 transition-all duration-300 hover:shadow-lg cursor-pointer border ${
                  activeEmergency === type.id
                    ? "border-green-500 bg-white shadow-md"
                    : "border-gray-100 bg-white"
                }`}
                onClick={() => setActiveEmergency(type.id)}
              >
                <div
                  className={`w-14 h-14 ${type.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <Icon className={`${type.color} w-6 h-6`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {type.name} Response
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Specialized protocols and technologies for effective{" "}
                  {type.name.toLowerCase()} disaster management.
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
