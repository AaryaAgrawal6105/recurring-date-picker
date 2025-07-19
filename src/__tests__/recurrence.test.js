import { format } from 'date-fns';
import { getRecurringDates, getNthWeekdayOfMonth } from '../utils/recurrerence.js';
// Update all test expectations to use format(date, 'yyyy-MM-dd')

it('returns every 2 days between start and end date', () => {
  const result = getRecurringDates({
    startDate: '2025-07-01',
    endDate: '2025-07-07',
    frequency: 'daily',
    interval: 2,
  });

  expect(result.map(d => format(d, 'yyyy-MM-dd'))).toEqual([
    '2025-07-01',
    '2025-07-03',
    '2025-07-05',
    '2025-07-07',
  ]);
});

it('returns 2nd Tuesday of a month correctly', () => {
  const date = getNthWeekdayOfMonth(new Date('2025-07-01'), 'Tuesday', 2);
  expect(format(date, 'yyyy-MM-dd')).toBe('2025-07-08');
});

it('returns yearly recurrence every 2 years', () => {
  const result = getRecurringDates({
    startDate: '2020-01-01',
    endDate: '2026-01-01',
    frequency: 'yearly',
    interval: 2,
  });

  expect(result.map(d => format(d, 'yyyy-MM-dd'))).toEqual([
    '2020-01-01',
    '2022-01-01',
    '2024-01-01',
    '2026-01-01',
  ]);
});

it('returns correct nth weekday recurrence, skips past start', () => {
  const result = getRecurringDates({
    startDate: '2025-07-10',
    endDate: '2025-10-31',
    frequency: 'monthly',
    interval: 1,
    nthWeekday: {
      week: 2,
      day: 'Monday',
    },
  });

  expect(result.map(d => format(d, 'yyyy-MM-dd'))).toEqual([
    '2025-08-11',
    '2025-09-08',
    '2025-10-13',
  ]);
});

it('returns weekly dates on Mon & Wed every week', () => {
  const result = getRecurringDates({
    startDate: '2025-07-01',
    endDate: '2025-07-21',
    frequency: 'weekly',
    interval: 1,
    daysOfWeek: ['Monday', 'Wednesday'],
  });

  expect(result.map(d => format(d, 'yyyy-MM-dd'))).toEqual([
    '2025-07-02', // Wednesday
    '2025-07-07', // Monday
    '2025-07-09', // Wednesday
    '2025-07-14', // Monday
    '2025-07-16', // Wednesday
    '2025-07-21', // Monday
  ]);
});