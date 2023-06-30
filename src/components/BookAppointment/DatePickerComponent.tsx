import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
    selectedDate: Date;
    handleDateChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ selectedDate, handleDateChange }) => {
    return (
        <div className="date-picker-container">
            <label htmlFor="date-picker">Select a date: </label>
            <DatePicker
                id="date-picker"
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat="MMMM dd, yyyy"
                showMonthYearPicker
            />
        </div>
    );
};

export default DatePickerComponent;
