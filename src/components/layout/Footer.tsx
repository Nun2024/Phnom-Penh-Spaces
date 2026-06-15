import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-low border-t border-outline-variant">
      <div className="w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-headline-sm font-headline-sm text-on-surface">Phnom Creative</span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 text-center md:text-left">
            © 2024 Phnom Creative. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all">About</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all">Terms</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all">Contact</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all">Privacy Policy</Link>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:text-primary transition-colors border border-outline-variant">
            <span className="material-symbols-outlined text-xl">share</span>
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:text-primary transition-colors border border-outline-variant">
            <span className="material-symbols-outlined text-xl">public</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
