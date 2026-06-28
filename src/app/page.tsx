"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/features/home/components/Hero";
import { HowItWorksSection } from "@/features/home/components/HowItWorksSection";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { SpaceCard, SpaceData } from "@/features/home/components/SpaceCard";
import { spacesApi } from "@/lib/api";

export default function Home() {
  const [spaces, setSpaces] = useState<SpaceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSpaces = async (filters?: { space_type?: string; search?: string }) => {
    try {
      setLoading(true);
      const data = await spacesApi.list({ status: "Active", ...filters });
      // Map database space objects to SpaceData structure expected by SpaceCard
      const mappedSpaces = data.map((space: any) => ({
        id: space.id,
        title: space.name,
        location: space.location,
        price: `$${parseFloat(space.price_per_hour).toFixed(2)}`,
        imageSrc: Array.isArray(space.images) ? space.images[0] : (JSON.parse(space.images || '[]')[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuApCqKB97pQMigDG4PXYMWpdEdBWZUpxDsEC7Yy5s09yBEYax2QnvJAtNsRiHwedKORP9qT5ox1IaPa_PmtammtYF1MQXwwVL_V8sgxDbUeAGX27moxj9SI2Ps4_b8-xjlXNjR-9KYzbueDPry5ziTLMUB9vBuBKftBm_AabmZbrVrRZJnj_T63FpOLMWBtRrmtnteU28Gi2E1e2IDmTXH8MORjX1atP7SRim3Gb_Sh1OBK4hyB1vwvqvxbBYC8WYjbqpLKXuGb9PU"),
        imageAlt: space.name,
      }));
      setSpaces(mappedSpaces);
    } catch (err: any) {
      setError("Could not load creative spaces. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <>
      <Navbar />
      <Hero onSearch={fetchSpaces} />
      
      <HowItWorksSection />

      {/* Content Section */}
      <main className="max-w-container-max mx-auto px-gutter pb-xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Available Creative Hubs</h2>
            <p className="text-body-md text-on-surface-variant">Discover handpicked professional environments for your next project.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-body-md text-on-surface-variant">Loading creative spaces...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-error font-body-md">
            {error}
          </div>
        ) : spaces.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant font-body-md">
            No active creative spaces found.
          </div>
        ) : (
          /* 3-Column Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}

        {/* Pagination / Load More */}
        <div className="mt-xl flex justify-center">
          <button className="px-8 py-3 border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors active:scale-95">
            Load More Spaces
          </button>
        </div>
      </main>

      <TestimonialsSection />

      <Footer />
    </>
  );
}
