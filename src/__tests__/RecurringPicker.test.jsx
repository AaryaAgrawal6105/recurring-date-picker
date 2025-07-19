import React from "react";
import { render, screen } from "@testing-library/react";
import RecurringPicker from "../components/RecurringPicker";
import { vi } from "vitest";

vi.mock("react-calendar", () => ({
  __esModule: true,
  default: ({ tileClassName }) => {
    // simulate rendered calendar
    return (
      <div data-testid="calendar">
        <div className={tileClassName({ date: new Date("2025-07-14") })}>
          14
        </div>
      </div>
    );
  },
}));

test("renders RecurringPicker with calendar", () => {
  render(<RecurringPicker />);
  expect(screen.getByText("Recurring Date Picker")).toBeInTheDocument();
  expect(screen.getByTestId("calendar")).toBeInTheDocument();
});
