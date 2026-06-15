import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-surface sticky docked full-width top-0 z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
        <Link href="/" className="text-headline-md font-headline-md text-primary">Phnom Creative</Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-xl">
          <Link href="#" className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1 transition-colors duration-200">
            Find a Space
          </Link>
          <Link href="#" className="font-label-md text-label-md text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200">
            Host your Space
          </Link>
        </div>
        <div className="flex items-center gap-sm">
          <button className="font-label-md text-label-md px-4 py-2 text-on-secondary-fixed-variant hover:text-primary transition-transform active:scale-90">
            Log In
          </button>
          <button className="font-label-md text-label-md px-6 py-2 bg-primary text-on-primary rounded-full hover:bg-opacity-90 transition-transform active:scale-90">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
