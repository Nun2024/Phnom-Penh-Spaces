"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Simple Micro-interaction for menu buttons
    document.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.classList.add("scale-95");
        setTimeout(() => this.classList.remove("scale-95"), 100);
      });
    });
  }, []);

  const getLinkClass = (path: string, exact = false) => {
    const active = exact ? pathname === path : pathname?.startsWith(path);
    return active
      ? "flex items-center gap-sm px-sm py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-high transition-all duration-200 translate-x-1"
      : "flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200";
  };

  const getIconStyle = (path: string, exact = false) => {
    const active = exact ? pathname === path : pathname?.startsWith(path);
    return {
      fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
    };
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/*  SideNavBar Shell  */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-md px-sm z-50">
        <div className="mb-lg px-sm">
          <h1 className="text-headline-md font-headline-md text-primary">
            StudioConnect
          </h1>
          <p className="text-label-sm text-on-surface-variant opacity-70">
            Phnom Penh Manager
          </p>
        </div>
        <nav className="flex-1 space-y-xs">
          <Link
            className={getLinkClass("/dashboard", true)}
            href="/dashboard"
          >
            <span className="material-symbols-outlined" data-icon="dashboard" style={getIconStyle("/dashboard", true)}>
              dashboard
            </span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link
            className={getLinkClass("/bookings")}
            href="/bookings/new"
          >
            <span
              className="material-symbols-outlined"
              data-icon="calendar_today"
              style={getIconStyle("/bookings")}
            >
              calendar_today
            </span>
            <span className="font-label-md text-label-md">Bookings</span>
          </Link>
          <Link
            className={getLinkClass("/spaces")}
            href="/spaces"
          >
            <span
              className="material-symbols-outlined"
              data-icon="meeting_room"
              style={getIconStyle("/spaces")}
            >
              meeting_room
            </span>
            <span className="font-label-md text-label-md">Spaces</span>
          </Link>
          <a
            className={getLinkClass("/analytics")}
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="bar_chart" style={getIconStyle("/analytics")}>
              bar_chart
            </span>
            <span className="font-label-md text-label-md">Analytics</span>
          </a>
          <a
            className={getLinkClass("/settings")}
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings" style={getIconStyle("/settings")}>
              settings
            </span>
            <span className="font-label-md text-label-md">Settings</span>
          </a>
        </nav>
        <div className="mt-auto p-sm">
          <button className="w-full bg-primary text-on-primary py-sm rounded-lg font-label-md flex items-center justify-center gap-xs hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[20px]" data-icon="add">
              add
            </span>
            New Booking
          </button>
          <div className="mt-md pt-md border-t border-outline-variant flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
              <img
                alt="Venue Manager Profile"
                className="w-full h-full object-cover"
                data-alt="A professional headshot of a smiling Southeast Asian venue manager in a clean, modern studio setting with soft natural lighting and a minimalist background. The lighting is bright and high-key, conveying professional trust and a welcoming atmosphere characteristic of a premium Phnom Penh creative agency."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvwx1Zlxh-f5PAGqA7g55KH9XgHaczItpCYun8yussECIeaesHzGjKnf19GQemaPJt0hUVSNxixmG-DrfpBVmZey0Dw_wq-BWAz97RAw849LcG_o7HJgKrwURusVc8MxUdgj0GAHlarvc40xCWgOKNzASouXitmPlR59N6MFK_yBaFTxCZmSEuDlmY-dI05gb8VddQbzAAxvTR13Yvj6yNXoBNLNctjJvmcHL1Pkofpflp2fQWNQpGaXgIrjoF8zOxn8hAV2CL-gc"
              />
            </div>
            <div className="overflow-hidden">
              <p className="font-label-md text-label-md text-on-surface truncate">
                Vathanak Manager
              </p>
              <p className="text-xs text-on-surface-variant truncate">
                Premium Account
              </p>
            </div>
          </div>
        </div>
      </aside>
      {/*  TopAppBar Shell  */}
      <header className="fixed top-0 right-0 left-64 h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-md z-40">
        <div className="flex items-center gap-lg">
          <h2 className="text-headline-sm font-headline-sm text-on-surface">
            Manager Dashboard
          </h2>
          <nav className="hidden md:flex gap-md">
            <a
              className="text-label-md font-label-md text-primary border-b-2 border-primary pb-1"
              href="#"
            >
              Overview
            </a>
            <a
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Reports
            </a>
            <a
              className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Activity
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative group">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant"
              data-icon="search"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              placeholder="Search reservations..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-sm">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined" data-icon="help_outline">
                help_outline
              </span>
            </button>
          </div>
        </div>
      </header>
      {/*  Main Content Canvas  */}
      <main className="ml-64 mt-16 bg-surface-container-low min-h-screen">
        {children}
      </main>
    </div>
  );
}
