"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { spacesApi, bookingsApi } from "@/lib/api";

export default function NewBookingPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<any[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  const [loading, setLoading] = useState(true);

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [staffNotes, setStaffNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await spacesApi.list({ status: "Active" });
        setSpaces(data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  const selectedSpace = spaces.find((s) => s.id === selectedSpaceId);
  const pricePerHour = selectedSpace ? parseFloat(selectedSpace.price_per_hour) : 0;

  // Calculate booking hours
  let hours = 0;
  if (startTime && endTime) {
    const startMins = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
    const endMins = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
    if (endMins > startMins) {
      hours = (endMins - startMins) / 60;
    }
  }

  const subtotal = hours * pricePerHour;
  const serviceFee = hours > 0 ? 5.00 : 0.00;
  const estimatedTotal = subtotal + serviceFee;

  const currentPrice = estimatedTotal > 0 ? `$${estimatedTotal.toFixed(2)}` : "$0.00";
  const priceSubtitle = selectedSpace
    ? `Rate: $${pricePerHour.toFixed(2)}/hr. Calculated for ${hours.toFixed(1)} hrs.`
    : "Select a space and times to calculate cost.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpaceId || hours <= 0) {
      setError("Please select a space and valid start/end times.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Mock standard slot arrays (e.g. ["THU-08:00"])
      const dayName = new Date(bookingDate).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const selectedSlots = [];
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = parseInt(endTime.split(":")[0]);
      for (let h = startHour; h < endHour; h++) {
        selectedSlots.push(`${dayName}-${h.toString().padStart(2, "0")}:00`);
      }

      await bookingsApi.create({
        space_id: selectedSpaceId,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        selected_slots: selectedSlots,
        total_price: estimatedTotal,
        service_fee: serviceFee,
        payment_status: paymentStatus,
        staff_notes: staffNotes,
      });

      alert("Booking successfully created!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create booking.");
    } finally {
      setSubmitting(false);
    }
  };

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

            {error && (
              <div className="mb-md p-md bg-error-container text-on-error-container border border-error rounded-xl text-body-md text-center">
                {error}
              </div>
            )}

            {/*  Main Form  */}
            <form onSubmit={handleSubmit} className="space-y-lg">
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
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
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
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
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
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
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
                    {loading ? (
                      <div className="text-body-md text-on-surface-variant">Loading spaces...</div>
                    ) : (
                      <select
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all appearance-none"
                        id="space_select"
                        value={selectedSpaceId}
                        onChange={(e) => setSelectedSpaceId(e.target.value)}
                        required
                      >
                        <option value="">Select a creative space</option>
                        {spaces.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} (${parseFloat(s.price_per_hour).toFixed(2)}/hr)
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface-variant"
                      htmlFor="booking_date"
                    >
                      Booking Date
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md px-md py-sm transition-all"
                      id="booking_date"
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
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
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
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
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
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
                      value={staffNotes}
                      onChange={(e) => setStaffNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </section>

              {/*  Actions  */}
              <div className="flex items-center justify-end gap-md pt-md pb-xl">
                <button
                  className="px-lg py-sm text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant rounded-lg transition-colors cursor-pointer"
                  type="button"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancel
                </button>
                <button
                  disabled={submitting}
                  className="bg-primary text-on-primary px-xl py-sm rounded-lg font-headline-sm text-headline-sm shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  type="submit"
                >
                  {submitting ? "Creating..." : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
