// src/components/RecurringPicker.jsx
import React from "react";
import FrequencySelector from "./FrequencySelector";
import CustomRuleForm from "./CustomRuleForm";
import CalendarPreview from "./CalendarPreview";

export default function RecurringPicker() {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                Set Recurring Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                {/* Left Column: Form Controls */}
                <div className="space-y-6">
                    <FrequencySelector />
                    <hr/>
                    <CustomRuleForm />
                </div>

                {/* Right Column: Calendar Preview */}
                <div data-testid="calendar" className="mt-8 md:mt-0">
                    <CalendarPreview />
                </div>
            </div>
        </div>
    );
}