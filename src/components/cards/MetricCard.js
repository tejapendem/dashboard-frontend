// src/components/MetricCard.js
import React from "react";

const MetricCard = ({ title, count }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{count}</p>
    </div>
  );
};

export default MetricCard;
