"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function NewBookingPage() {
  const [selectedSpace, setSelectedSpace] = useState("");

  const prices: Record<string, number> = {
    glass: 45,
    industrial: 65,
    sonic: 80,
    garden: 35,
  };

  const currentPrice =
    selectedSpace && prices[selectedSpace]
      ? `$${prices[selectedSpace]}.00/hr`
      : "$0.00";

  const priceSubtitle =
    selectedSpace && prices[selectedSpace]
      ? "Base hourly rate for selected space."
      : "Select a space and times to calculate cost.";

  return (
    <DashboardLayout>
    <div className="bg-background text-on-surface min-h-screen relative overflow-hidden flex flex-col">
        {/*  Form Content Area  */}
        <main className="flex-1 flex flex-col items-center py-xl px-gutter relative z-10">
          <div className="w-full max-w-2xl">
            {/*  Header  */}
            <div className="mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                New Booking
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Manually add a reservation to the schedule.
              </p>
            </div>
            {/*  Main Form  */}
            <form className="space-y-lg">
              {/*  Section 1: Client Information  */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-primary">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                  <h3 className="font-headline-sm text-headline-sm">
                    Client Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="full_name"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                      id="full_name"
                      placeholder="e.g. Sok Hem"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface-variant"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                        id="email"
                        placeholder="client@example.com"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface-variant"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                        id="phone"
                        placeholder="+855 ..."
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/*  Section 2: Reservation Details  */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-primary">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-primary">
                    event_available
                  </span>
                  <h3 className="font-headline-sm text-headline-sm">
                    Reservation Details
                  </h3>
                </div>
                <div className="space-y-md">
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="space_select"
                    >
                      Select Space
                    </label>
                    <select
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all appearance-none"
                      id="space_select"
                      value={selectedSpace}
                      onChange={(e) => setSelectedSpace(e.target.value)}
                    >
                      <option disabled defaultValue="" value="">
                        Select a creative space
                      </option>
                      <option value="glass">The Glass Studio</option>
                      <option value="industrial">Industrial Loft</option>
                      <option value="sonic">Sonic Wave Suite</option>
                      <option value="garden">Botanical Terrace</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="booking_date"
                    >
                      Booking Date
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                        id="booking_date"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface-variant"
                        htmlFor="start_time"
                      >
                        Start Time
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                        id="start_time"
                        type="time"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface-variant"
                        htmlFor="end_time"
                      >
                        End Time
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                        id="end_time"
                        type="time"
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/*  Section 3: Pricing & Payment  */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-primary">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-primary">
                    payments
                  </span>
                  <h3 className="font-headline-sm text-headline-sm">
                    Pricing &amp; Payment
                  </h3>
                </div>
                {/*  Dynamic Summary Card  */}
                <div className="bg-primary-container/10 border border-primary-container p-md rounded-lg mb-md">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-label-md text-label-md text-on-primary-container">
                      Estimated Total
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary">
                      {currentPrice}
                    </span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-primary-fixed-variant italic">
                    {priceSubtitle}
                  </p>
                </div>
                <div className="space-y-md">
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="payment_status"
                    >
                      Payment Status
                    </label>
                    <select
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                      id="payment_status"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="staff_notes"
                    >
                      Staff Notes
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all resize-none"
                      id="staff_notes"
                      placeholder="Any special requirements or setup instructions..."
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </section>
              {/*  Actions  */}
              <div className="flex items-center justify-end gap-md pt-md pb-xl">
                <button
                  className="px-lg py-sm text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant rounded-lg transition-colors"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-on-primary px-xl py-sm rounded-lg font-headline-sm text-headline-sm shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all"
                  type="submit"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </main>
      {/*  Decorative Subtle Background Element  */}
      <div className="fixed top-0 right-0 -z-10 opacity-5 pointer-events-none">
        <svg
          fill="none"
          height="600"
          viewBox="0 0 600 600"
          width="600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="450" cy="150" r="300" stroke="#006C49" strokeWidth="2" />
          <circle
            cx="450"
            cy="150"
            r="250"
            stroke="#006C49"
            strokeDasharray="10 10"
            strokeWidth="1"
          />
          <circle
            cx="450"
            cy="150"
            r="200"
            stroke="#006C49"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
    </DashboardLayout>
  );
}
