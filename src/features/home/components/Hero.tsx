'use client';

import React, { useState } from 'react';

export interface HeroProps {
  onSearch?: (filters: { space_type?: string; search?: string }) => void;
}

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative w-full text-left outline-none" 
      tabIndex={0} 
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div 
        className="w-full cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[11px] uppercase tracking-wider font-bold text-outline">{label}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-body-lg font-bold text-on-surface truncate pr-2">{value}</span>
          <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </div>

      {isOpen && (
        <div 
          className="absolute left-0 mt-4 w-full min-w-[220px] bg-surface rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-outline-variant overflow-hidden z-[100] animate-fade-in origin-top" 
          style={{ top: '100%' }}
        >
          <div className="py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <div 
                key={opt}
                className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between ${
                  value === opt ? 'bg-primary/5 text-primary font-bold' : 'text-on-surface font-medium hover:bg-surface-container-low'
                }`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
                {value === opt && <span className="material-symbols-outlined text-[18px]">check</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function Hero({ onSearch }: HeroProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [spaceType, setSpaceType] = useState('All Spaces');
  const [location, setLocation] = useState('Everywhere');

  const handleSearch = () => {
    setIsSearching(true);
    
    if (onSearch) {
      onSearch({
        space_type: spaceType === 'All Spaces' ? undefined : spaceType,
        search: location === 'Everywhere' ? undefined : location,
      });
    }

    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  return (
    <header className="relative flex flex-col justify-center min-h-[600px] md:min-h-[700px] pt-24 pb-16">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuWnIOegY0vMScuVrHrwZGlLzXCT5heTQyvNgZWcioJsLnv_9tJILFO3dRuIGabJWzmyxRNdQYO0wPHc1Ehydrz5_lVtTnzXK7GAAB2TrV0pcE5JgGSpAbeCARRyYnWnrJtlK-9IGD3NcArch_0x4Vwe7zzktSD_mFMTM1rfXAFpwvLJ3tdUE6MxDgJQ8tO3ecptnvUmeT78BkOsOchuRxKWz5yApR5-8GlMi6ZRfJdt6J8W7qb5QzhN7Ckw-556e3YPDxnAJ2TKM" 
          alt="Creative Workspace"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </div>

      <div className="max-w-container-max mx-auto px-gutter relative z-10 w-full">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6 leading-tight drop-shadow-md">
            Find and Reserve Your Next Creative Space in Phnom Penh
          </h1>
          <p className="text-body-lg md:text-headline-sm text-white/90 mb-10 max-w-2xl drop-shadow">
            Discover inspiring workspaces tailored for professionals, artists, and innovators.
          </p>
        </div>

        {/* Search Container */}
        <div className="max-w-5xl animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 md:rounded-full rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2">
            
            {/* Space Type */}
            <div className="w-full flex-1 flex items-center px-6 py-4 bg-white/90 hover:bg-white transition-colors rounded-xl md:rounded-full relative">
              <span className="material-symbols-outlined text-primary mr-3 text-2xl">meeting_room</span>
              <CustomSelect 
                label="Space Type"
                options={['All Spaces', 'Meeting Room', 'Podcast Studio', 'Art Workshop']}
                value={spaceType}
                onChange={setSpaceType}
              />
            </div>
            
            {/* Location */}
            <div className="w-full flex-1 flex items-center px-6 py-4 bg-white/90 hover:bg-white transition-colors rounded-xl md:rounded-full relative">
              <span className="material-symbols-outlined text-primary mr-3 text-2xl">location_on</span>
              <CustomSelect 
                label="Location"
                options={['Everywhere', 'BKK1', 'Tuol Kork', 'Daun Penh']}
                value={location}
                onChange={setLocation}
              />
            </div>
            
            {/* Date */}
            <div className="w-full flex-1 flex items-center px-6 py-4 bg-white/90 hover:bg-white transition-colors rounded-xl md:rounded-full relative">
              <span className="material-symbols-outlined text-primary mr-3 text-2xl">calendar_today</span>
              <div className="text-left w-full cursor-pointer relative">
                <p className="text-[11px] uppercase tracking-wider font-bold text-outline">Date</p>
                <input 
                  className="w-full bg-transparent border-none p-0 mt-1 focus:ring-0 text-body-lg font-bold text-on-surface outline-none cursor-pointer" 
                  type="date" 
                />
              </div>
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full md:w-auto md:px-10 h-full min-h-[72px] bg-primary text-on-primary rounded-xl md:rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-transform active:scale-95 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className={`material-symbols-outlined text-2xl ${isSearching ? 'animate-spin' : ''}`}>
                {isSearching ? 'refresh' : 'search'}
              </span>
              <span className="md:hidden xl:inline">{isSearching ? 'Searching...' : 'Search Spaces'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
