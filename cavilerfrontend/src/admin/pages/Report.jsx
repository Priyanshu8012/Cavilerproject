import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FaSearch, FaChartPie } from "react-icons/fa";

const reportsData = [
  { id: 1, name: "John Doe", status: "Completed", date: "2025-03-10" },
  { id: 2, name: "Jane Smith", status: "Pending", date: "2025-03-09" },
  { id: 3, name: "Michael Brown", status: "In Progress", date: "2025-03-08" },
  { id: 4, name: "Sarah Wilson", status: "Completed", date: "2025-03-07" },
];

const statusColors = {
  Completed: "bg-green-500",
  Pending: "bg-yellow-500",
  "In Progress": "bg-blue-500",
};

const statusCounts = reportsData.reduce((acc, report) => {
  acc[report.status] = (acc[report.status] || 0) + 1;
  return acc;
}, {});

const pieChartData = Object.keys(statusCounts).map((key) => ({
  name: key,
  value: statusCounts[key],
}));

const COLORS = ["#34D399", "#FBBF24", "#3B82F6"]; // Green, Yellow, Blue

const ReportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reportsData.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <motion.div
        className="w-full max-w-5xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg mb-6">
          📊 Reports Dashboard
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-6 relative">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg p-4 rounded-xl text-lg bg-gray-800 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg pl-12"
          />
          <FaSearch className="absolute left-3 text-blue-400 text-xl" />
        </div>

        {/* Reports Table & Pie Chart Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reports Table */}
          <div className="overflow-x-auto">
            <motion.table
              className="w-full bg-gray-900/80 rounded-xl overflow-hidden border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-4 text-lg">👤 Name</th>
                  <th className="p-4 text-lg">✅ Status</th>
                  <th className="p-4 text-lg">📅 Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="p-4 text-lg">{report.name}</td>
                    <td className="p-4 text-lg">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-bold shadow-md ${
                          statusColors[report.status]
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="p-4 text-lg">{report.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          {/* Pie Chart */}
          <motion.div
            className="flex flex-col items-center justify-center bg-gray-800/90 p-6 rounded-xl shadow-lg relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
              <FaChartPie className="mr-2" /> Status Distribution
            </h2>
            <PieChart width={300} height={300}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportPage;

