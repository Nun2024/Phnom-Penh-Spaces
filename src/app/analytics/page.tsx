"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { analyticsApi, spacesApi } from "@/lib/api";

export default function AnalysisPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
  const [metricType, setMetricType] = useState<'revenue' | 'bookings'>('revenue');
  const [timeHorizon, setTimeHorizon] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpis, trends, utilization, heatmap, spacesPerformance, spacesRes] = await Promise.all([
          analyticsApi.kpis(),
          analyticsApi.trends(),
          analyticsApi.utilization(),
          analyticsApi.heatmap(),
          analyticsApi.spacesPerformance(),
          spacesApi.list()
        ]);

        const spaces = Array.isArray(spacesRes) ? spacesRes : (spacesRes?.data || []);

        setData({ kpis, trends, utilization, heatmap, spacesPerformance, spaces });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const mockChartData: Record<string, Record<string, any[]>> = {
    revenue: {
      daily: [{ label: 'Mon', curr: 500, prev: 400 }, { label: 'Tue', curr: 600, prev: 450 }, { label: 'Wed', curr: 800, prev: 700 }, { label: 'Thu', curr: 450, prev: 500 }, { label: 'Fri', curr: 900, prev: 850 }, { label: 'Sat', curr: 1820, prev: 1100, peak: true }, { label: 'Sun', curr: 1100, prev: 900 }],
      weekly: [{ label: 'Wk 1', curr: 3920, prev: 3100 }, { label: 'Wk 2', curr: 4650, prev: 3620 }, { label: 'Wk 3', curr: 5480, prev: 4010, peak: true }, { label: 'Wk 4', curr: 4400, prev: 4850 }],
      monthly: [{ label: 'Jan', curr: 15400, prev: 12300 }, { label: 'Feb', curr: 18450, prev: 15580, peak: true }, { label: 'Mar', curr: 16200, prev: 17100 }],
    },
    bookings: {
      daily: [{ label: 'Mon', curr: 5, prev: 4 }, { label: 'Tue', curr: 6, prev: 5 }, { label: 'Wed', curr: 8, prev: 7 }, { label: 'Thu', curr: 4, prev: 5 }, { label: 'Fri', curr: 10, prev: 8 }, { label: 'Sat', curr: 14, prev: 11, peak: true }, { label: 'Sun', curr: 12, prev: 9 }],
      weekly: [{ label: 'Wk 1', curr: 32, prev: 25 }, { label: 'Wk 2', curr: 45, prev: 30 }, { label: 'Wk 3', curr: 58, prev: 40, peak: true }, { label: 'Wk 4', curr: 40, prev: 48 }],
      monthly: [{ label: 'Jan', curr: 150, prev: 120 }, { label: 'Feb', curr: 185, prev: 145, peak: true }, { label: 'Mar', curr: 160, prev: 170 }],
    }
  };

  const activeChartData = data?.trends?.[metricType]?.[timeHorizon] || mockChartData[metricType][timeHorizon];
  const maxVal = Math.max(...activeChartData.map((d: any) => Math.max(d.curr, d.prev))) * 1.15 || 1;

  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-on-surface-variant animate-pulse">Loading Analytics Data...</p>
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
              <div className="relative">
                <select
                  aria-label="Select Date Range"
                  className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Month</option>
                  <option>Last Quarter</option>
                  <option>Custom Range</option>
                </select>
                <span
                  className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base"
                  data-icon="calendar_today"
                >
                  calendar_today
                </span>
              </div>
              {/*  Space Selector Filter  */}
              <div className="relative">
                <select
                  aria-label="Filter by Space"
                  className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  value={selectedSpaceId}
                  onChange={(e) => setSelectedSpaceId(e.target.value)}
                >
                  <option value="">All Spaces ({data?.spaces?.length || 0})</option>
                  {data?.spaces?.map((space: any) => (
                    <option key={space.id || space.name} value={space.id || space.name}>
                      {space.name}
                    </option>
                  ))}
                </select>
                <span
                  className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base"
                  data-icon="expand_more"
                >
                  expand_more
                </span>
              </div>
              {/*  Export Report CTA  */}
              <button className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant text-on-surface font-label-md text-label-md py-2 px-3.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors duration-150 active:translate-y-0.5">
                <span
                  className="material-symbols-outlined text-primary text-base"
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
                  ${data?.kpis?.totalRevenue?.value?.toLocaleString('en-US', {minimumFractionDigits: 2}) || '18,450.00'}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${data?.kpis?.totalRevenue?.isPositive ? 'bg-[#ECFDF5] text-primary' : 'bg-red-50 text-red-600'}`}>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={data?.kpis?.totalRevenue?.isPositive ? "trending_up" : "trending_down"}
                  >
                    {data?.kpis?.totalRevenue?.isPositive ? "trending_up" : "trending_down"}
                  </span>
                  {data?.kpis?.totalRevenue?.isPositive ? '+' : '-'}{data?.kpis?.totalRevenue?.trend || '18.4'}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {data?.kpis?.totalRevenue?.trendLabel || 'vs last month'}
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
                  {data?.kpis?.occupancyRate?.value || '76.2'}%
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${data?.kpis?.occupancyRate?.isPositive !== false ? 'bg-[#ECFDF5] text-primary' : 'bg-red-50 text-red-600'}`}>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={data?.kpis?.occupancyRate?.isPositive !== false ? "trending_up" : "trending_down"}
                  >
                    {data?.kpis?.occupancyRate?.isPositive !== false ? "trending_up" : "trending_down"}
                  </span>
                  {data?.kpis?.occupancyRate?.isPositive !== false ? '+' : '-'}{data?.kpis?.occupancyRate?.trend || '5.1'}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {data?.kpis?.occupancyRate?.trendLabel || 'vs target (70%)'}
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
                  {data?.kpis?.bookedHours?.value || '482'} hrs
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${data?.kpis?.bookedHours?.isPositive !== false ? 'bg-[#ECFDF5] text-primary' : 'bg-red-50 text-red-600'}`}>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={data?.kpis?.bookedHours?.isPositive !== false ? "trending_up" : "trending_down"}
                  >
                    {data?.kpis?.bookedHours?.isPositive !== false ? "trending_up" : "trending_down"}
                  </span>
                  {data?.kpis?.bookedHours?.isPositive !== false ? '+' : '-'}{data?.kpis?.bookedHours?.trend || '12'}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {data?.kpis?.bookedHours?.trendLabel || 'increase'}
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
                  ${data?.kpis?.revPAH?.value?.toLocaleString('en-US', {minimumFractionDigits: 2}) || '38.28'}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${data?.kpis?.revPAH?.isPositive !== false ? 'bg-[#ECFDF5] text-primary' : 'bg-red-50 text-red-600'}`}>
                  <span
                    className="material-symbols-outlined text-xs"
                    data-icon={data?.kpis?.revPAH?.isPositive !== false ? "trending_up" : "trending_down"}
                  >
                    {data?.kpis?.revPAH?.isPositive !== false ? "trending_up" : "trending_down"}
                  </span>
                  {data?.kpis?.revPAH?.isPositive !== false ? '+' : '-'}{data?.kpis?.revPAH?.trend || '9.4'}%
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {data?.kpis?.revPAH?.trendLabel || 'efficiency'}
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
                      <button 
                        onClick={() => setMetricType('revenue')}
                        className={`px-2.5 py-1 rounded ${metricType === 'revenue' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        Revenue ($)
                      </button>
                      <button 
                        onClick={() => setMetricType('bookings')}
                        className={`px-2.5 py-1 rounded ${metricType === 'bookings' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        Bookings Count
                      </button>
                    </div>
                    {/*  Time Horizon Toggle  */}
                    <div className="inline-flex p-1 bg-surface-container-low rounded-lg text-xs font-label-sm font-medium">
                      <button 
                        onClick={() => setTimeHorizon('daily')}
                        className={`px-2 py-1 rounded ${timeHorizon === 'daily' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        Daily
                      </button>
                      <button 
                        onClick={() => setTimeHorizon('weekly')}
                        className={`px-2 py-1 rounded ${timeHorizon === 'weekly' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        Weekly
                      </button>
                      <button 
                        onClick={() => setTimeHorizon('monthly')}
                        className={`px-2 py-1 rounded ${timeHorizon === 'monthly' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
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
                      {[1, 0.75, 0.5, 0.25].map(ratio => (
                        <div key={ratio} className="border-b border-dashed border-outline-variant w-full flex justify-end text-[10px] text-on-surface-variant pr-1">
                          {metricType === 'revenue' 
                            ? '$' + ((maxVal * ratio) > 1000 ? Math.round((maxVal * ratio) / 100) / 10 + 'k' : Math.round(maxVal * ratio))
                            : Math.round(maxVal * ratio)}
                        </div>
                      ))}
                      <div className="w-full"></div>
                    </div>
                    
                    {/*  Dynamic Chart Bars  */}
                    {activeChartData.map((d: any, idx: number) => (
                      <div key={idx} className="relative z-10 flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                        <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                          <div
                            className="w-1/2 bg-primary-fixed rounded-t transition-all duration-300 group-hover:opacity-90"
                            style={{ height: `${(d.prev / maxVal) * 100}%` }}
                          ></div>
                          <div
                            className="w-1/2 bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-container relative"
                            style={{ height: `${(d.curr / maxVal) * 100}%` }}
                          >
                            {d.peak && (
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-[#ECFDF5] px-1 py-0.5 rounded border border-primary/20 z-30">
                                Peak
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`font-label-sm text-label-sm ${d.peak ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                          {d.label}
                        </span>
                        <div className="absolute -top-12 hidden group-hover:flex flex-col items-center bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md z-40">
                          <span>{metricType === 'revenue' ? '$' : ''}{d.curr.toLocaleString()} (Curr) vs {metricType === 'revenue' ? '$' : ''}{d.prev.toLocaleString()} (Prev)</span>
                        </div>
                      </div>
                    ))}
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
                  {data?.spacesPerformance
                    ?.filter((space: any) => !selectedSpaceId || (space.id === selectedSpaceId || space.name === selectedSpaceId))
                    .map((space: any, idx: number) => (
                    <tr key={space.id || idx} className="hover:bg-surface-container-low/40 transition-colors duration-150">
                      <td className="py-4 px-md">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline-variant">
                            <img
                              alt={space.name || "Space"}
                              className="w-full h-full object-cover"
                              src={space.image || "https://placehold.co/100x100?text=Space"}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface hover:text-primary cursor-pointer">
                              {space.name}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                              <span
                                className="material-symbols-outlined text-xs"
                                data-icon="location_on"
                              >
                                location_on
                              </span>
                              {space.location || 'Phnom Penh'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-label-md text-label-md font-semibold text-on-surface">
                        {space.totalBookings?.value ?? space.totalBookings ?? 0}
                      </td>
                      <td className="py-4 px-4 text-center text-on-surface-variant">
                        {space.totalHours?.value ?? space.totalHours ?? 0} hrs
                      </td>
                      <td className="py-4 px-4 text-center text-on-surface-variant">
                        {space.avgDuration?.value ?? space.avgDuration ?? 0} hrs
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
                          {space.cancellationRate?.value ?? space.cancellationRate ?? '0'}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-headline-sm text-base text-primary font-bold">
                        ${Number(space.totalRevenue?.value ?? space.totalRevenue ?? 0).toLocaleString('en-US', {minimumFractionDigits: 2})}
                      </td>
                      <td className="py-4 px-md text-center">
                        <span className={`inline-flex items-center gap-1 font-semibold text-xs px-2 py-0.5 rounded-full ${(space.trend?.isPositive ?? space.isPositive) !== false ? 'text-primary bg-[#ECFDF5]' : 'text-red-600 bg-red-50'}`}>
                          <span
                            className="material-symbols-outlined text-xs"
                            data-icon={(space.trend?.isFlat ?? space.isFlat) ? "trending_flat" : ((space.trend?.isPositive ?? space.isPositive) !== false ? "trending_up" : "trending_down")}
                          >
                            {(space.trend?.isFlat ?? space.isFlat) ? "trending_flat" : ((space.trend?.isPositive ?? space.isPositive) !== false ? "trending_up" : "trending_down")}
                          </span>
                          {(space.trend?.isFlat ?? space.isFlat) ? '' : ((space.trend?.isPositive ?? space.isPositive) !== false ? '+' : '-')}{space.trend?.value ?? space.trend ?? '0'}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {(!data?.spacesPerformance || data.spacesPerformance.filter((s: any) => !selectedSpaceId || (s.id === selectedSpaceId || s.name === selectedSpaceId)).length === 0) && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-on-surface-variant">
                        No performance data available for the selected space.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/*  Table Footer / Pagination  */}
            <div className="p-md bg-surface-container-lowest border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-label-sm text-label-sm text-on-surface-variant">
              <span>Showing {data?.spacesPerformance?.filter((s: any) => !selectedSpaceId || (s.id === selectedSpaceId || s.name === selectedSpaceId)).length || 0} of {data?.spaces?.length || 0} active spaces in Phnom Penh portfolio</span>
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
