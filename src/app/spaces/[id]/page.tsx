"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { spacesApi, bookingsApi } from "@/lib/api";

const DEFAULT_DAYS = [
  {
    short: "MON",
    date: "12",
    fullDate: "2024-05-12",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "TUE",
    date: "13",
    fullDate: "2024-05-13",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "WED",
    date: "14",
    fullDate: "2024-05-14",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "THU",
    date: "15",
    fullDate: "2024-05-15",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "FRI",
    date: "16",
    fullDate: "2024-05-16",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "SAT",
    date: "17",
    fullDate: "2024-05-17",
    isPastDay: false,
    isToday: false,
  },
  {
    short: "SUN",
    date: "18",
    fullDate: "2024-05-18",
    isPastDay: false,
    isToday: false,
  },
];

const TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookingPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [space, setSpace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selection slots state
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Booking Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Booked Slots
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Calendar state
  const [calendarDays, setCalendarDays] = useState(DEFAULT_DAYS);
  const [currentWeekString, setCurrentWeekString] = useState(
    "May 12 - May 18, 2024",
  );
  const [currentHour, setCurrentHour] = useState(-1);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    // Check auth and load pre-filled user details if logged in
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("auth_token");

      if (!storedUser || !token) {
        router.push("/login");
        return;
      }

      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setClientName(userObj.name || "");
          setClientEmail(userObj.email || "");
          setClientPhone(userObj.phone || "");
        } catch (e) {
          console.error(e);
          router.push("/login");
          return;
        }
      }
    }

    // If it's Sunday and past 16:00, default to next week
    const now = new Date();
    if (now.getDay() === 0 && now.getHours() >= 17) {
      setWeekOffset(1);
    }

    const fetchSpaceDetails = async () => {
      if (!id) return;
      try {
        const data = await spacesApi.get(id);
        setSpace(data);

        // Fetch existing bookings to block out taken slots
        try {
          const spaceBookings = await spacesApi.bookings(id);

          const slots: string[] = [];
          spaceBookings.forEach((b: any) => {
            if (b.selected_slots) {
              let parsed = [];
              try {
                parsed =
                  typeof b.selected_slots === "string"
                    ? JSON.parse(b.selected_slots)
                    : b.selected_slots;
              } catch (e) {
                parsed = [];
              }
              if (Array.isArray(parsed)) {
                slots.push(...parsed);
              }
            }
          });
          setBookedSlots(slots);
        } catch (bookingErr) {
          console.error("Could not fetch bookings", bookingErr);
        }
      } catch (err: any) {
        setError(err.message || "Could not load space details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceDetails();
  }, [id]);

  useEffect(() => {
    // Initialize dynamic calendar dates based on weekOffset
    const now = new Date();
    setCurrentHour(now.getHours());

    const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - dayOfWeek + weekOffset * 7);
    monday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const short = d
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();
      const date = d.getDate().toString().padStart(2, "0");
      // Fix for timezone to get strict local ISO string format YYYY-MM-DD
      const fullDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      const isPastDay = d.getTime() < today.getTime();
      const isToday = d.getTime() === today.getTime();

      days.push({ short, date, fullDate, isPastDay, isToday });
    }
    setCalendarDays(days);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const monthMon = monday.toLocaleDateString("en-US", { month: "short" });
    const monthSun = sunday.toLocaleDateString("en-US", { month: "short" });
    setCurrentWeekString(
      `${monthMon} ${monday.getDate()} - ${monthSun} ${sunday.getDate()}, ${sunday.getFullYear()}`,
    );
  }, [weekOffset]);

  const toggleSlot = (fullDate: string, time: string) => {
    const slotId = `${fullDate}_${time}`;
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter((id) => id !== slotId));
    } else {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlots.length === 0) return;

    setSubmitting(true);
    setError("");
    setSuccessMsg("");

    try {
      const pricePerHour = space ? parseFloat(space.price_per_hour) : 0;
      const subtotal = selectedSlots.length * pricePerHour;
      const serviceFee = 5.0;
      const totalAmount = subtotal + serviceFee;

      // Extract details for API
      // Since booking date is required, we use the date from the first slot
      const bookingDate = selectedSlots[0].split("_")[0];

      await bookingsApi.create({
        space_id: id,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        booking_date: bookingDate,
        start_time: selectedSlots[0].split("_")[1], // Extract time
        end_time: selectedSlots[selectedSlots.length - 1].split("_")[1],
        selected_slots: selectedSlots,
        total_price: totalAmount,
        service_fee: serviceFee,
      });

      setSuccessMsg("Reservation submitted successfully!");
      setBookedSlots((prev) => [...prev, ...selectedSlots]);
      setSelectedSlots([]);
    } catch (err: any) {
      setError(
        err.message || "Failed to submit reservation. Please try again.",
      );
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
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pricePerHour = space ? parseFloat(space.price_per_hour) : 0;
  const subtotal = selectedSlots.length * pricePerHour;
  const serviceFee = selectedSlots.length > 0 ? 5.0 : 0.0;
  const totalVal = subtotal + serviceFee;
  const spaceImage =
    space && space.images
      ? Array.isArray(space.images)
        ? space.images[0]
        : JSON.parse(space.images)[0]
      : "https://lh3.googleusercontent.com/aida-public/AB6AXuApCqKB97pQMigDG4PXYMWpdEdBWZUpxDsEC7Yy5s09yBEYax2QnvJAtNsRiHwedKORP9qT5ox1IaPa_PmtammtYF1MQXwwVL_V8sgxDbUeAGX27moxj9SI2Ps4_b8-xjlXNjR-9KYzbueDPry5ziTLMUB9vBuBKftBm_AabmZbrVrRZJnj_T63FpOLMWBtRrmtnteU28Gi2E1e2IDmTXH8MORjX1atP7SRim3Gb_Sh1OBK4hyB1vwvqvxbBYC8WYjbqpLKXuGb9PU";

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={space.name}
          className="w-full h-full object-cover"
          src={spaceImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full pb-xl">
          <div className="max-w-container-max mx-auto px-md md:px-lg flex flex-col gap-3">
            <span className="bg-primary/90 text-on-primary px-4 py-1.5 rounded-full text-label-md font-label-md w-fit backdrop-blur-sm border border-primary/20 uppercase tracking-wider">
              {space.space_type?.name || space.space_type || "Creative Space"}
            </span>
            <h1 className="text-display-lg md:text-[64px] font-display-lg text-on-surface leading-tight font-bold">
              {space.name}
            </h1>
            <p className="text-headline-sm font-headline-sm text-on-surface-variant flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">location_on</span>
              {space.location}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-container-max mx-auto px-md md:px-lg py-xl w-full">
        {successMsg && (
          <div className="mb-lg p-md bg-primary-container text-white border border-primary rounded-xl text-body-md text-center animate-fade-in shadow-sm">
            {successMsg}
          </div>
        )}
        {error && (
          <div className="mb-lg p-md bg-error-container text-white border border-error rounded-xl text-body-md text-center animate-fade-in shadow-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-xl items-start">
          {/* Left Column: Details & Calendar */}
          <section className="w-full lg:w-[65%] space-y-xl">
            
            {/* Overview & Description */}
            <div className="space-y-md">
              <h2 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-2">About this space</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed opacity-90">
                {space.description}
              </p>
            </div>

            {/* Capacity & Amenities Section */}
            <div className="space-y-md">
              <h2 className="text-headline-md font-headline-md text-on-surface border-b border-outline-variant pb-2">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-md pt-2">
                <div className="flex items-center gap-md p-md rounded-xl bg-surface-container-low border border-outline-variant">
                  <span className="material-symbols-outlined text-primary text-[28px]">groups</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface">Capacity</span>
                    <span className="text-label-sm text-on-surface-variant">Up to {space.capacity}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.wifi ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.wifi ? 'text-primary' : ''}`}>wifi</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Fast WiFi</span>
                    <span className="text-label-sm">{space.wifi ? 'Included' : 'Not available'}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.ac ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.ac ? 'text-primary' : ''}`}>ac_unit</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Air Conditioning</span>
                    <span className="text-label-sm">{space.ac ? 'Included' : 'Not available'}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.whiteboard ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.whiteboard ? 'text-primary' : ''}`}>edit</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Whiteboard</span>
                    <span className="text-label-sm">{space.whiteboard ? 'Included' : 'Not available'}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.soundproofing ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.soundproofing ? 'text-primary' : ''}`}>graphic_eq</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Soundproofing</span>
                    <span className="text-label-sm">{space.soundproofing ? 'Included' : 'Not available'}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.natural_light ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.natural_light ? 'text-primary' : ''}`}>light_mode</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Natural Light</span>
                    <span className="text-label-sm">{space.natural_light ? 'Included' : 'Not available'}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-md p-md rounded-xl border transition-all ${space.refreshments ? 'bg-primary/5 border-primary/30 text-on-surface' : 'bg-surface border-outline-variant text-on-surface-variant opacity-50'}`}>
                  <span className={`material-symbols-outlined text-[28px] ${space.refreshments ? 'text-primary' : ''}`}>local_cafe</span>
                  <div className="flex flex-col">
                    <span className="font-label-md">Refreshments</span>
                    <span className="text-label-sm">{space.refreshments ? 'Included' : 'Not available'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-outline-variant my-xl" />

            {/* Calendar Dashboard */}
            <div className="space-y-md">
              <div className="flex justify-between items-center mb-md">
                <div>
                  <h2 className="text-headline-md font-headline-md text-on-surface">
                    Select your schedule
                  </h2>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                    Pick the time slots you wish to reserve.
                  </p>
                </div>
                <div className="flex items-center gap-sm bg-surface p-xs rounded-full border border-outline-variant shadow-sm">
                  <button
                    onClick={() => setWeekOffset((prev) => prev - 1)}
                    disabled={weekOffset === 0}
                    className="p-2 hover:bg-surface-container-high rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-primary"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chevron_left
                    </span>
                  </button>
                  <span className="text-label-md font-label-md px-md hidden sm:inline min-w-[180px] text-center text-on-surface">
                    {currentWeekString}
                  </span>
                  <button
                    onClick={() => setWeekOffset((prev) => prev + 1)}
                    className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-primary"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                {/* Calendar Header */}
                <div className="grid grid-cols-8 border-b border-outline-variant bg-surface-container-low min-w-[600px] md:min-w-0">
                  <div className="h-16 border-r border-outline-variant flex items-center justify-center bg-surface-container-lowest">
                    <span className="material-symbols-outlined text-outline">schedule</span>
                  </div>
                  {calendarDays.map((day, idx) => (
                    <div
                      key={day.short}
                      className={`h-16 flex flex-col items-center justify-center ${idx !== calendarDays.length - 1 ? "border-r border-outline-variant" : ""} ${day.isToday ? "bg-primary/5 border-b-2 border-b-primary" : ""}`}
                    >
                      <span
                        className={`text-label-sm font-label-sm mb-1 ${day.isToday ? "text-primary font-bold" : "text-on-surface-variant"}`}
                      >
                        {day.short}
                      </span>
                      <span
                        className={`text-title-md font-title-md ${day.isToday ? "text-primary font-bold" : "text-on-surface"}`}
                      >
                        {day.date}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calendar Body */}
                <div className="max-h-[500px] overflow-y-auto overflow-x-auto md:overflow-x-visible custom-scrollbar">
                  {TIMES.map((time) => (
                    <div
                      key={time}
                      className="grid grid-cols-8 border-b border-outline-variant group min-w-[600px] md:min-w-0"
                    >
                      <div className="p-3 flex items-center justify-center border-r border-outline-variant bg-surface-container-lowest">
                        <span className="text-label-md font-label-md text-on-surface-variant">
                          {time}
                        </span>
                      </div>
                      {calendarDays.map((day, idx) => {
                        const slotId = `${day.fullDate}_${time}`;
                        const isSelected = selectedSlots.includes(slotId);

                        const slotHour = parseInt(time.split(":")[0], 10);
                        const isPastTime =
                          day.isPastDay ||
                          (day.isToday && slotHour <= currentHour);

                        // Lock slots that have already been booked or are in the past
                        const isLocked =
                          bookedSlots.includes(slotId) || isPastTime;

                        if (isLocked) {
                          return (
                            <div
                              key={slotId}
                              className={`h-16 ${idx !== calendarDays.length - 1 ? "border-r" : ""} border-outline-variant bg-surface-container-highest cursor-not-allowed flex items-center justify-center opacity-30`}
                            >
                              <span className="material-symbols-outlined text-on-surface-variant text-md">
                                {bookedSlots.includes(slotId) ? "lock" : "block"}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={slotId}
                            onClick={() => toggleSlot(day.fullDate, time)}
                            className={`h-16 ${idx !== calendarDays.length - 1 ? "border-r" : ""} border-outline-variant cursor-pointer transition-all flex items-center justify-center relative group-hover:bg-primary/5 ${
                              isSelected
                                ? "bg-primary text-on-primary shadow-inner shadow-primary/20"
                                : "bg-surface hover:bg-primary/10"
                            }`}
                          >
                            {isSelected && (
                              <span className="material-symbols-outlined text-[28px] animate-fade-in text-on-primary">
                                check_circle
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Sticky Reservation Card */}
          <aside className="w-full lg:w-[35%] lg:sticky lg:top-28 pt-8 lg:pt-0">
            <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant rounded-3xl overflow-hidden shadow-xl shadow-surface-container-high/50 flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:z-[-1]">
              <div className="p-5 space-y-lg">
                <div className="flex items-end gap-2 border-b border-outline-variant pb-md">
                  <span className="text-[40px] font-display-md text-on-surface leading-none font-bold">
                    ${pricePerHour}
                  </span>
                  <span className="text-title-md text-on-surface-variant mb-1">/ hour</span>
                </div>

                <div className="bg-surface-container-low p-md rounded-2xl border border-outline-variant/50">
                  <div className="space-y-md">
                    <div className="flex justify-between items-start">
                      <span className="text-title-sm font-title-sm text-on-surface">
                        Selected Time
                      </span>
                      <span className="text-label-md font-label-md text-white bg-primary-container text-on-primary-container px-3 py-1 rounded-full border border-primary/20">
                        {selectedSlots.length}h selected
                      </span>
                    </div>
                    <div className="text-body-sm font-body-sm text-on-surface-variant flex flex-wrap gap-2">
                      {selectedSlots.length > 0
                        ? selectedSlots.map(slot => {
                            const [d, t] = slot.split('_');
                            return <span key={slot} className="bg-surface border border-outline-variant px-2 py-1 rounded-md">{d.split('-').slice(1).join('/')} @ {t}</span>
                          })
                        : <span className="italic">No slots selected yet. Pick times on the calendar.</span>}
                    </div>
                  </div>
                </div>

                <div className="space-y-sm text-title-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">
                      Subtotal
                    </span>
                    <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant flex items-center gap-1">Service Fee <span className="material-symbols-outlined text-[16px] text-outline">info</span></span>
                    <span className="font-bold text-on-surface">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-md mt-sm border-t border-outline-variant flex justify-between items-center">
                    <span className="text-headline-sm font-headline-sm">
                      Total Due
                    </span>
                    <span className="text-headline-md font-headline-md text-primary font-bold">
                      ${totalVal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <form
                  className="space-y-md pt-md border-t border-outline-variant"
                  onSubmit={handleConfirmReservation}
                >
                  <h3 className="text-title-md font-title-md text-on-surface mb-2">Guest Details</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        className="w-full bg-surface border border-outline-variant px-md py-3 rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
                        placeholder="Full Name"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        className="w-full bg-surface border border-outline-variant px-md py-3 rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
                        placeholder="Email Address"
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        className="w-full bg-surface border border-outline-variant px-md py-3 rounded-xl text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline"
                        placeholder="Phone Number"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    disabled={selectedSlots.length === 0 || submitting}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-title-sm text-title-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1 active:scale-95 mt-6 flex justify-center items-center gap-2"
                  >
                    {submitting ? "Processing..." : "Reserve Space"}
                    {!submitting && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                  </button>
                  <p className="text-center text-label-sm text-on-surface-variant pt-2">You won't be charged yet</p>
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
