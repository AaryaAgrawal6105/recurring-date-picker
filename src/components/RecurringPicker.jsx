import FrequencySelector from "./FrequencySelector";
import React from "react";
import CustomRuleForm from "./CustomRuleForm";
import CalendarPreview from "./CalendarPreview";

export default function RecurringPicker() {
    return (
        <div className="max-w-4xl mx-auto p-6 rounded-2xl shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Recurring Date Picker</h2>
            <FrequencySelector />
            <CustomRuleForm />
            <div data-testid="calendar">
                <CalendarPreview />
            </div>
        </div>
    );
}
    