'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { spacesApi, bookingsApi } from '@/lib/api';

const DAYS = [
  { short: 'MON', date: '12' },
  { short: 'TUE', date: '13' },
  { short: 'WED', date: '14' },
  { short: 'THU', date: '15' },
  { short: 'FRI', date: '16' },
  { short: 'SAT', date: '17' },
  { short: 'SUN', date: '18' },
];

const TIMES = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingPage({ params }: { params: { id: string } }) {
  const [space, setSpace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Selection slots state
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  
  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Load pre-filled user details if logged in
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setClientName(userObj.name || '');
          setClientEmail(userObj.email || '');
          setClientPhone(userObj.phone || '');
        } catch (e) {
          console.error(e);
        }
      }
    }

    const fetchSpaceDetails = async () => {
      try {
        const data = await spacesApi.get(params.id);
        setSpace(data);
      } catch (err: any) {
        setError(err.message || 'Could not load space details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceDetails();
  }, [params.id]);

  const toggleSlot = (day: string, time: string) => {
    const slotId = `${day}-${time}`;
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
    } else {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlots.length === 0) return;

    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      const pricePerHour = space ? parseFloat(space.price_per_hour) : 0;
      const subtotal = selectedSlots.length * pricePerHour;
      const serviceFee = 5.00;
      const totalAmount = subtotal + serviceFee;

      // Extract details for API
      // Since booking date is required, we use the current date or first slot date
      const today = new Date().toISOString().split('T')[0];

      await bookingsApi.create({
        space_id: params.id,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        booking_date: today,
        start_time: selectedSlots[0].split('-')[1], // Just take first select
        end_time: selectedSlots[selectedSlots.length - 1].split('-')[1],
        selected_slots: selectedSlots,
        total_price: totalAmount,
        service_fee: serviceFee,
      });

      setSuccessMsg('Reservation submitted successfully!');
      setSelectedSlots([]);
    } catch (err: any) {
      setError(err.message || 'Failed to submit reservation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !space) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-20">
          <p className="text-error font-body-md mb-4">{error}</p>
          <Link href="/" className="text-primary hover:underline">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pricePerHour = space ? parseFloat(space.price_per_hour) : 0;
  const subtotal = selectedSlots.length * pricePerHour;
  const serviceFee = selectedSlots.length > 0 ? 5.00 : 0.00;
  const totalVal = subtotal + serviceFee;
  const spaceImage = space && space.images ? (Array.isArray(space.images) ? space.images[0] : JSON.parse(space.images)[0]) : "https://lh3.googleusercontent.com/aida-public/AB6AXuApCqKB97pQMigDG4PXYMWpdEdBWZUpxDsEC7Yy5s09yBEYax2QnvJAtNsRiHwedKORP9qT5ox1IaPa_PmtammtYF1MQXwwVL_V8sgxDbUeAGX27moxj9SI2Ps4_b8-xjlXNjR-9KYzbueDPry5ziTLMUB9vBuBKftBm_AabmZbrVrRZJnj_T63FpOLMWBtRrmtnteU28Gi2E1e2IDmTXH8MORjX1atP7SRim3Gb_Sh1OBK4hyB1vwvqvxbBYC8WYjbqpLKXuGb9PU";

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-container-max mx-auto px-md md:px-lg py-lg w-full">
        {successMsg && (
          <div className="mb-md p-md bg-primary-container text-on-primary-container border border-primary rounded-xl text-body-md text-center">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-md p-md bg-error-container text-on-error-container border border-error rounded-xl text-body-md text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-lg items-start">
          
          {/* Left Column: Calendar Dashboard */}
          <section className="w-full md:w-[70%]">
            <div className="flex justify-between items-center mb-md">
              <div>
                <h1 className="text-headline-md font-headline-md text-on-surface">Weekly Schedule</h1>
                <p className="text-body-md font-body-md text-on-surface-variant">Select your preferred time slots to reserve the space.</p>
              </div>
              <div className="flex items-center gap-sm bg-surface-container-low p-xs rounded-lg border border-outline-variant">
                <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">chevron_left</span>
                </button>
                <span className="text-label-md font-label-md px-md hidden sm:inline">May 12 - May 18, 2024</span>
                <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              {/* Calendar Header */}
              <div className="grid grid-cols-8 border-b border-outline-variant bg-surface-container-low min-w-[600px] md:min-w-0">
                <div className="h-12 border-r border-outline-variant"></div>
                {DAYS.map((day, idx) => (
                  <div key={day.short} className={`h-12 flex flex-col items-center justify-center ${idx !== DAYS.length - 1 ? 'border-r border-outline-variant' : ''} ${day.short === 'THU' ? 'bg-primary-container/10' : ''}`}>
                    <span className={`text-label-sm font-label-sm ${day.short === 'THU' ? 'text-primary' : 'text-on-surface-variant'}`}>{day.short}</span>
                    <span className={`text-label-md font-label-md font-bold ${day.short === 'THU' ? 'text-primary' : ''}`}>{day.date}</span>
                  </div>
                ))}
              </div>
              
              {/* Calendar Body */}
              <div className="max-h-[600px] overflow-y-auto overflow-x-auto md:overflow-x-visible custom-scrollbar">
                {TIMES.map(time => (
                  <div key={time} className="grid grid-cols-8 border-b border-outline-variant group min-w-[600px] md:min-w-0">
                    <div className="p-2 text-right border-r border-outline-variant bg-surface-container-lowest">
                      <span className="text-label-sm font-label-sm text-on-surface-variant">{time}</span>
                    </div>
                    {DAYS.map((day, idx) => {
                      const slotId = `${day.short}-${time}`;
                      const isSelected = selectedSlots.includes(slotId);
                      
                      // Lock a few hours for demo representation
                      const isLocked = (time === '11:00' && day.short === 'TUE') || (time === '09:00' && day.short === 'MON');
                      
                      if (isLocked) {
                        return (
                          <div key={slotId} className={`h-16 ${idx !== DAYS.length - 1 ? 'border-r' : ''} border-outline-variant bg-surface-container-high cursor-not-allowed flex items-center justify-center opacity-60`}>
                            <span className="material-symbols-outlined text-on-surface-variant text-sm">lock</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={slotId} 
                          onClick={() => toggleSlot(day.short, time)}
                          className={`h-16 ${idx !== DAYS.length - 1 ? 'border-r' : ''} border-outline-variant cursor-pointer transition-colors flex items-center justify-center ${
                            isSelected 
                              ? 'bg-primary text-on-primary' 
                              : 'bg-surface hover:bg-secondary-container/20'
                          }`}
                        >
                          {isSelected && <span className="material-symbols-outlined text-sm">check_circle</span>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Right Column: Sticky Sidebar Reservation Card */}
          <aside className="w-full md:w-[30%] md:sticky md:top-28">
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-48 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt={space.name} 
                  className="w-full h-full object-cover" 
                  src={spaceImage}
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-label-sm">
                  ${pricePerHour} / hour
                </div>
              </div>
              <div className="p-md space-y-md">
                <div>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface">{space.name}</h2>
                  <p className="text-body-md font-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">location_on</span> {space.location}
                  </p>
                </div>
                
                <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
                  <h3 className="text-label-sm font-label-sm text-on-surface-variant uppercase mb-xs">Reservation Summary</h3>
                  <div className="space-y-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-body-md font-body-md">Selected Slots</span>
                      <span className="text-label-md font-label-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                        {selectedSlots.length}h selected
                      </span>
                    </div>
                    <div className="text-label-sm font-label-sm text-on-surface-variant">
                      {selectedSlots.length > 0 
                        ? selectedSlots.join(', ')
                        : 'No slots selected'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-sm">
                  <div className="flex justify-between text-body-md">
                    <span className="text-on-surface-variant">Subtotal ({selectedSlots.length} hrs)</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body-md">
                    <span className="text-on-surface-variant">Service Fee</span>
                    <span className="font-bold">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-sm border-t border-outline-variant flex justify-between items-center">
                    <span className="text-headline-sm font-headline-sm">Total</span>
                    <span className="text-headline-sm font-headline-sm text-primary">
                      ${totalVal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <form className="space-y-sm" onSubmit={handleConfirmReservation}>
                  <div>
                    <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">Full Name</label>
                    <input 
                      className="w-full bg-surface border border-outline-variant px-md py-2 rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                      placeholder="John Doe" 
                      type="text" 
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">Email Address</label>
                    <input 
                      className="w-full bg-surface border border-outline-variant px-md py-2 rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                      placeholder="john@example.com" 
                      type="email" 
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">Phone Number</label>
                    <input 
                      className="w-full bg-surface border border-outline-variant px-md py-2 rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                      placeholder="+855 ..." 
                      type="tel" 
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    disabled={selectedSlots.length === 0 || submitting}
                    className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95 mt-4"
                  >
                    {submitting ? 'Submitting...' : 'Confirm Reservation'}
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
