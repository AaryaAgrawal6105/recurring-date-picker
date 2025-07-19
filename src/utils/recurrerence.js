import {
    isSameDay,
    addDays,
    parseISO,
    format,
    isBefore,
    addMonths,
    addYears,
    isAfter,
    startOfDay,
  } from "date-fns";
  
  export function getNthWeekdayOfMonth(date, weekday, weekNum) {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    const targetWeekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(weekday);
  
    const dates = [];
  
    // Start from the 1st day of the month
    for (let day = 1; day <= 31; day++) {
      const current = new Date(year, month, day);
      if (current.getMonth() !== month) break; // Stop if we roll into the next month
  
      if (current.getDay() === targetWeekday) {
        dates.push(current);
      }
    }
  
    if (weekNum === -1) {
      return dates[dates.length - 1] || null;
    }
  
    // Handle week numbers beyond what exists in the month
    if (weekNum > dates.length) {
      return null;
    }
  
    return dates[weekNum - 1] || null;
  }
  
  export function getRecurringDates({
    startDate,
    endDate,
    frequency,
    interval,
    daysOfWeek,
    nthWeekday,
  }) {
    let result = []; // Changed to let to allow reassignment
  
    if (!startDate || !frequency || !interval) return result;
  
    // Use startOfDay to avoid timezone issues
    const start = startOfDay(parseISO(startDate));
    const max = endDate
      ? startOfDay(parseISO(endDate))
      : frequency === "yearly"
      ? startOfDay(addYears(start, 5))
      : frequency === "monthly"
      ? startOfDay(addMonths(start, 12))
      : startOfDay(addDays(start, 180));
  
    if (frequency === "daily") {
      let current = start;
      while (isBefore(current, max) || isSameDay(current, max)) {
        result.push(current);
        current = startOfDay(addDays(current, interval));
      }
    } else if (frequency === "weekly") {
      // Convert day names to numbers (0 = Sunday, 1 = Monday, etc.)
      const dayNumbers = daysOfWeek.map(day => 
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day)
      );
      
      // Find the first occurrence on or after start date
      let current = start;
      const resultSet = new Set();
      
      while (isBefore(current, max) || isSameDay(current, max)) {
        // Check the current week
        for (let i = 0; i < 7; i++) {
          const candidate = addDays(current, i);
          if (isAfter(candidate, max)) break;
          
          if (
            dayNumbers.includes(candidate.getDay()) &&
            (isAfter(candidate, start) || isSameDay(candidate, start))
          ) {
            resultSet.add(candidate.toISOString());
          }
        }
        current = addDays(current, interval * 7);
      }
      
      // Convert back to Date objects and sort
      result = Array.from(resultSet)
        .map(iso => new Date(iso))
        .sort((a, b) => a - b);
    } else if (frequency === "monthly") {
      if (nthWeekday?.day && nthWeekday?.week) {
        // Start from the month after the start date's month
        let currentMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        
        while (isBefore(currentMonth, max) || isSameDay(currentMonth, max)) {
          const nthDate = getNthWeekdayOfMonth(currentMonth, nthWeekday.day, nthWeekday.week);
          
          if (
            nthDate &&
            (isBefore(nthDate, max) || isSameDay(nthDate, max))
          ) {
            result.push(startOfDay(nthDate));
          }
          currentMonth = startOfDay(addMonths(currentMonth, interval));
        }
      } else {
        let current = start;
        while (isBefore(current, max) || isSameDay(current, max)) {
          result.push(startOfDay(current));
          current = startOfDay(addMonths(current, interval));
        }
      }
    } else if (frequency === "yearly") {
      let current = start;
      while (isBefore(current, max) || isSameDay(current, max)) {
        result.push(startOfDay(current));
        current = startOfDay(addYears(current, interval));
      }
    }
  
    return result;
  }