import React, { useRef, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  currentMonth: Date;
  startDate?: Date;
  endDate?: Date;
  isPickup?: boolean;
}

export function CalendarPopover({ isOpen, onClose, selectedDate, onDateSelect, currentMonth, startDate, endDate, isPickup = true }: CalendarPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  useEffect(() => {
    if (popoverRef.current) {
      if (isOpen) {
        popoverRef.current.style.opacity = '0';
        popoverRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        requestAnimationFrame(() => {
          if (popoverRef.current) {
            popoverRef.current.style.transition = 'all 0.2s ease-out';
            popoverRef.current.style.opacity = '1';
            popoverRef.current.style.transform = 'translateY(0) scale(1)';
          }
        });
      } else {
        if (popoverRef.current) {
          popoverRef.current.style.transition = 'all 0.15s ease-in';
          popoverRef.current.style.opacity = '0';
          popoverRef.current.style.transform = 'translateY(-10px) scale(0.95)';
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setDisplayMonth(currentMonth);
  }, [currentMonth]);

  const navigateMonths = (direction: number) => {
    setDisplayMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-9998" onClick={onClose} />
      <div ref={popoverRef} className="absolute top-full right-0 mt-2 w-[350px] bg-white border border-gray-200 rounded-lg shadow-2xl z-9999 overflow-visible">
        {/* Header avec navigation */}
        <div className="flex items-center justify-between p-4 pb-0">
          <button
            onClick={() => navigateMonths(-1)}
            className="p-2 bg-gray-200  rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="size-5 text-gray-500 " />
          </button>
         
          <h3 className="text-base font-semibold text-gray-900">
            {displayMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h3>
         
          <button
            onClick={() => navigateMonths(1)}
            className="p-2 bg-gray-200  rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="size-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 pt-4 overflow-visible">
          <div className="max-w-sm mx-auto">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 text-center">
                {isPickup ? 'Date de retrait' : 'Date de retour'}
              </p>
              {startDate && endDate && (
                <p className="text-xs text-gray-500 text-center mt-1">
                  Sélection: {startDate.toLocaleDateString('fr-FR')} - {endDate.toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 42 }, (_, i) => {
                const dayNumber = i - displayMonth.getDay() + 1;
                const isValidDay = dayNumber > 0 && dayNumber <= new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
                let displayDay = dayNumber;
                let date;
                
                if (isValidDay) {
                  date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), dayNumber);
                } else if (dayNumber <= 0) {
                  const prevMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 0);
                  displayDay = prevMonth.getDate() + dayNumber;
                  date = new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, displayDay);
                } else {
                  displayDay = dayNumber - new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
                  date = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, displayDay);
                }
                
                const isSelected = isValidDay && 
                  dayNumber === selectedDate.getDate() &&
                  displayMonth.getMonth() === selectedDate.getMonth() &&
                  displayMonth.getFullYear() === selectedDate.getFullYear();
                const isToday = isValidDay && 
                  dayNumber === new Date().getDate() && 
                  displayMonth.getMonth() === new Date().getMonth() &&
                  displayMonth.getFullYear() === new Date().getFullYear();
                
                // Check if date is in range
                const isInRange = isValidDay && startDate && endDate && 
                  date >= startDate && date <= endDate;
                const isRangeStart = isValidDay && startDate && 
                  date.toDateString() === startDate.toDateString();
                const isRangeEnd = isValidDay && endDate && 
                  date.toDateString() === endDate.toDateString();
                
                // Disable dates before start date if selecting return
                const isDisabled = !isPickup && startDate && date < startDate;

                return (
                  <button
                    key={i}
                    disabled={!isValidDay || isDisabled}
                    onClick={() => {
                      if (isValidDay && !isDisabled) {
                        onDateSelect(date);
                        if (!isPickup) {
                          onClose();
                        }
                      }
                    }}
                    className={`
                      h-9 rounded-md text-sm font-medium transition-colors relative
                      ${!isValidDay || isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${isSelected ? 'bg-gray-900 text-white' : ''}
                      ${isToday && !isSelected ? 'bg-orange-500 text-white' : ''}
                      ${isRangeStart || isRangeEnd ? 'bg-gray-900 text-white' : ''}
                      ${isInRange && !isRangeStart && !isRangeEnd ? 'bg-primary/300' : ''}
                      ${!isSelected && !isToday && !isInRange && !isRangeStart && !isRangeEnd && isValidDay && !isDisabled ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `}
                  >
                    {displayDay > 0 ? displayDay : ''}
                    {isRangeStart && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                    )}
                    {isRangeEnd && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
