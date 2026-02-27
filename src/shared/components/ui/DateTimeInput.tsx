import React from 'react';
import { Calendar } from 'lucide-react';
import { CalendarPopover } from './CalendarPopover';
import { TimePopover } from './TimePopover';

interface DateTimeInputProps {
  date: Date;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  currentMonth: Date;
  label: string;
  dateBorderColor?: string;
  startDate?: Date;
  endDate?: Date;
  isPickup?: boolean;
  onDateSelected?: () => void;
  openTrigger?: number;
}

export interface DateTimeInputRef {
  openCalendar: () => void;
}

export const DateTimeInput = React.forwardRef<DateTimeInputRef, DateTimeInputProps>(({
  date,
  time,
  onDateChange,
  onTimeChange,
  currentMonth,
  label,
  dateBorderColor = "border-gray-300",
  startDate,
  endDate,
  isPickup = true,
  onDateSelected,
  openTrigger,
}, ref) => {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    openCalendar: () => setShowCalendar(true)
  }), []);

  React.useEffect(() => {
    if (openTrigger && openTrigger > 0) {
      setShowCalendar(true);
    }
  }, [openTrigger]);

  return (
    <div>
      <label className="text-xs font-medium text-gray-700 mb-2 block">
        {label}
      </label>
      <div className="flex gap-2 relative overflow-visible">
        <div className="flex-1 relative overflow-visible">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`w-full flex items-center gap-2 h-12 px-3 border ${dateBorderColor} rounded-md bg-white hover:bg-gray-50 text-sm font-medium`}
          >
            <Calendar className="size-4 text-gray-400" />
            <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </button>
          
          <CalendarPopover
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
            selectedDate={date}
            onDateSelect={(selectedDate) => {
              onDateChange(selectedDate);
              setShowCalendar(false);
              onDateSelected?.();
            }}
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            isPickup={isPickup}
          />
        </div>
        <div className="relative overflow-visible">
          <button
            onClick={() => setShowTime(!showTime)}
            className="h-12 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium min-w-[100px]"
          >
            {time}
          </button>
          
          <TimePopover
            isOpen={showTime}
            onClose={() => setShowTime(false)}
            selectedTime={time}
            onTimeSelect={onTimeChange}
          />
        </div>
      </div>
    </div>
  );
});

DateTimeInput.displayName = 'DateTimeInput';
