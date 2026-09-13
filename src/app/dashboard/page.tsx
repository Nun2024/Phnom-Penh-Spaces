"use client";


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
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState<{day: string; revenue: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, reservationsData, revenueWeeklyData] = await Promise.all([
          dashboardApi.stats(),
          dashboardApi.reservations(),
          dashboardApi.revenueWeekly()
        ]);
        setStats(statsData);
        
        let parsedReservations = [];
        if (Array.isArray(reservationsData)) {
          parsedReservations = reservationsData;
        } else if (reservationsData?.data) {
          parsedReservations = reservationsData.data;
        } else if (reservationsData?.reservations) {
          parsedReservations = reservationsData.reservations;
        }
        setReservations(parsedReservations);
        
        setWeeklyRevenue(revenueWeeklyData?.daily_breakdown || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-md rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[80px]">event_note</span>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="p-3 bg-primary/10 rounded-xl text-primary shadow-inner">
                <span className="material-symbols-outlined">event_note</span>
              </span>
            </div>
            <p className="text-label-md font-medium text-on-surface-variant relative z-10">Total Bookings</p>
            <div className="flex items-baseline gap-xs mt-1 relative z-10">
              <h3 className="text-[32px] leading-tight font-bold text-on-surface">{stats.totalBookings}</h3>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-md rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[80px]">analytics</span>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="p-3 bg-secondary/10 rounded-xl text-secondary shadow-inner">
                <span className="material-symbols-outlined">analytics</span>
              </span>
            </div>
            <p className="text-label-md font-medium text-on-surface-variant relative z-10">Occupancy Rate</p>
            <div className="flex items-baseline gap-xs mt-1 relative z-10">
              <h3 className="text-[32px] leading-tight font-bold text-on-surface">{stats.occupancyRate}%</h3>
              <span className="text-label-sm text-on-surface-variant">Avg all studios</span>
            </div>
          </div>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-container/20 to-surface-container-low p-md rounded-2xl shadow-sm border border-primary/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[80px]">payments</span>
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="p-3 bg-primary/20 rounded-xl text-primary shadow-inner">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </span>
            </div>
            <p className="text-label-md font-medium text-on-surface-variant relative z-10">Gross Revenue</p>
            <div className="flex items-baseline gap-xs mt-1 relative z-10">
              <h3 className="text-[32px] leading-tight font-bold text-primary">
                ${Number(stats.grossRevenue).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/*  Main Operations Table  */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="px-lg py-md border-b border-outline-variant/30 flex justify-between items-center bg-surface/50 backdrop-blur-sm">
            <h4 className="text-title-md font-semibold text-on-surface">Upcoming Reservations</h4>
            <button className="text-primary hover:text-primary-container text-sm font-medium transition-colors flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 text-on-surface-variant">
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider">Customer</th>
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider">Space</th>
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider">Time Frame</th>
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider">Paid</th>
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-lg py-sm text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {reservations.map((booking) => {
                  const initial = booking.client_name ? booking.client_name.substring(0, 2).toUpperCase() : '??';
                  return (
                    <tr key={booking.id} className="hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center text-sm font-bold text-on-surface border border-white/20 shadow-sm">
                            {initial}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-on-surface group-hover:text-primary transition-colors">{booking.client_name}</p>
                            <p className="text-xs text-on-surface-variant">{booking.client_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md text-sm text-on-surface font-medium">
                        {booking.space?.name || 'Unknown Space'}
                      </td>
                      <td className="px-lg py-md">
                        <p className="text-sm text-on-surface font-medium">{booking.booking_date ? new Date(booking.booking_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                           <span className="material-symbols-outlined text-[14px]">schedule</span>
                           {booking.start_time} - {booking.end_time}
                        </p>
                      </td>
                      <td className="px-lg py-md text-sm font-semibold text-on-surface">
                        ${Number(booking.total_price).toFixed(2)}
                      </td>
                      <td className="px-lg py-md">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${booking.payment_status === 'paid' ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-orange-100/50 text-orange-700 border-orange-200'}`}>
                          {booking.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right">
                        <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-lg py-xl text-center text-on-surface-variant flex flex-col items-center justify-center">
                       <span className="material-symbols-outlined text-[48px] text-outline mb-2">inbox</span>
                       <p>No upcoming reservations found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Secondary Section: Performance Graph / Map Placeholder  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-lg">
          <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant/30 h-72 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="text-title-sm font-semibold text-on-surface">Revenue Growth</h5>
                <p className="text-xs text-on-surface-variant">Daily performance</p>
              </div>
              <select className="bg-surface-container-low border border-outline-variant/50 rounded-lg text-sm text-on-surface px-3 py-1.5 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-2 sm:gap-4 py-2">
              {weeklyRevenue && weeklyRevenue.length > 0 ? (
                (() => {
                  const maxRev = Math.max(...weeklyRevenue.map(d => d.revenue), 1);
                  return weeklyRevenue.map((dayData, i) => {
                    const heightPercent = Math.max(8, (dayData.revenue / maxRev) * 100);
                    return (
                      <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t-lg relative group transition-colors duration-300" style={{ height: `${heightPercent}%` }}>
                        <div className="absolute inset-0 bg-primary/80 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-md">
                          ${dayData.revenue.toFixed(2)}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-surface-container-highest"></div>
                        </div>
                      </div>
                    );
                  });
                })()
              ) : (
                <>
                  <div className="flex-1 bg-primary/10 h-[40%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[65%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[55%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[85%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[45%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[90%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                  <div className="flex-1 bg-primary/10 h-[70%] rounded-t-lg relative group"><div className="absolute inset-0 bg-primary/20 h-0 group-hover:h-full transition-all duration-300 rounded-t-lg"></div></div>
                </>
              )}
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant px-2 font-medium pt-2 border-t border-outline-variant/20 mt-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 relative overflow-hidden h-72 group">
            <img
              alt="Map of Phnom Penh Venues"
              className="w-full h-full object-cover grayscale-[50%] opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhvqR0pxRt7xgfseW4keoBSpSHuE9vGyLyhsVaOC2bEl_AfnvRSBTH7R5WpPoh3AhspOAifPwzvdjUIWrPjnkdM7QwYSfEetHga3pI7dThRCp4vgG17B_Wyu8tTb5-BX41mNoGgDlQWY1fJs3N_YRmXP0K_eRtocEN4F8GPL8FSb_bNZSNmL1Iwo1n7xYCKu4RFdlJ2HX4cKy04rPI1wV1BtwwUpJu_AyKoTGl5G7DxHlXarbCWnaFF0Xg3htuBKqmfC0gZOTwFs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-lg">
              <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                   <span className="material-symbols-outlined text-white text-[18px]">location_on</span>
                   <p className="text-white text-title-sm font-bold">Studio Locations</p>
                </div>
                <p className="text-white/80 text-xs pl-6">Phnom Penh, Cambodia • 12 Active Spots</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
