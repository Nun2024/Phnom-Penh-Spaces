"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-surface sticky docked full-width top-0 z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
        <Link href="/" className="text-headline-md font-headline-md text-primary">Creative Space</Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-xl">
          <Link href="/" className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1 transition-colors duration-200">
            Find a Space
          </Link>
          <Link href="#" className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Host your Space
          </Link>
          {user?.role === 'ADMIN' && (
            <Link href="/dashboard" className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center gap-sm">
          {user ? (
            <div className="relative group">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
              {/* Dropdown Menu on hover */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-outline-variant rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 border-b border-outline-variant">
                  <p className="font-label-md text-on-surface truncate">{user.name}</p>
                  <p className="font-label-sm text-on-surface-variant truncate">{user.email}</p>
                </div>
                {user.role === 'ADMIN' && (
                  <Link href="/dashboard" className="block px-4 py-2 text-label-md hover:bg-surface-container-low text-primary border-b border-outline-variant">
                    Dashboard
                  </Link>
                )}
                <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-label-md hover:bg-surface-container-low text-on-surface border-b border-outline-variant transition-colors">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  My Profile
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-label-md hover:bg-surface-container-low text-error transition-colors rounded-b-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="font-label-md text-label-md px-4 py-2 text-on-secondary-fixed-variant hover:text-primary transition-transform active:scale-90">
                Log In
              </Link>
              <Link href="/signup" className="font-label-md text-label-md px-6 py-2 bg-primary text-on-primary rounded-full hover:bg-opacity-90 transition-transform active:scale-90">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

