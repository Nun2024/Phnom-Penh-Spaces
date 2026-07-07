"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { dashboardApi } from "@/lib/api";

type Booking = {
  id: string;
  client_name: string;
  client_email: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  payment_status: string;
  space?: {
    name: string;
  };
};

type DashboardStats = {
  totalBookings: number;
  grossRevenue: number;
  occupancyRate: number;
  upcomingReservations: Booking[];
  weeklyRevenue?: { day: string; revenue: number }[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardApi.stats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !stats) {
    return (
      <DashboardLayout>
        <div className="p-gutter text-error text-center mt-xl">
          <p className="text-headline-sm font-semibold">{error || 'Failed to load stats'}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-gutter">
        {/*  Header Metric Row  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
          <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
            <div className="flex justify-between items-start mb-sm">
              <span className="p-2 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">event_note</span>
              </span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant">Total Bookings</p>
            <div className="flex items-baseline gap-xs">
              <h3 className="text-headline-md font-headline-md">{stats.totalBookings}</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
            <div className="flex justify-between items-start mb-sm">
              <span className="p-2 bg-secondary-container/30 rounded-lg text-secondary">
                <span className="material-symbols-outlined">analytics</span>
              </span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant">Occupancy Rate</p>
            <div className="flex items-baseline gap-xs">
              <h3 className="text-headline-md font-headline-md">{stats.occupancyRate}%</h3>
              <span className="text-label-sm text-on-surface-variant">Avg all studios</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
            <div className="flex justify-between items-start mb-sm">
              <span className="p-2 bg-on-primary-fixed-variant/10 rounded-lg text-on-primary-fixed-variant">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant">Gross Revenue</p>
            <div className="flex items-baseline gap-xs">
              <h3 className="text-headline-md font-headline-md text-primary-container">
                ${Number(stats.grossRevenue).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/*  Main Operations Table  */}
        <div className="bg-surface-container-lowest rounded-xl custom-shadow overflow-hidden">
          <div className="px-md py-md border-b border-outline-variant flex justify-between items-center">
            <h4 className="text-headline-sm font-headline-sm text-on-surface">Upcoming Reservations</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant">
                  <th className="px-md py-sm font-label-md text-label-md">Customer</th>
                  <th className="px-md py-sm font-label-md text-label-md">Space</th>
                  <th className="px-md py-sm font-label-md text-label-md">Time Frame</th>
                  <th className="px-md py-sm font-label-md text-label-md">Paid</th>
                  <th className="px-md py-sm font-label-md text-label-md">Status</th>
                  <th className="px-md py-sm font-label-md text-label-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {stats.upcomingReservations.map((booking) => {
                  const initial = booking.client_name ? booking.client_name.substring(0, 2).toUpperCase() : '??';
                  return (
                    <tr key={booking.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-md py-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-xs font-bold text-secondary">
                            {initial}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface">{booking.client_name}</p>
                            <p className="text-xs text-on-surface-variant">{booking.client_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-md py-md text-label-md text-on-surface">
                        {booking.space?.name || 'Unknown Space'}
                      </td>
                      <td className="px-md py-md">
                        <p className="text-label-md text-on-surface">{booking.booking_date ? booking.booking_date.split('T')[0] : 'N/A'}</p>
                        <p className="text-xs text-on-surface-variant">{booking.start_time} - {booking.end_time}</p>
                      </td>
                      <td className="px-md py-md text-label-md font-bold text-on-surface">
                        ${Number(booking.total_price).toFixed(2)}
                      </td>
                      <td className="px-md py-md">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.payment_status === 'paid' ? 'bg-primary-container/10 text-on-primary-container' : 'bg-orange-100 text-orange-800'}`}>
                          {booking.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="px-md py-md text-right">
                        <button className="p-1 hover:bg-surface-container-high rounded-lg text-on-surface-variant">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {stats.upcomingReservations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-md py-xl text-center text-on-surface-variant">
                      No upcoming reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Secondary Section: Performance Graph / Map Placeholder  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest p-md rounded-xl custom-shadow h-64 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h5 className="text-label-md font-bold text-on-surface">Weekly Revenue Growth</h5>
              <select className="bg-surface border-none text-xs text-on-surface-variant focus:ring-0 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-xs py-md">
              {stats.weeklyRevenue && stats.weeklyRevenue.length > 0 ? (
                (() => {
                  const maxRev = Math.max(...stats.weeklyRevenue.map(d => d.revenue), 1);
                  return stats.weeklyRevenue.map((dayData, i) => {
                    const heightPercent = Math.max(10, (dayData.revenue / maxRev) * 100);
                    return (
                      <div key={i} className="flex-1 bg-primary-container/20 rounded-t-sm relative group" style={{ height: `${heightPercent}%` }}>
                        <div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 custom-shadow">
                          ${dayData.revenue.toFixed(2)}
                        </div>
                      </div>
                    );
                  });
                })()
              ) : (
                <>
                  <div className="flex-1 bg-primary-container/20 h-[40%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[65%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[55%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[85%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[45%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[90%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                  <div className="flex-1 bg-primary-container/20 h-[70%] rounded-t-sm relative group"><div className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm"></div></div>
                </>
              )}
            </div>
            <div className="flex justify-between text-[10px] text-on-surface-variant px-1 uppercase font-bold tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl custom-shadow relative overflow-hidden h-64 group">
            <img
              alt="Map of Phnom Penh Venues"
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhvqR0pxRt7xgfseW4keoBSpSHuE9vGyLyhsVaOC2bEl_AfnvRSBTH7R5WpPoh3AhspOAifPwzvdjUIWrPjnkdM7QwYSfEetHga3pI7dThRCp4vgG17B_Wyu8tTb5-BX41mNoGgDlQWY1fJs3N_YRmXP0K_eRtocEN4F8GPL8FSb_bNZSNmL1Iwo1n7xYCKu4RFdlJ2HX4cKy04rPI1wV1BtwwUpJu_AyKoTGl5G7DxHlXarbCWnaFF0Xg3htuBKqmfC0gZOTwFs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
              <p className="text-white text-headline-sm font-bold">Studio Locations</p>
              <p className="text-white/80 text-xs">Phnom Penh, Cambodia • 12 Active Spots</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
