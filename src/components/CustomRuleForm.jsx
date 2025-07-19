import useRecurringStore from "../store/useRecurringStore";
import React from "react";
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

    return (
        <div className="mb-6 space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Repeat every:
                </label>
                <input
                    type="number"
                    min={1}
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    className="border p-2 rounded w-24"
                />{" "}
                {frequency}
            </div>

            {frequency === "weekly" && (
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Days of the Week:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-3 py-1 rounded-full border ${daysOfWeek.includes(day)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {frequency === "monthly" && (
                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                        Nth Weekday Pattern:
                    </label>
                    <div className="flex gap-4">
                        <select
                            className="border p-2 rounded"
                            value={nthWeekday.week}
                            onChange={(e) =>
                                setNthWeekday({ ...nthWeekday, week: Number(e.target.value) })
                            }
                        >
                            <option value={1}>First</option>
                            <option value={2}>Second</option>
                            <option value={3}>Third</option>
                            <option value={4}>Fourth</option>
                            <option value={5}>Fifth</option>
                            <option value={-1}>Last</option>
                        </select>

                        <select
                            className="border p-2 rounded"
                            value={nthWeekday.day}
                            onChange={(e) =>
                                setNthWeekday({ ...nthWeekday, day: e.target.value })
                            }
                        >
                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                                (day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
            )}

            <div className="flex gap-4 items-center">
                <label className="block text-gray-700 font-medium">Start:</label>
                <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                />
                <label className="block text-gray-700 font-medium">End:</label>
                <input
                    type="date"
                    value={endDate || ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>
        </div>
    );
}
