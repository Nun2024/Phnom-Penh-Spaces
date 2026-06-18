"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

type SpaceType = "podcast" | "meeting" | "gallery" | "workshop";

export default function CreateNewSpacePage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [location, setLocation] = useState("BKK1, Phnom Penh");
  const [spaceType, setSpaceType] = useState<SpaceType>("podcast");
  const [pricePerHour, setPricePerHour] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState({
    wifi: false,
    whiteboard: false,
    ac: true,
    soundproofing: true,
    naturalLight: false,
    refreshments: false,
  });

  const [images, setImages] = useState<string[]>([
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAdS8YJqd0tIf9m_P39B3UyEvpLvkexRbP3BovweXnImkHFyQFwgkz75nhnSI_ieez4e5_LDotTTsDzWXX-f6KZl0AiLXjF-v5yb1GypQhjWCEmNPhy_Eo4QIl-LV8BD_-exZ1Wi4Z3atfsqkdXlav5apqvG8n5HLivUqf-Nedt3Qjhu6y1jQOJSBsUkERJPosetAKLRu7P8waFElWSECLJlsMHlWZ5MUqZ13VQwgoICGzmbrJ12vBMc8mLsGDlqLn2sgNEabqFAws",
  ]);

  const handleAmenityChange = (key: keyof typeof amenities) => {
    setAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a production app, we would save to API/Database here.
    // For demo/prototype, we redirect back to the spaces page.
    alert(`Space "${name}" successfully created!`);
    router.push("/spaces");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-gutter animate-fade-in">
        <header className="mb-lg">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-xs">
            Create New Space
          </h2>
          <p className="font-body-lg text-body-lg text-secondary">
            Register a new studio, gallery, or workspace to your portfolio.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-md">
          {/* Section 1: Basic Info */}
          <section className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center gap-2 mb-md border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-primary">info</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Basic Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Space Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant form-input-focus font-body-md bg-surface text-on-surface"
                  placeholder="e.g. Skyline Podcast Studio"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Branch Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant form-input-focus font-body-md bg-surface text-on-surface appearance-none"
                >
                  <option>BKK1, Phnom Penh</option>
                  <option>Toul Tom Poung</option>
                  <option>Riverside District</option>
                  <option>Daun Penh</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Space Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                  <label
                    onClick={() => setSpaceType("podcast")}
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      spaceType === "podcast"
                        ? "border-primary bg-primary-container/10 font-bold"
                        : "border-outline-variant bg-surface hover:bg-primary-container/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary">mic</span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Podcast Studio
                    </span>
                  </label>
                  <label
                    onClick={() => setSpaceType("meeting")}
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      spaceType === "meeting"
                        ? "border-primary bg-primary-container/10 font-bold"
                        : "border-outline-variant bg-surface hover:bg-primary-container/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary">meeting_room</span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Meeting Room
                    </span>
                  </label>
                  <label
                    onClick={() => setSpaceType("gallery")}
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      spaceType === "gallery"
                        ? "border-primary bg-primary-container/10 font-bold"
                        : "border-outline-variant bg-surface hover:bg-primary-container/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary">palette</span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Art Gallery
                    </span>
                  </label>
                  <label
                    onClick={() => setSpaceType("workshop")}
                    className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      spaceType === "workshop"
                        ? "border-primary bg-primary-container/10 font-bold"
                        : "border-outline-variant bg-surface hover:bg-primary-container/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary">work</span>
                    <span className="font-label-sm text-label-sm text-on-surface">
                      Workshop
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Pricing & Capacity */}
          <section className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center gap-2 mb-md border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Pricing &amp; Capacity
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Hourly Rate (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">
                    $
                  </span>
                  <input
                    required
                    min={1}
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant form-input-focus font-body-md bg-surface text-on-surface"
                    placeholder="25.00"
                    type="number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Maximum Capacity (Persons)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                    groups
                  </span>
                  <input
                    required
                    min={1}
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant form-input-focus font-body-md bg-surface text-on-surface"
                    placeholder="10"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Description & Amenities */}
          <section className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center gap-2 mb-md border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-primary">description</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Description &amp; Amenities
              </h3>
            </div>
            <div className="space-y-md">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  About the Space
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant form-input-focus font-body-md resize-none bg-surface text-on-surface"
                  placeholder="Describe the atmosphere, equipment, and unique features of this creative space..."
                  rows={4}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-secondary">
                  Included Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.wifi}
                      onChange={() => handleAmenityChange("wifi")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">
                      High-speed Wi-Fi
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.whiteboard}
                      onChange={() => handleAmenityChange("whiteboard")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">Whiteboard</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.ac}
                      onChange={() => handleAmenityChange("ac")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">
                      Air Conditioning
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.soundproofing}
                      onChange={() => handleAmenityChange("soundproofing")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">
                      Soundproofing
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.naturalLight}
                      onChange={() => handleAmenityChange("naturalLight")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">
                      Natural Light
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={amenities.refreshments}
                      onChange={() => handleAmenityChange("refreshments")}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface"
                    />
                    <span className="font-label-md text-label-md text-on-surface">Refreshments</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Media Upload */}
          <section className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center gap-2 mb-md border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-primary">image</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Media Gallery</h3>
            </div>
            <div className="space-y-4">
              <div className="block w-full border-2 border-dashed border-outline-variant rounded-xl p-xl text-center cursor-pointer hover:border-primary hover:bg-primary-container/5 transition-all group">
                <div className="flex flex-col items-center gap-sm">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      cloud_upload
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      Drag &amp; drop interior photos
                    </p>
                    <p className="font-label-sm text-label-sm text-secondary">
                      High-quality JPG or PNG (Max 5MB per file)
                    </p>
                  </div>
                  <button
                    className="mt-2 text-primary font-label-md text-label-md underline underline-offset-4 cursor-pointer"
                    type="button"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Image Preview Grid */}
              <div className="grid grid-cols-4 gap-sm">
                {images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden relative group">
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-error text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
                <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center bg-surface-container-low text-outline-variant cursor-pointer hover:border-primary transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Actions */}
          <footer className="flex items-center justify-end gap-md pt-lg">
            <button
              type="button"
              onClick={() => router.push("/spaces")}
              className="px-md py-3 font-label-md text-label-md text-secondary hover:text-on-surface transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-xl py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              Create Space
            </button>
          </footer>
        </form>
      </div>
    </DashboardLayout>
  );
}
