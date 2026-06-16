"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-gutter">
        {/*  Header Metric Row  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
            <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
                <div className="flex justify-between items-start mb-sm">
                    <span className="p-2 bg-primary-container/10 rounded-lg text-primary">
                        <span className="material-symbols-outlined" data-icon="event_note">event_note</span>
                    </span>
                    <span
                        className="text-label-sm font-label-sm text-primary-container bg-primary-container/5 px-2 py-1 rounded-full">+12%</span>
                </div>
                <p className="text-label-md font-label-md text-on-surface-variant">Total Bookings</p>
                <div className="flex items-baseline gap-xs">
                    <h3 className="text-headline-md font-headline-md">124</h3>
                    <span className="text-label-sm text-on-surface-variant">this month</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
                <div className="flex justify-between items-start mb-sm">
                    <span className="p-2 bg-secondary-container/30 rounded-lg text-secondary">
                        <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
                    </span>
                </div>
                <p className="text-label-md font-label-md text-on-surface-variant">Occupancy Rate</p>
                <div className="flex items-baseline gap-xs">
                    <h3 className="text-headline-md font-headline-md">78%</h3>
                    <span className="text-label-sm text-on-surface-variant">Avg all studios</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl custom-shadow card-hover">
                <div className="flex justify-between items-start mb-sm">
                    <span className="p-2 bg-on-primary-fixed-variant/10 rounded-lg text-on-primary-fixed-variant">
                        <span className="material-symbols-outlined" data-icon="payments"
                            style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                    </span>
                </div>
                <p className="text-label-md font-label-md text-on-surface-variant">Gross Revenue</p>
                <div className="flex items-baseline gap-xs">
                    <h3 className="text-headline-md font-headline-md text-primary-container">$14,250</h3>
                </div>
            </div>
        </div>
        {/*  Main Operations Table  */}
        <div className="bg-surface-container-lowest rounded-xl custom-shadow overflow-hidden">
            <div className="px-md py-md border-b border-outline-variant flex justify-between items-center">
                <h4 className="text-headline-sm font-headline-sm text-on-surface">Upcoming Reservations</h4>
                <div className="flex items-center gap-sm">
                    <button
                        className="text-label-md font-label-md text-on-surface-variant hover:text-primary flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
                    <button className="text-label-md font-label-md text-primary flex items-center gap-xs">
                        View All
                        <span className="material-symbols-outlined text-[18px]"
                            data-icon="arrow_forward">arrow_forward</span>
                    </button>
                </div>
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
                        {/*  Row 1  */}
                        <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="px-md py-md">
                                <div className="flex items-center gap-sm">
                                    <div
                                        className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-xs font-bold text-secondary">
                                        SV</div>
                                    <div>
                                        <p className="font-label-md text-label-md text-on-surface">Sokha Vathanak</p>
                                        <p className="text-xs text-on-surface-variant">sokha@example.com</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-md py-md text-label-md text-on-surface">The Glass Studio</td>
                            <td className="px-md py-md">
                                <p className="text-label-md text-on-surface">Oct 24, 2023</p>
                                <p className="text-xs text-on-surface-variant">09:00 - 11:00 AM</p>
                            </td>
                            <td className="px-md py-md text-label-md font-bold text-on-surface">$120.00</td>
                            <td className="px-md py-md">
                                <span
                                    className="px-3 py-1 rounded-full bg-primary-container/10 text-on-primary-container text-xs font-bold">Confirmed</span>
                            </td>
                            <td className="px-md py-md text-right">
                                <button className="p-1 hover:bg-surface-container-high rounded-lg text-on-surface-variant">
                                    <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                </button>
                            </td>
                        </tr>
                        {/*  Row 2  */}
                        <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="px-md py-md">
                                <div className="flex items-center gap-sm">
                                    <div
                                        className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center text-xs font-bold text-tertiary">
                                        KL</div>
                                    <div>
                                        <p className="font-label-md text-label-md text-on-surface">Kinal Luy</p>
                                        <p className="text-xs text-on-surface-variant">kinal@agency.kh</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-md py-md text-label-md text-on-surface">Industrial Loft</td>
                            <td className="px-md py-md">
                                <p className="text-label-md text-on-surface">Oct 24, 2023</p>
                                <p className="text-xs text-on-surface-variant">01:00 - 05:00 PM</p>
                            </td>
                            <td className="px-md py-md text-label-md font-bold text-on-surface">$350.00</td>
                            <td className="px-md py-md">
                                <span
                                    className="px-3 py-1 rounded-full bg-primary-container/10 text-on-primary-container text-xs font-bold">Confirmed</span>
                            </td>
                            <td className="px-md py-md text-right">
                                <button className="p-1 hover:bg-surface-container-high rounded-lg text-on-surface-variant">
                                    <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                </button>
                            </td>
                        </tr>
                        {/*  Row 3  */}
                        <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="px-md py-md">
                                <div className="flex items-center gap-sm">
                                    <div
                                        className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface-variant">
                                        RN</div>
                                    <div>
                                        <p className="font-label-md text-label-md text-on-surface">Rany Nimol</p>
                                        <p className="text-xs text-on-surface-variant">nimol.r@design.com</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-md py-md text-label-md text-on-surface">Sunlight Gallery</td>
                            <td className="px-md py-md">
                                <p className="text-label-md text-on-surface">Oct 25, 2023</p>
                                <p className="text-xs text-on-surface-variant">10:00 AM - 12:00 PM</p>
                            </td>
                            <td className="px-md py-md text-label-md font-bold text-on-surface">$180.00</td>
                            <td className="px-md py-md">
                                <span
                                    className="px-3 py-1 rounded-full bg-error-container/20 text-on-tertiary-container text-xs font-bold">Cancelled</span>
                            </td>
                            <td className="px-md py-md text-right">
                                <button className="p-1 hover:bg-surface-container-high rounded-lg text-on-surface-variant">
                                    <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                </button>
                            </td>
                        </tr>
                        {/*  Row 4  */}
                        <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="px-md py-md">
                                <div className="flex items-center gap-sm">
                                    <div
                                        className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-xs font-bold text-secondary">
                                        TP</div>
                                    <div>
                                        <p className="font-label-md text-label-md text-on-surface">Thida Phirum</p>
                                        <p className="text-xs text-on-surface-variant">thida@creative.net</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-md py-md text-label-md text-on-surface">The Glass Studio</td>
                            <td className="px-md py-md">
                                <p className="text-label-md text-on-surface">Oct 26, 2023</p>
                                <p className="text-xs text-on-surface-variant">09:00 AM - 04:00 PM</p>
                            </td>
                            <td className="px-md py-md text-label-md font-bold text-on-surface">$420.00</td>
                            <td className="px-md py-md">
                                <span
                                    className="px-3 py-1 rounded-full bg-primary-container/10 text-on-primary-container text-xs font-bold">Confirmed</span>
                            </td>
                            <td className="px-md py-md text-right">
                                <button className="p-1 hover:bg-surface-container-high rounded-lg text-on-surface-variant">
                                    <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/*  Table Pagination/Footer  */}
            <div
                className="px-md py-sm bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
                <span>Showing 1 to 4 of 24 entries</span>
                <div className="flex gap-xs">
                    <button
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-high">
                        <span className="material-symbols-outlined text-[16px]" data-icon="chevron_left">chevron_left</span>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded">1</button>
                    <button
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-high">2</button>
                    <button
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-high">3</button>
                    <button
                        className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-high">
                        <span className="material-symbols-outlined text-[16px]"
                            data-icon="chevron_right">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
        {/*  Secondary Section: Performance Graph / Map Placeholder  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-lg">
            <div
                className="lg:col-span-2 bg-surface-container-lowest p-md rounded-xl custom-shadow h-64 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h5 className="text-label-md font-bold text-on-surface">Weekly Revenue Growth</h5>
                    <select className="bg-surface border-none text-xs text-on-surface-variant focus:ring-0 cursor-pointer">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div className="flex-1 flex items-end gap-xs py-md">
                    {/*  Fake Chart Bars  */}
                    <div className="flex-1 bg-primary-container/20 h-[40%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[65%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[55%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[85%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[45%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[90%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                    <div className="flex-1 bg-primary-container/20 h-[70%] rounded-t-sm relative group">
                        <div
                            className="absolute inset-0 bg-primary-container h-0 group-hover:h-full transition-all duration-300 rounded-t-sm">
                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-between text-[10px] text-on-surface-variant px-1 uppercase font-bold tracking-wider">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl custom-shadow relative overflow-hidden h-64 group">
                <img alt="Map of Phnom Penh Venues"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    data-alt="A stylized, architectural map view of downtown Phnom Penh, Cambodia, showcasing the urban sprawl with clean white lines and soft gray backgrounds. The map highlights key creative districts with subtle emerald green markers. The overall aesthetic is minimalist, professional, and sophisticated, aligning with the Urban Sanctuary design language of Phnom Creative."
                    data-location="Phnom Penh"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhvqR0pxRt7xgfseW4keoBSpSHuE9vGyLyhsVaOC2bEl_AfnvRSBTH7R5WpPoh3AhspOAifPwzvdjUIWrPjnkdM7QwYSfEetHga3pI7dThRCp4vgG17B_Wyu8tTb5-BX41mNoGgDlQWY1fJs3N_YRmXP0K_eRtocEN4F8GPL8FSb_bNZSNmL1Iwo1n7xYCKu4RFdlJ2HX4cKy04rPI1wV1BtwwUpJu_AyKoTGl5G7DxHlXarbCWnaFF0Xg3htuBKqmfC0gZOTwFs" />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
                    <p className="text-white text-headline-sm font-bold">Studio Locations</p>
                    <p className="text-white/80 text-xs">Phnom Penh, Cambodia • 12 Active Spots</p>
                </div>
                <button
                    className="absolute top-md right-md bg-white p-2 rounded-full custom-shadow text-primary hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" data-icon="fullscreen">fullscreen</span>
                </button>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
