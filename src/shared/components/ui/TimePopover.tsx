import React, { useRef, useEffect } from 'react';
import { Clock, Sun, Cloud, Moon } from 'lucide-react';

interface TimePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export function TimePopover({ isOpen, onClose, selectedTime, onTimeSelect }: TimePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-9998" onClick={onClose} />
      <div ref={popoverRef} className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-9999 overflow-hidden max-h-[400px]">
          {/* Header fixe */}
          <div className="flex items-center gap-2 text-xs text-gray-500 p-4 pb-2 border-b border-gray-100">
            <Clock className="size-3" />
            <span>Opening Times: 7:00 AM - 11:00 PM</span>
          </div>
          {/* Contenu défilant */}
          <div className="p-4 pt-2 overflow-y-auto max-h-[340px]">
          <div className="mb-3">
            <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Sun className="size-3 text-yellow-500" />
              Early Morning
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['7:00 AM', '7:30 AM'].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    onTimeSelect(time);
                    onClose();
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTime === time
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Cloud className="size-3 text-blue-500" />
              Morning - afternoon
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    onTimeSelect(time);
                    onClose();
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTime === time
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Moon className="size-3 text-indigo-500" />
              Evening
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'].map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    onTimeSelect(time);
                    onClose();
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTime === time
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
