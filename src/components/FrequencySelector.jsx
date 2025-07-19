// src/components/FrequencySelector.jsx
import React from "react";
import useRecurringStore from "../store/useRecurringStore";

const options = ["daily", "weekly", "monthly", "yearly"];

export default function FrequencySelector() {
  const { frequency, setFrequency } = useRecurringStore();

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Frequency
      </label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              frequency === opt
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFrequency(opt)}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}