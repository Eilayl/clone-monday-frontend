import React, { useState, useEffect, useRef } from "react";

type EditableCellProps = {
  value: string;
  onChange: (newValue: string) => void;
  type?: "text" | "date" | "status" | string;
};

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

export const EditableCell = ({ value, onChange, type = "text" }: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

  const saveChanges = () => {
    setEditing(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const cancelChanges = () => {
    setInputValue(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveChanges();
    }
    if (e.key === "Escape") {
      cancelChanges();
    }
  };

  if (editing) {
    if (type === "status") {
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={saveChanges}
          onKeyDown={handleKeyDown}
          className="editable-input"
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onBlur={saveChanges}
        onKeyDown={handleKeyDown}
        className="editable-input"
      />
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className="editable-text"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEditing(true);
        }
      }}
      role="textbox"
      aria-label="Editable text"
    >
      {value}
    </div>
  );
};
