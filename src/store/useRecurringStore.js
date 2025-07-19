import { create } from 'zustand';
import React from "react";
const useRecurringStore = create((set) => ({
    frequency: 'daily',
    interval: 1,
    daysOfWeek: [],
    nthWeekday: { week: 1, day: 'Monday' },
    startDate: null,
    endDate: null,

    setFrequency: (frequency) => set({ frequency }),
    setInterval: (interval) => set({ interval }),
    setDaysOfWeek: (daysOfWeek) => set({ daysOfWeek }),
    setNthWeekday: (data) => set({ nthWeekday: data }),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),
}));
export default useRecurringStore;
