import useRecurringStore from "../store/useRecurringStore";
import React from "react";
const options = ["daily", "weekly", "monthly", "yearly"];

export default function FrequencySelector() {
    const { frequency, setFrequency } = useRecurringStore();

    return (
        <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Recurrence</label>
            <div className="flex gap-2 flex-wrap">
                {options.map((opt) => (
                    <button
                        key={opt}
                        className={`px-4 py-2 rounded-xl border ${frequency === opt ? "bg-blue-500 text-white" : "bg-gray-100"
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
