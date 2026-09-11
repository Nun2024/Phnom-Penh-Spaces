"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { authApi, bookingsApi } from '@/lib/api';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
};

type Booking = {
  id: string;
  space_id: string;
  start_time: string;
  end_time: string;
  booking_date?: string;
  total_price: number;
  status: string;
  space?: {
    name: string;
    location: string;
    images?: string[];
  };
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // We'll use the user data from localStorage as a fallback if the API fails
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        let loadedBookings: Booking[] = [];
        
        try {
          const profileData = await authApi.profile();
          setUser(profileData);
          if (profileData?.bookings && Array.isArray(profileData.bookings)) {
            loadedBookings = profileData.bookings;
          }
        } catch (err) {
          console.error("Failed to fetch profile, using cached data if available", err);
        }

        try {
          const bookingsData = await bookingsApi.list();
          let apiBookings: Booking[] = [];
          
          if (Array.isArray(bookingsData)) {
            apiBookings = bookingsData;
          } else if (bookingsData?.data && Array.isArray(bookingsData.data)) {
            apiBookings = bookingsData.data;
          } else if (bookingsData?.items && Array.isArray(bookingsData.items)) {
            apiBookings = bookingsData.items;
          }
          
          // Prioritize apiBookings, fallback to loadedBookings from profile
          let combined = apiBookings.length > 0 ? apiBookings : loadedBookings;
          
          const currentUser = user || (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);
          if (currentUser?.email && combined.length > 0) {
            const filtered = combined.filter((b: any) => 
              b.client_email === currentUser.email ||
              b.user?.email === currentUser.email ||
              b.user_id === currentUser.id
            );
            
            if (filtered.length > 0) {
              combined = filtered;
            }
          }
          
          setBookings(combined);
          
        } catch (err: any) {
          console.error("Failed to fetch bookings", err);
          if (loadedBookings.length > 0) {
            setBookings(loadedBookings);
          } else {
            setError("Failed to fetch bookings: " + (err.message || "Unknown error"));
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
          <h2 className="text-headline-sm text-on-surface mb-2">Oops!</h2>
          <p className="text-body-lg text-on-surface-variant mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-on-primary rounded-full hover:bg-opacity-90 transition-transform active:scale-95">
            Try Again
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-container-max mx-auto w-full px-gutter py-8 md:py-12">
        {/* Header Section */}
        <div className="bg-surface-container rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border border-outline-variant shadow-sm relative overflow-hidden">
          {/* Background decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-container text-primary flex items-center justify-center text-4xl font-bold shadow-inner flex-shrink-0 z-10">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              user?.name?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          
          <div className="text-center md:text-left flex-1 z-10">
            <h1 className="text-headline-md font-headline-md text-on-surface mb-2">{user?.name}</h1>
            <p className="text-body-lg text-on-surface-variant mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              {user?.email}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-medium">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              {user?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
            </div>
          </div>
          
          <button className="z-10 px-4 py-2 bg-surface text-primary border border-outline rounded-full hover:bg-surface-container-high transition-colors flex items-center gap-2 font-label-md">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-outline-variant mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 text-label-lg font-medium transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'profile'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-4 text-label-lg font-medium transition-colors whitespace-nowrap border-b-2 flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            My Bookings
            {bookings.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">
                {bookings.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <h2 className="text-title-lg text-on-surface font-title-lg">Account Details</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-label-md text-on-surface-variant mb-1">Full Name</p>
                    <p className="text-body-lg text-on-surface font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant mb-1">Email Address</p>
                    <p className="text-body-lg text-on-surface font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface-variant mb-1">Phone Number</p>
                    <p className="text-body-lg text-on-surface font-medium">
                      {user?.phone || (
                        <span className="text-on-surface-variant italic font-normal">Not provided</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <h2 className="text-title-lg text-on-surface font-title-lg">Security & Preferences</h2>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">password</span>
                      <span className="text-body-lg text-on-surface font-medium">Change Password</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">notifications</span>
                      <span className="text-body-lg text-on-surface font-medium">Notification Settings</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-surface-container-lowest border border-outline-variant border-dashed rounded-2xl">
                  <div className="w-24 h-24 bg-surface-container text-on-surface-variant rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-5xl">event_busy</span>
                  </div>
                  <h3 className="text-headline-sm text-on-surface mb-3 font-semibold">No bookings yet</h3>
                  <p className="text-body-lg text-on-surface-variant mb-8 max-w-[500px]">
                    You haven't made any space reservations. Explore our creative spaces and book your next session!
                  </p>
                  <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary rounded-full hover:bg-primary/90 transition-all font-label-lg shadow-md hover:shadow-lg active:scale-95">
                    Find a Space
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {bookings.map((booking) => {
                    // Helper to get status colors
                    const getStatusBadge = (status?: string) => {
                      if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
                      switch (status.toLowerCase()) {
                        case 'confirmed':
                        case 'approved':
                          return 'bg-green-100 text-green-800 border-green-200';
                        case 'pending':
                          return 'bg-orange-100 text-orange-800 border-orange-200';
                        case 'cancelled':
                        case 'rejected':
                          return 'bg-red-100 text-red-800 border-red-200';
                        default:
                          return 'bg-gray-100 text-gray-800 border-gray-200';
                      }
                    };

                    const dateStr = booking.booking_date ? booking.booking_date.split('T')[0] : new Date().toISOString().split('T')[0];
                    const parseTime = (timeStr: string) => {
                      if (!timeStr) return new Date();
                      if (timeStr.includes('T')) return new Date(timeStr);
                      // Handle "11:00:00" or "11:00"
                      const timeFormat = timeStr.length === 5 ? timeStr + ':00' : timeStr;
                      return new Date(`${dateStr}T${timeFormat}`);
                    };
                    const startDate = parseTime(booking.start_time);
                    const endDate = parseTime(booking.end_time);

                    return (
                      <div key={booking.id} className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row">
                        {/* Space Image (if available, else placeholder) */}
                        <div className="h-48 sm:h-auto sm:w-48 bg-surface-container relative flex-shrink-0 overflow-hidden">
                          {booking.space?.images && booking.space.images.length > 0 ? (
                            <img src={booking.space.images[0]} alt={booking.space.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary/40 bg-primary-container/20 group-hover:bg-primary-container/30 transition-colors">
                              <span className="material-symbols-outlined text-5xl">meeting_room</span>
                            </div>
                          )}
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-title-md font-title-md text-on-surface line-clamp-1 flex-1 pr-4">
                                {booking.space?.name || `Space ID: ${booking.space_id.substring(0, 8)}`}
                              </h3>
                              <span className="font-bold text-primary whitespace-nowrap">
                                ${booking.total_price}
                              </span>
                            </div>
                            
                            {booking.space?.location && (
                              <p className="text-body-sm text-on-surface-variant flex items-center gap-1 mb-4">
                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                <span className="truncate">{booking.space.location}</span>
                              </p>
                            )}
                            
                            <div className="bg-surface-container-lowest rounded-xl p-3 mb-4 space-y-2 border border-outline-variant/50">
                              <div className="flex items-center gap-2 text-body-sm text-on-surface">
                                <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                                <span>{startDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-2 text-body-sm text-on-surface">
                                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                                <span>
                                  {startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/30">
                            <button className="px-4 py-2 text-label-sm font-medium text-primary hover:bg-primary/5 rounded-full transition-colors">
                              View Details
                            </button>
                            {booking.status?.toLowerCase() !== 'cancelled' && new Date() < startDate && (
                              <button className="px-4 py-2 text-label-sm font-medium text-error hover:bg-error/5 border border-error/20 rounded-full transition-colors">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
