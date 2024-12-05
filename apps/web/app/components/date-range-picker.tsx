import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  rangeMaxInDays?: number;
  maxDate?: Date;
  onStartDateChange: (date?: Date | undefined) => void;
  onEndDateChange: (date?: Date | undefined) => void;
}

const DAY = 1000 * 60 * 60 * 24;

const DateRangePicker: FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  rangeMaxInDays = 7,
  maxDate = new Date(),
  onStartDateChange,
  onEndDateChange,
}) => {
  const today = new Date();

  const handleStartDateChange = (date: Date | null) => {
    if (!date) {
      onStartDateChange(undefined);
      return;
    }

    const dateTimestamp = date.getTime();
    const endDateTimestamp = endDate ? endDate.getTime() : undefined;

    if (dateTimestamp > today.getTime()) {
      alert("Start date cannot be in the future.");
      return;
    }
    if (endDateTimestamp && dateTimestamp > endDateTimestamp) {
      alert("Start date cannot be after end date.");
      return;
    }
    if (
      endDateTimestamp &&
      rangeMaxInDays &&
      (endDateTimestamp - dateTimestamp) / DAY > rangeMaxInDays
    ) {
      alert(`The date range cannot exceed ${rangeMaxInDays} days.`);
      return;
    }

    onStartDateChange(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date) {
      onEndDateChange(undefined);
      return;
    }

    const dateTimestamp = date.getTime();
    const startDateTimestamp = startDate ? startDate.getTime() : undefined;

    if (dateTimestamp > today.getTime()) {
      alert("End date cannot be in the future.");
      return;
    }
    if (startDateTimestamp && dateTimestamp < startDateTimestamp) {
      alert("End date cannot be before start date.");
      return;
    }
    if (
      startDateTimestamp &&
      rangeMaxInDays &&
      (dateTimestamp - startDateTimestamp) / DAY > rangeMaxInDays
    ) {
      alert(`The date range cannot exceed ${rangeMaxInDays} days.`);
      return;
    }

    onEndDateChange(date);
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          maxDate={maxDate}
          className="mt-1 p-2 border border-gray-300 rounded"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          maxDate={maxDate}
          className="mt-1 p-2 border border-gray-300 rounded"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
