"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { analyticsApi } from "@/lib/api";

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpis, trends, utilization, heatmap, spacesPerformance] = await Promise.all([
          analyticsApi.kpis(),
          analyticsApi.trends(),
          analyticsApi.utilization(),
          analyticsApi.heatmap(),
          analyticsApi.spacesPerformance()
        ]);

        setData({ kpis, trends, utilization, heatmap, spacesPerformance });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Simple loading state
  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-on-surface-variant animate-pulse">Loading Analytics Data from Backend...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-md lg:p-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {/*  Page Header & Filter Bar  */}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Space Analytics &amp; Insights
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Track performance, occupancy rates, and revenue generation
                across all creative spaces
              </p>
            </div>
            {/*  Filter Controls & Export  */}
            <div className="flex flex-wrap items-center gap-3">
              {/*  Date Range Selector  */}
              <CustomDropdown
                options={["Last 30 Days", "Last 7 Days", "This Month", "Last Quarter", "Custom Range"]}
                defaultValue="Last 30 Days"
                icon="calendar_today"
                ariaLabel="Select Date Range"
              />
              {/*  Space Selector Filter  */}
              <CustomDropdown
                options={["All Spaces (4)", "The Glass Studio", "Industrial Loft", "Sonic Wave Suite", "Minimalist Workshop"]}
                defaultValue="All Spaces (4)"
                icon="meeting_room"
                ariaLabel="Filter by Space"
              />
              {/*  Export Report CTA  */}
              <button className="bg-white dark:bg-surface-container-low hover:bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label-md font-medium py-2 px-4 rounded-full flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200 active:scale-95 group">
                <span
                  className="material-symbols-outlined text-primary text-[18px] group-hover:-translate-y-0.5 transition-transform"
                  data-icon="download"
                >
                  download
                </span>
                <span>Export Report</span>
              </button>
            </div>
          </section>
          {/*  KPI Summary Metric Cards (4 Grid)  */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            {/*  KPI 1: Total Revenue  */}
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Total Revenue
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="payments"
                  >
                    payments
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  ${data.kpis.totalRevenue.value.toLocaleString('en-US', {minimumFractionDigits: 2})}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${data.kpis.totalRevenue.isPositive ? 'bg-[#ECFDF5] text-primary' : 'bg-red-50 text-red-600'}`}>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={data.kpis.totalRevenue.isPositive ? "trending_up" : "trending_down"}
                  >
                    {data.kpis.totalRevenue.isPositive ? "trending_up" : "trending_down"}
                  </span>
                  {data.kpis.totalRevenue.isPositive ? '+' : '-'}{data.kpis.totalRevenue.trend}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {data.kpis.totalRevenue.trendLabel}
                </span>
              </div>
            </div>
            {/*  KPI 2: Avg. Occupancy Rate  */}
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Avg. Occupancy Rate
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="pie_chart"
                  >
                    pie_chart
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  76.2%
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-primary">
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="trending_up"
                  >
                    trending_up
                  </span>
                  +5.1%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  vs target (70%)
                </span>
              </div>
            </div>
            {/*  KPI 3: Total Booked Hours  */}
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Total Booked Hours
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="schedule"
                  >
                    schedule
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  482 hrs
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-primary">
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="trending_up"
                  >
                    trending_up
                  </span>
                  +12%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  increase
                </span>
              </div>
            </div>
            {/*  KPI 4: RevPAH  */}
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  RevPAH
                </span>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="speed"
                  >
                    speed
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                  $38.28
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-primary">
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="trending_up"
                  >
                    trending_up
                  </span>
                  +9.4%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  efficiency
                </span>
              </div>
            </div>
          </section>
          {/*  Analytics Visualizations & Sections (Bento Grid)  */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-md">
            {/*  Left: Revenue & Bookings Trend Chart (8 cols)  */}
            <div className="lg:col-span-8 bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] flex flex-col justify-between">
              <div>
                {/*  Header & Toggles  */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Revenue &amp; Bookings Trend
                    </h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Comparative performance tracking weekly throughput
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/*  Metric Type Toggle  */}
                    <div className="inline-flex p-1 bg-surface-container-low rounded-lg text-xs font-label-sm font-semibold">
                      <button className="px-2.5 py-1 rounded bg-surface-container-lowest text-primary shadow-xs">
                        Revenue ($)
                      </button>
                      <button className="px-2.5 py-1 rounded text-on-surface-variant hover:text-on-surface">
                        Bookings Count
                      </button>
                    </div>
                    {/*  Time Horizon Toggle  */}
                    <div className="inline-flex p-1 bg-surface-container-low rounded-lg text-xs font-label-sm font-medium">
                      <button className="px-2 py-1 rounded text-on-surface-variant hover:text-on-surface">
                        Daily
                      </button>
                      <button className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface shadow-xs font-semibold">
                        Weekly
                      </button>
                      <button className="px-2 py-1 rounded text-on-surface-variant hover:text-on-surface">
                        Monthly
                      </button>
                    </div>
                  </div>
                </div>
                {/*  Legend & Stats Summary  */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">
                      This Period ($18,450)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-fixed"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Previous Period ($15,580)
                    </span>
                  </div>
                </div>
                {/*  Bar Comparison Chart Simulation  */}
                <div className="mt-6 pt-2 pb-4">
                  <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6 relative border-b border-outline-variant/50">
                    {/*  Grid Horizontal Lines  */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div className="border-b border-dashed border-outline-variant w-full flex justify-end text-[10px] text-on-surface-variant pr-1">
                        $6k
                      </div>
                      <div className="border-b border-dashed border-outline-variant w-full flex justify-end text-[10px] text-on-surface-variant pr-1">
                        $4.5k
                      </div>
                      <div className="border-b border-dashed border-outline-variant w-full flex justify-end text-[10px] text-on-surface-variant pr-1">
                        $3k
                      </div>
                      <div className="border-b border-dashed border-outline-variant w-full flex justify-end text-[10px] text-on-surface-variant pr-1">
                        $1.5k
                      </div>
                      <div className="w-full"></div>
                    </div>
                    {/*  Week 1  */}
                    <div className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-1/2 bg-primary-fixed rounded-t transition-all duration-300 group-hover:opacity-90"
                          style={{ height: "48%" }}
                        ></div>
                        <div
                          className="w-1/2 bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-container"
                          style={{ height: "60%" }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Wk 1
                      </span>
                      {/*  Tooltip  */}
                      <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-20">
                        <span>$3,920 (Curr) vs $3,100 (Prev)</span>
                      </div>
                    </div>
                    {/*  Week 2  */}
                    <div className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-1/2 bg-primary-fixed rounded-t transition-all duration-300 group-hover:opacity-90"
                          style={{ height: "55%" }}
                        ></div>
                        <div
                          className="w-1/2 bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-container"
                          style={{ height: "72%" }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Wk 2
                      </span>
                      <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-20">
                        <span>$4,650 (Curr) vs $3,620 (Prev)</span>
                      </div>
                    </div>
                    {/*  Week 3 (Peak)  */}
                    <div className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-1/2 bg-primary-fixed rounded-t transition-all duration-300 group-hover:opacity-90"
                          style={{ height: "62%" }}
                        ></div>
                        <div
                          className="w-1/2 bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-container relative"
                          style={{ height: "88%" }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-[#ECFDF5] px-1 py-0.2 rounded border border-primary/20">
                            Peak
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-bold">
                        Wk 3
                      </span>
                      <div className="absolute -top-12 hidden group-hover:flex flex-col items-center bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-20">
                        <span>$5,480 (Curr) vs $4,010 (Prev)</span>
                      </div>
                    </div>
                    {/*  Week 4  */}
                    <div className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-1/2 bg-primary-fixed rounded-t transition-all duration-300 group-hover:opacity-90"
                          style={{ height: "65%" }}
                        ></div>
                        <div
                          className="w-1/2 bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-container"
                          style={{ height: "70%" }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Wk 4
                      </span>
                      <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-20">
                        <span>$4,400 (Curr) vs $4,850 (Prev)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Bottom Micro Analysis  */}
              <div className="pt-4 mt-2 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-xs font-label-sm">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-primary text-base"
                    data-icon="insights"
                  >
                    insights
                  </span>
                  <span>
                    Highest grossing day recorded:{" "}
                    <strong className="text-on-surface font-semibold">
                      Saturday, Wk 3 ($1,820)
                    </strong>
                  </span>
                </div>
                <a
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                  href="#"
                >
                  <span>View detailed logs</span>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            {/*  Right: Space Utilization & Peak Heatmap (4 cols)  */}
            <div className="lg:col-span-4 flex flex-col gap-md">
              {/*  Card A: Space Utilization Breakdown  */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Utilization by Space
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    30d Avg
                  </span>
                </div>
                <div className="space-y-4">
                  {/*  Item 1: Glass Studio  */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-label-md mb-1">
                      <span className="text-on-surface font-medium truncate">
                        The Glass Studio
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface-variant text-xs">
                          $6,800
                        </span>
                        <span className="font-bold text-primary">88%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>
                  {/*  Item 2: Industrial Loft  */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-label-md mb-1">
                      <span className="text-on-surface font-medium truncate">
                        Industrial Loft
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface-variant text-xs">
                          $5,240
                        </span>
                        <span className="font-bold text-primary">78%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-container rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  {/*  Item 3: Sonic Wave Suite  */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-label-md mb-1">
                      <span className="text-on-surface font-medium truncate">
                        Sonic Wave Suite
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface-variant text-xs">
                          $3,850
                        </span>
                        <span className="font-bold text-on-surface">71%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{ width: "71%" }}
                      ></div>
                    </div>
                  </div>
                  {/*  Item 4: Minimalist Workshop  */}
                  <div>
                    <div className="flex justify-between items-center text-sm font-label-md mb-1">
                      <span className="text-on-surface font-medium truncate">
                        Minimalist Workshop
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface-variant text-xs">
                          $2,560
                        </span>
                        <span className="font-bold text-on-surface">64%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-outline rounded-full"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  Card B: Peak Hours Heatmap Indicator  */}
              <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Peak Demand Times
                  </h3>
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    data-icon="local_fire_department"
                  >
                    local_fire_department
                  </span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Busiest Days:
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold text-primary">
                      Thursday — Saturday
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Prime Hours:
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold text-primary">
                      10:00 AM – 04:00 PM
                    </span>
                  </div>
                </div>
                {/*  Mini Matrix Heatmap  */}
                <div className="mt-4 pt-1">
                  <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-[10px] text-on-surface-variant mb-1">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {/*  Row 1: Morning  */}
                    <div
                      className="h-4 rounded-xs bg-surface-container-high"
                      title="Mon Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-surface-container-high"
                      title="Tue Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-fixed/60"
                      title="Wed Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-fixed"
                      title="Thu Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-container"
                      title="Fri Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Sat Morning"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-fixed/80"
                      title="Sun Morning"
                    ></div>
                    {/*  Row 2: Mid-day Peak  */}
                    <div
                      className="h-4 rounded-xs bg-primary-fixed/50"
                      title="Mon Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-fixed"
                      title="Tue Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-container"
                      title="Wed Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Thu Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Fri Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Sat Mid"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-container"
                      title="Sun Mid"
                    ></div>
                    {/*  Row 3: Evening  */}
                    <div
                      className="h-4 rounded-xs bg-surface-container-high"
                      title="Mon Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-surface-container-high"
                      title="Tue Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-fixed/40"
                      title="Wed Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary-container"
                      title="Thu Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Fri Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-primary"
                      title="Sat Eve"
                    ></div>
                    <div
                      className="h-4 rounded-xs bg-surface-container-high"
                      title="Sun Eve"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant mt-2 px-0.5">
                    <span>Low Demand</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-surface-container-high"></span>
                      <span className="w-2 h-2 rounded bg-primary-fixed"></span>
                      <span className="w-2 h-2 rounded bg-primary-container"></span>
                      <span className="w-2 h-2 rounded bg-primary"></span>
                    </div>
                    <span>Peak</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  Performance by Space Table Section  */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-[0_4px_6px_-1px_rgba(30,41,59,0.05),0_2px_4px_-2px_rgba(30,41,59,0.05)] overflow-hidden">
            <div className="p-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-outline-variant/40">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Performance by Space
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Detailed breakdown of booking volume, operational hours, and
                  financial contribution
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:text-on-surface font-label-md text-label-md bg-surface-container-lowest flex items-center gap-1.5 transition-colors">
                  <span
                    className="material-symbols-outlined text-base"
                    data-icon="tune"
                  >
                    tune
                  </span>
                  <span>Customize Columns</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 border-b border-outline-variant/40 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3.5 px-md">Space Name</th>
                    <th className="py-3.5 px-4 text-center">Total Bookings</th>
                    <th className="py-3.5 px-4 text-center">Total Hours</th>
                    <th className="py-3.5 px-4 text-center">Avg. Duration</th>
                    <th className="py-3.5 px-4 text-center">
                      Cancellation Rate
                    </th>
                    <th className="py-3.5 px-4 text-right">Total Revenue</th>
                    <th className="py-3.5 px-md text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-body-md font-body-md">
                  {/*  Row 1: The Glass Studio  */}
                  <tr className="hover:bg-surface-container-low/40 transition-colors duration-150">
                    <td className="py-4 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline-variant">
                          <img
                            alt="The Glass Studio"
                            className="w-full h-full object-cover"
                            data-alt="Modern architectural glass conservatory studio filled with morning sunlight, lush green monstera plants, concrete polished floor, minimalist white decor in Phnom Penh."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYCVojTeMqhdCtQYA0_asXzQx35NhKF8B3LTB-teT7pyXU2nU7UqmFujVuB8w5FFGou9KBVWG3oNHwifp6bpFD7DSFF2ZeokqKBIgHmmQh1flrE0_j-1j25Lxw_ERmNiW-i76Rj6yYkl-mVvDAhv-uK2yirnOxJQA5hpIwYWTGXwH_sSMacdT5xw3BiTVxzb6D8fNlhRiOKmd-lLnFCNfDHBRuLe17n5Nt4N9UXJ7O2tJRdPFFnPcT"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-semibold text-on-surface hover:text-primary cursor-pointer">
                            The Glass Studio
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              data-icon="location_on"
                            >
                              location_on
                            </span>
                            BKK1, Phnom Penh
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-label-md text-label-md font-semibold text-on-surface">
                      42
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      168 hrs
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      4.0 hrs
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
                        2.3%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-headline-sm text-base text-primary font-bold">
                      $6,800.00
                    </td>
                    <td className="py-4 px-md text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="trending_up"
                        >
                          trending_up
                        </span>
                        +24%
                      </span>
                    </td>
                  </tr>
                  {/*  Row 2: Industrial Loft  */}
                  <tr className="hover:bg-surface-container-low/40 transition-colors duration-150">
                    <td className="py-4 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline-variant">
                          <img
                            alt="Industrial Loft"
                            className="w-full h-full object-cover"
                            data-alt="Spacious industrial creative studio with exposed brick walls, steel frame windows, pendant lighting, leather armchairs, high ceiling urban warehouse setting in Cambodia."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8I4YMVf19nR1FpQefig4tvCsV1Oxk9HFX61OJQwxs4pugUvCuMElLtqvu2yRx1pWTCE3yIdO448l9Tw2L6gzkqjt6RoL3EWBmETk6nXz4pJtiotbLKQwFxf0MmKQG6tMe8j1UbU0gh6tJ9xCKHTwCa7ZuRH27zVxY13JzEqV9A-kobirzVdwkNuZiMlmdWmvqKEmopXeq99LRJ-VOpqLdUPaCrlbMXSj75wFcXQOfa0UnANN2yH0o"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-semibold text-on-surface hover:text-primary cursor-pointer">
                            Industrial Loft
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              data-icon="location_on"
                            >
                              location_on
                            </span>
                            Tuol Tompoung (Russian Market)
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-label-md text-label-md font-semibold text-on-surface">
                      36
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      132 hrs
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      3.7 hrs
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
                        4.1%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-headline-sm text-base text-primary font-bold">
                      $5,240.00
                    </td>
                    <td className="py-4 px-md text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="trending_up"
                        >
                          trending_up
                        </span>
                        +15%
                      </span>
                    </td>
                  </tr>
                  {/*  Row 3: Sonic Wave Suite  */}
                  <tr className="hover:bg-surface-container-low/40 transition-colors duration-150">
                    <td className="py-4 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline-variant">
                          <img
                            alt="Sonic Wave Suite"
                            className="w-full h-full object-cover"
                            data-alt="Acoustically treated contemporary sound recording and podcast production studio with wooden slat diffusers, warm ambient strip lighting, microphone arms and mixing console."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_P3S9adS2brgGn7pmt3nfCodORvuQ1n2jwW-6AqUhzKYAs9eDduaUo56BGXRD4F3mwXTnnbH9OkodLd-Q3shpTImpWw0S4X85pK_orMnln9quF0oiqoRdfX42kUWMEtagBTHiYW5W1f70-7-2skNsM_1yYZlqRNxdnPXK69YMAFC4eQ2Up2ZE9ZL5yBR6RtRtAkmh6iY16Xcq0ig5q90gi19Ljzgt9YBVIAtFAZBQpCoy5KW6rrDp"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-semibold text-on-surface hover:text-primary cursor-pointer">
                            Sonic Wave Suite
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              data-icon="location_on"
                            >
                              location_on
                            </span>
                            Daun Penh, Phnom Penh
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-label-md text-label-md font-semibold text-on-surface">
                      28
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      98 hrs
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      3.5 hrs
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
                        3.5%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-headline-sm text-base text-primary font-bold">
                      $3,850.00
                    </td>
                    <td className="py-4 px-md text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-xs bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="trending_up"
                        >
                          trending_up
                        </span>
                        +8%
                      </span>
                    </td>
                  </tr>
                  {/*  Row 4: Minimalist Workshop  */}
                  <tr className="hover:bg-surface-container-low/40 transition-colors duration-150">
                    <td className="py-4 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline-variant">
                          <img
                            alt="Minimalist Workshop"
                            className="w-full h-full object-cover"
                            data-alt="Bright airy creative workshop room with white oak tables, modular ceramic display racks, high arched windows, subtle terracotta accents, peaceful minimalist artisan atmosphere."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzSYg2IKwxvEUG0g0spEu__N_Y6K2gqUBemwvA3uCaj0sNb34HSnR68XgqP39gyVd6T2bNZwDyCB6GnFYYskJR1M_TbF5iX7OgbUuYklALEr4iQWUyIewaQSu1N4YEomL07n6rleRximcktpYFMgNkXrgKqnKO6TLZCKy3rsMHNxCLB3SK4TRlkkfJPtArxvsXfmEtxgBCZjp_Kg9Z11E8DkiHjaz55GbWyfRe6jnDZRprCznuEJGw"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-semibold text-on-surface hover:text-primary cursor-pointer">
                            Minimalist Workshop
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-xs"
                              data-icon="location_on"
                            >
                              location_on
                            </span>
                            Chroy Changvar
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-label-md text-label-md font-semibold text-on-surface">
                      19
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      84 hrs
                    </td>
                    <td className="py-4 px-4 text-center text-on-surface-variant">
                      4.4 hrs
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-container/60 text-tertiary">
                        5.2%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-headline-sm text-base text-primary font-bold">
                      $2,560.00
                    </td>
                    <td className="py-4 px-md text-center">
                      <span className="inline-flex items-center gap-1 text-on-surface-variant font-medium text-xs bg-surface-container px-2 py-0.5 rounded-full">
                        <span
                          className="material-symbols-outlined text-xs"
                          data-icon="trending_flat"
                        >
                          trending_flat
                        </span>
                        +1.2%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*  Table Footer / Pagination  */}
            <div className="p-md bg-surface-container-lowest border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-label-sm text-label-sm text-on-surface-variant">
              <span>Showing 4 of 4 active spaces in Phnom Penh portfolio</span>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-outline cursor-not-allowed"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-outline cursor-not-allowed"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </section>
          {/*  Bottom System / Status Bar  */}
          <footer className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between text-xs font-label-sm text-outline border-t border-outline-variant/30 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>
                StudioConnect Analytics Engine v2.4 • Syncing live with Phnom
                Penh venue gateways
              </span>
            </div>
            <div>
              <span>Data updated 4 minutes ago</span>
            </div>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}
