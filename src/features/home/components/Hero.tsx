'use client';

import React, { useState } from 'react';

export function Hero() {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <header className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8 max-w-4xl mx-auto">
          Find and Reserve Your Next Creative Space in Phnom Penh
        </h1>
        {/* Search Container */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-4 md:p-2 rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row items-center gap-2 border border-outline-variant/30">
            {/* Space Type */}
            <div className="w-full flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-outline-variant/50 focus-within:bg-primary/5 transition-colors rounded-t-xl md:rounded-l-full md:rounded-tr-none">
              <span className="material-symbols-outlined text-primary mr-3">meeting_room</span>
              <div className="text-left w-full">
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Space Type</p>
                <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-body-md font-medium outline-none cursor-pointer appearance-none">
                  <option>All Spaces</option>
                  <option>Meeting Room</option>
                  <option>Podcast Studio</option>
                  <option>Art Workshop</option>
                </select>
              </div>
            </div>
            {/* Location */}
            <div className="w-full flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-outline-variant/50 focus-within:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-primary mr-3">location_on</span>
              <div className="text-left w-full">
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Location</p>
                <select className="w-full bg-transparent border-none p-0 focus:ring-0 text-body-md font-medium outline-none cursor-pointer appearance-none">
                  <option>Everywhere</option>
                  <option>BKK1</option>
                  <option>Tuol Kork</option>
                  <option>Daun Penh</option>
                </select>
              </div>
            </div>
            {/* Date */}
            <div className="w-full flex-1 flex items-center px-4 py-2 focus-within:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-primary mr-3">calendar_today</span>
              <div className="text-left w-full">
                <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Date</p>
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-body-md font-medium outline-none cursor-pointer" type="date" />
              </div>
            </div>
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary rounded-full font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-opacity-90 transition-transform active:scale-95 shadow-md min-w-[140px]"
            >
              <span className={`material-symbols-outlined ${isSearching ? 'animate-spin' : ''}`}>
                {isSearching ? 'refresh' : 'search'}
              </span>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
      {/* Subtle Ambient Background Decor */}
      <div className="absolute top-0 right-0 -z-0 opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </header>
  );
}
