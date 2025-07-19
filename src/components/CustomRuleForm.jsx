// src/components/CustomRuleForm.jsx
import React from "react";
import useRecurringStore from "../store/useRecurringStore";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CustomRuleForm() {
    const {
        frequency,
        interval,
        daysOfWeek,
        setInterval,
        setDaysOfWeek,
        nthWeekday,
        setNthWeekday,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    } = useRecurringStore();

    const toggleDay = (day) => {
        setDaysOfWeek(
            daysOfWeek.includes(day)
                ? daysOfWeek.filter((d) => d !== day)
                : [...daysOfWeek, day]
        );
    };

    // Helper to style form inputs consistently
    const inputStyles = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="interval" className="block text-sm font-semibold text-gray-700">
                    Repeat every
                </label>
                <div className="mt-1 flex items-center gap-3">
                    <input
                        id="interval"
                        type="number"
                        min={1}
                        value={interval}
                        onChange={(e) => setInterval(Number(e.target.value))}
                        className={`${inputStyles} w-24`}
                    />
                    <span className="text-gray-600 font-medium">{frequency}</span>
                </div>
            </div>

            {frequency === "weekly" && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        On these days
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-3 py-1.5 text-sm rounded-full font-medium transition-colors duration-200 ${
                                    daysOfWeek.includes(day)
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {day.substring(0, 3)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {frequency === "monthly" && (
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        On the
                    </label>
                    <div className="flex gap-3">
                        <select
                            className={inputStyles}
                            value={nthWeekday.week}
                            onChange={(e) =>
                                setNthWeekday({ ...nthWeekday, week: Number(e.target.value) })
                            }
                        >
                            <option value={1}>First</option>
                            <option value={2}>Second</option>
                            <option value={3}>Third</option>
                            <option value={4}>Fourth</option>
                            <option value={-1}>Last</option>
                        </select>
                        <select
                            className={inputStyles}
                            value={nthWeekday.day}
                            onChange={(e) =>
                                setNthWeekday({ ...nthWeekday, day: e.target.value })
                            }
                        >
                            {days.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-semibold text-gray-700">
                        Start Date
                    </label>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate || ""}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`${inputStyles} mt-1`}
                    />
                </div>
                <div>
                    <label htmlFor="end-date" className="block text-sm font-semibold text-gray-700">
                        End Date
                    </label>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate || ""}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`${inputStyles} mt-1`}
                    />
                </div>
            </div>
        </div>
    );
}