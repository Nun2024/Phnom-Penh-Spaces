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
                <span className="material-symbols-outlined text-[20px] text-white">person</span>
              </button>
              {/* Dropdown Menu on hover */}
              <div className="absolute right-0 top-full mt-3 w-56 bg-surface/95 backdrop-blur-md border border-outline-variant/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                <div className="p-4 mb-1">
                  <p className="font-headline-sm text-sm font-semibold text-on-surface truncate">{user.name}</p>
                  <p className="text-xs text-on-surface-variant truncate mt-0.5">{user.email}</p>
                </div>
                
                <div className="px-2 pb-2 flex flex-col gap-1">
                  {user.role === 'ADMIN' && (
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-primary/10 text-primary rounded-xl transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">dashboard</span>
                      Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-surface-container-high text-on-surface rounded-xl transition-colors duration-200">
                    <span className="material-symbols-outlined text-[20px]">account_circle</span>
                    My Profile
                  </Link>
                  
                  <div className="h-px bg-outline-variant/50 my-1 mx-2"></div>
                  
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium hover:bg-error/10 text-error rounded-xl transition-colors duration-200">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Log Out
                  </button>
                </div>
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

