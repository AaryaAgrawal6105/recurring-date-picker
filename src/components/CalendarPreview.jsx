
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useRecurringStore from "../store/useRecurringStore";
import { getRecurringDates, getNthWeekdayOfMonth } from "../utils/recurrerence";
import {
    isSameDay,
    addDays,
    parseISO,
    format,
    isBefore,
    addMonths,
    addYears,

} from "date-fns";


export default function CalendarPreview() {
    const {
        startDate,
        endDate,
        frequency,
        interval,
        daysOfWeek,
        nthWeekday,
    } = useRecurringStore();

    if (!startDate)
        return <div className="text-gray-500">Select a start date to preview the calendar.</div>;

    const recurringDates = getRecurringDates({
        startDate,
        endDate,
        frequency,
        interval,
        daysOfWeek,
        nthWeekday,
    });

    const tileClassName = ({ date }) =>
        recurringDates.some((recurringDate) => isSameDay(recurringDate, date)) ? "highlight" : null;

    return (
        <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Mini Calendar Preview:</h4>
            <Calendar
                tileClassName={tileClassName}
                showNeighboringMonth={false}
            />
        </div>
    );
}

