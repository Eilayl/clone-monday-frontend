import React, { useState, useEffect, useRef } from "react";
import './EditableCell.css';

type EditableCellProps = {
  value: any;
  onChange: (newValue: string) => void;
  type?: "text" | "date" | "status" | string;
};

const STATUS_OPTIONS = [
  { name: "In Progress", color: "yellow" },
  { name: "Done", color: "green" },
  { name: "Stuck", color: "red" },
];

export const EditableCell = ({ value, onChange, type = "text" }: EditableCellProps) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [statusView, setStatusView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startDay = firstDayOfMonth.getDay();
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

    const days = [];
    for (let i = 0; i < totalCells; i++) {
      const cellDate = new Date(year, month, i - startDay + 1);
      days.push({
        date: cellDate,
        isCurrentMonth: cellDate.getMonth() === month,
        isToday: cellDate.toDateString() === new Date().toDateString(),
      });
    }

    return days;
  };

  const calendarDays = getCalendarDays(currentDate);

  const prevMonth = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDatePick = (date: Date) => {
    setInputValue(DateFormat(date));
    setStatusView(false);
  };

  function DateFormat(date: number | string | Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        const ignoreAttr = target.closest('[data-ignore-clickoutside]');
        if (!ignoreAttr) setStatusView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (type === 'text') {
    return (
      <div className="cell-container">
        <input
          value={inputValue}
          placeholder="Task...."
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
    );
  }
  else if (type === 'status') {
    return (
      <div ref={ref} onClick={() => { setStatusView(!statusView); }} className="cell-container">
        <span className="status" style={{ backgroundColor: inputValue === 'In Progress' ? "yellow" : inputValue === "Stuck" ? "red" : inputValue === "Done" ? "green" : inputValue === "" ? "#f3f3f3" : "" }}>{inputValue || "Not fill yet"}</span>
        {statusView && <div className="status-options">
          {STATUS_OPTIONS.map(option => <span key={option.name} onClick={() => { setInputValue(option.name); }} style={{ backgroundColor: option.color }}>{option.name}</span>)}
        </div>}
      </div>
    );
  }
  else if (type === 'date') {
    return (
      <div ref={ref} onClick={() => { setStatusView(!statusView); }} className="cell-container">
        <span className="status" style={{ backgroundColor: inputValue === '' ? "#f3f3f3" : "" }}>{inputValue || "Not fill yet"}</span>
        {statusView && (
          <div className="date-picker">
            <div className="calendar-header">
              <button data-ignore-clickoutside="true" onClick={prevMonth}>&lt;</button>
              <span>{currentMonthName} {currentYear}</span>
              <button data-ignore-clickoutside="true" onClick={nextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="calendar-day-label">{day}</div>
              ))}
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`calendar-day${day.isCurrentMonth ? "" : " faded"}${day.isToday ? " today" : ""}`}
                  onClick={() => handleDatePick(day.date)}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  else return <span>Error</span>;
};
