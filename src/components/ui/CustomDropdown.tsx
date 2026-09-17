"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CustomDropdownProps {
  options: string[];
  defaultValue?: string;
  icon?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
}

export function CustomDropdown({ options, defaultValue, icon, onChange, ariaLabel }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-white dark:bg-surface-container-low border text-on-surface font-label-md font-medium py-2 pl-4 pr-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 group ${isOpen ? "border-primary/50 shadow-md" : "border-outline-variant/30 hover:shadow hover:border-primary/40"}`}
      >
        <div className="flex items-center gap-2 pr-2">
          {icon && (
            <span
              className={`material-symbols-outlined text-[18px] transition-colors ${isOpen ? "text-primary" : "text-primary/70 group-hover:text-primary"}`}
              data-icon={icon}
            >
              {icon}
            </span>
          )}
          <span className="truncate max-w-[140px] text-left">{selected}</span>
        </div>
        <span
          className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : "text-on-surface-variant"}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute z-50 mt-2 w-full min-w-[190px] bg-white dark:bg-surface-container-low rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden transform transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-1">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 flex items-center justify-between ${
                selected === option
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
              }`}
            >
              {option}
              {selected === option && (
                <span className="material-symbols-outlined text-[16px] text-primary">check</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
