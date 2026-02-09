import React, { useState } from "react";

const LiveClasses = () => {
  const [classes, setClasses] = useState([
    { id: 1, title: "Math Class", time: "10:00 AM", status: "upcoming" },
    { id: 2, title: "Science Class", time: "12:00 PM", status: "upcoming" },
    { id: 3, title: "History Class", time: "2:00 PM", status: "ended" },
  ]);

  const startClass = (id) => {
    setClasses((prev) => prev.map((cls) => (cls.id === id ? { ...cls, status: "live" } : cls)));
  };

  const endClass = (id) => {
    setClasses((prev) => prev.map((cls) => (cls.id === id ? { ...cls, status: "ended" } : cls)));
  };

  const joinClass = (id) => {
    window.open(`https://meet.jit.si/Class-${id}`, "_blank");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-500 drop-shadow-lg">Live Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {classes.map((cls) => (
          <div key={cls.id} className="p-6 shadow-xl bg-gray-800 text-white rounded-2xl border border-gray-700 transform transition duration-300 hover:scale-105 hover:border-orange-500">
            <h2 className="text-2xl font-semibold text-orange-400 mb-2">{cls.title}</h2>
            <p className="text-gray-300 text-lg">Time: {cls.time}</p>
            {cls.status === "upcoming" && (
              <button onClick={() => startClass(cls.id)} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold text-lg transition duration-300">
                Start Class
              </button>
            )}
            {cls.status === "live" && (
              <div className="mt-4 flex space-x-3">
                <button onClick={() => joinClass(cls.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold text-lg transition duration-300">
                  Join Class
                </button>
                <button onClick={() => endClass(cls.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold text-lg transition duration-300">
                  End Class
                </button>
              </div>
            )}
            {cls.status === "ended" && <p className="text-red-400 mt-4 font-semibold text-lg">Class Ended</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
