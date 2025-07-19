# 📅 Recurring Date Picker

A customizable recurring date picker built using React, Zustand, and Tailwind CSS. It allows users to configure repeated event patterns such as daily, weekly, monthly, and yearly occurrences.

---

## ✅ Features

- **Daily** recurrence (e.g., every 2 days)
- **Weekly** recurrence with selectable days (e.g., every 1 week on Mon & Wed)
- **Monthly** recurrence:
  - Fixed day of the month
  - Nth weekday (e.g., 2nd Tuesday of every month)
- **Yearly** recurrence with configurable intervals
- Optional **end date** for recurrence
- **Mini calendar preview** with highlighted recurring dates
- All recurrence logic is tested and verified

---

## 📁 Project Structure
```
src/
├── components/
│ ├── RecurringPicker.jsx # Main UI for setting recurrence
│ └── CalendarPreview.jsx # Calendar with highlighted recurring dates
│
├── store/
│ └── useRecurringStore.js # Zustand store for recurrence settings
│
├── utils/
│ └── recurrerence.js # Core recurrence logic functions
│
├── tests/
│ └── recurrence.test.js # Unit tests for recurrence calculations
│
├── App.jsx # Main application component
└── main.jsx # Entry point
```


---

## 🧪 Testing

- Unit tests written with **Vitest**
- Coverage includes:
  - Daily interval logic
  - Weekly logic with multiple weekdays
  - Monthly nth weekday patterns
  - Yearly with interval
- Tests are located in `__tests__/recurrence.test.js`

To run tests:

```bash
npm run test
```
---
## 🔨Stack Used
```
React + Vite

Tailwind CSS

Zustand (global state)

date-fns (date utilities)

Vitest (testing)  
```
---

