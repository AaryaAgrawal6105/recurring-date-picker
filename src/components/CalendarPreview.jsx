
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useRecurringStore from "../store/useRecurringStore";


import {
    isSameDay,
    addDays,
    parseISO,
    format,
    isBefore,
    addMonths,
    addYears,

} from "date-fns";


function getNthWeekdayOfMonth(date, weekday, weekNum) {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const targetWeekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(weekday);

    const dates = [];
    for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === targetWeekday) {
            dates.push(new Date(d));
        }
    }

    if (weekNum === -1) return dates[dates.length - 1];
    return dates[weekNum - 1] || null;
}

function getRecurringDates({
    startDate,
    endDate,
    frequency,
    interval,
    daysOfWeek,
    nthWeekday,
}) {
    const result = [];

    if (!startDate || !frequency || !interval) return result;

    const start = parseISO(startDate);
    const max = endDate
        ? parseISO(endDate)
        : frequency === "yearly"
            ? addYears(start, 5)
            : frequency === "monthly"
                ? addMonths(start, 12)
                : addDays(start, 180);

    if (frequency === "daily") {
        let current = start;
        while (isBefore(current, max) || isSameDay(current, max)) {
            result.push(current);
            current = addDays(current, interval);
        }
    }

    else if (frequency === "weekly") {
        let current = start;
        while (isBefore(current, max) || isSameDay(current, max)) {
            const weekStart = current;
            for (let i = 0; i < 7; i++) {
                const day = addDays(weekStart, i);
                const name = format(day, "EEEE");
                if ((isBefore(day, max) || isSameDay(day, max)) && daysOfWeek.includes(name)) {
                    result.push(day);
                }
            }
            current = addDays(current, interval * 7);
        }
    }

    else if (frequency === "monthly") {
        let current = start;
        while (isBefore(current, max) || isSameDay(current, max)) {
            if (nthWeekday?.day && nthWeekday?.week) {
                const nthDate = getNthWeekdayOfMonth(current, nthWeekday.day, nthWeekday.week);

                if (
                    nthDate &&
                    (isBefore(nthDate, max) || isSameDay(nthDate, max)) &&
                    (isBefore(start, nthDate) || isSameDay(start, nthDate))
                ) {
                    result.push(nthDate);
                }
            }

            else {
                result.push(current);
            }
            current = addMonths(current, interval);
        }
    }

    else if (frequency === "yearly") {
        let current = start;
        while (isBefore(current, max) || isSameDay(current, max)) {
            result.push(current);
            current = addYears(current, interval);
        }
    }

    return result;
}




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

