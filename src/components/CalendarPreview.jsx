// src/components/CalendarPreview.jsx
import React from "react";
import Calendar from "react-calendar";
import useRecurringStore from "../store/useRecurringStore";
import { getRecurringDates } from "../utils/recurrerence"; // Assuming this is your logic file
import { isSameDay } from "date-fns";

// Import default and custom calendar styles
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"; // Your custom styles

export default function CalendarPreview() {
    const {
        startDate,
        endDate,
        frequency,
        interval,
        daysOfWeek,
        nthWeekday,
    } = useRecurringStore();

    if (!startDate) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500">Select a start date to preview the schedule.</p>
            </div>
        );
    }

    const recurringDates = getRecurringDates({
        startDate,
        endDate,
        frequency,
        interval,
        daysOfWeek,
        nthWeekday,
    });

    const tileClassName = ({ date }) =>
        recurringDates.some((recurringDate) => isSameDay(recurringDate, date))
            ? "highlight" // This class is styled in Calendar.css
            : null;

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Schedule Preview
            </h4>
            <Calendar
                tileClassName={tileClassName}
                showNeighboringMonth={false}
                // The calendar will now be styled by Calendar.css
            />
        </div>
    );
}