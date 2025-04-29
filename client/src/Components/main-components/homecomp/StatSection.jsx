import { motion } from "framer-motion";

const stats = [
  { value: "98%", label: "Accuracy Rate" },
  { value: "15min", label: "Average Response Time" },
  { value: "500+", label: "Disasters Managed" },
  { value: "24/7", label: "Monitoring & Support" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function StatsSection() {
  return (
    <section className="relative z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Top Wave */}
      <div className="-mt-1">
        <svg
          className="w-full h-[80px] text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,154.7C672,149,768,171,864,176C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160V0H0Z"
          />
        </svg>
      </div>

      {/* Stats Content */}
      <div className="relative z-10 py-20 px-4 container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center p-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl hover:scale-105 z-50 shadow-lg transition-all duration-300"
            >
              <div className="text-4xl font-bold mb-2 text-green-400">
                {stat.value}
              </div>
              <p className="text-sm text-gray-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="-mb-1">
        <svg
          className="w-full h-[80px] text-white"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,64C672,53,768,75,864,106.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96V320H0Z"
          />
        </svg>
      </div>
    </section>
  );
}
