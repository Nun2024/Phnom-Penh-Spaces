"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { spacesApi } from "@/lib/api";

interface Space {
  id: string;
  name: string;
  location: string;
  price_per_hour: number;
  images: any;
  status: "Active" | "Maintenance";
}

export default function SpacesManagementPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState<number>(20);
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"Active" | "Maintenance">("Active");

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      const data = await spacesApi.list();
      setSpaces(data);
    } catch (err: any) {
      setError(err.message || "Could not load spaces.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const openAddModal = () => {
    setEditingSpace(null);
    setName("");
    setLocation("");
    setPricePerHour(20);
    setImageUrl("");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (space: Space) => {
    setEditingSpace(space);
    setName(space.name);
    setLocation(space.location);
    setPricePerHour(space.price_per_hour);
    
    const imageList = Array.isArray(space.images) ? space.images : JSON.parse(space.images || '[]');
    setImageUrl(imageList[0] || "");
    
    setStatus(space.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSpace(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const defaultImage = imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuApCqKB97pQMigDG4PXYMWpdEdBWZUpxDsEC7Yy5s09yBEYax2QnvJAtNsRiHwedKORP9qT5ox1IaPa_PmtammtYF1MQXwwVL_V8sgxDbUeAGX27moxj9SI2Ps4_b8-xjlXNjR-9KYzbueDPry5ziTLMUB9vBuBKftBm_AabmZbrVrRZJnj_T63FpOLMWBtRrmtnteU28Gi2E1e2IDmTXH8MORjX1atP7SRim3Gb_Sh1OBK4hyB1vwvqvxbBYC8WYjbqpLKXuGb9PU";

    try {
      if (editingSpace) {
        // Edit mode
        await spacesApi.update(editingSpace.id, {
          name,
          location,
          price_per_hour: pricePerHour,
          images: [defaultImage],
          status,
        });
      } else {
        // Add mode
        await spacesApi.create({
          name,
          location,
          space_type: "meeting", // Default to meeting for quick add
          price_per_hour: pricePerHour,
          capacity: 10,
          description: "Quick added creative venue",
          images: [defaultImage],
          status,
        });
      }
      closeModal();
      fetchSpaces();
    } catch (err: any) {
      alert(err.message || "Failed to save space details.");
    }
  };

  const toggleStatus = async (space: Space) => {
    const nextStatus = space.status === "Active" ? "Maintenance" : "Active";
    try {
      await spacesApi.update(space.id, { status: nextStatus });
      fetchSpaces();
    } catch (err: any) {
      alert(err.message || "Failed to update space status.");
    }
  };

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-gutter max-w-container-max mx-auto animate-fade-in">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-background">Spaces</h1>
            <p className="font-body-md text-body-md text-secondary mt-xs">
              Manage your creative venues and availability
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary hover:text-white transition-colors duration-300 px-6 py-3 rounded-xl font-label-md font-bold custom-shadow active:scale-[0.98] text-center cursor-pointer"
          >
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            Add New Space
          </button>
        </div>

        {/* Search & Filter bar (Local) */}
        <div className="mb-md flex gap-md items-center">
          <div className="relative flex-1 max-w-[448px]">
            <span className="absolute inset-y-0 left-3 flex items-center text-outline">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl pl-10 pr-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Dashboard Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant custom-shadow">
            <p className="text-label-sm text-secondary uppercase font-bold tracking-wider">
              Total Spaces
            </p>
            <p className="text-headline-md font-extrabold text-primary mt-xs">
              {spaces.length}
            </p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant custom-shadow">
            <p className="text-label-sm text-secondary uppercase font-bold tracking-wider">
              Active Bookings
            </p>
            <p className="text-headline-md font-extrabold text-primary mt-xs">48</p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant custom-shadow">
            <p className="text-label-sm text-secondary uppercase font-bold tracking-wider">
              Monthly Revenue
            </p>
            <p className="text-headline-md font-extrabold text-primary mt-xs">$3,240</p>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant custom-shadow">
            <p className="text-label-sm text-secondary uppercase font-bold tracking-wider">
              Average Rating
            </p>
            <div className="flex items-center gap-2 mt-xs">
              <p className="text-headline-md font-extrabold text-primary">4.9</p>
              <span
                className="material-symbols-outlined text-tertiary-container"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-body-md text-on-surface-variant">Loading spaces...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-error font-body-md">{error}</div>
        ) : (
          /* Spaces Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-md">
            {filteredSpaces.map((space) => {
              const imageList = Array.isArray(space.images) ? space.images : JSON.parse(space.images || '[]');
              const displayImage = imageList[0] || "https://lh3.googleusercontent.com/aida-public/AB6AXuApCqKB97pQMigDG4PXYMWpdEdBWZUpxDsEC7Yy5s09yBEYax2QnvJAtNsRiHwedKORP9qT5ox1IaPa_PmtammtYF1MQXwwVL_V8sgxDbUeAGX27moxj9SI2Ps4_b8-xjlXNjR-9KYzbueDPry5ziTLMUB9vBuBKftBm_AabmZbrVrRZJnj_T63FpOLMWBtRrmtnteU28Gi2E1e2IDmTXH8MORjX1atP7SRim3Gb_Sh1OBK4hyB1vwvqvxbBYC8WYjbqpLKXuGb9PU";

              return (
                <div
                  key={space.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant custom-shadow transition-all duration-300 card-hover flex flex-col"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={displayImage}
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      ${space.price_per_hour} / hr
                    </div>
                    <div className="absolute top-4 left-4">
                      {space.status === "Active" ? (
                        <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>{" "}
                          Active
                        </span>
                      ) : (
                        <span className="bg-white/90 backdrop-blur-sm text-tertiary px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-tertiary"></span>{" "}
                          Maintenance
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-md flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {space.name}
                      </h3>
                      <div className="flex items-center gap-1 text-secondary mt-1">
                        <span className="material-symbols-outlined text-sm" data-icon="location_on">
                          location_on
                        </span>
                        <span className="text-label-md">{space.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-auto pt-md border-t border-outline-variant">
                      <button
                        onClick={() => openEditModal(space)}
                        className="flex-1 py-2 rounded-lg bg-surface-container-low text-secondary font-label-md hover:bg-primary-container/10 hover:text-primary transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/spaces/${space.id}`}
                        className="flex-1 py-2 rounded-lg bg-surface-container-low text-secondary font-label-md hover:bg-primary-container/10 hover:text-primary transition-colors text-center"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => toggleStatus(space)}
                        className="p-2 rounded-lg bg-surface-container-low text-secondary hover:text-primary transition-colors cursor-pointer"
                        title="Toggle Status"
                      >
                        <span
                          className="material-symbols-outlined"
                          data-icon={space.status === "Active" ? "toggle_on" : "toggle_off"}
                          style={{
                            fontVariationSettings:
                              space.status === "Active" ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          {space.status === "Active" ? "toggle_on" : "toggle_off"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Space Empty State / Quick Entry */}
            <Link
              href="/spaces/new"
              className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-lg group hover:border-primary-container hover:bg-primary-container/5 transition-all duration-300 min-h-[300px] text-center flex-col justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <span
                  className="material-symbols-outlined text-3xl text-secondary group-hover:text-primary animate-pulse"
                  data-icon="add_circle"
                >
                  add_circle
                </span>
              </div>
              <span className="font-headline-sm text-secondary group-hover:text-primary transition-colors block">
                New Space
              </span>
              <span className="text-body-md text-outline group-hover:text-primary/70 transition-colors block">
                Expand your venue portfolio
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface-container-lowest rounded-xl max-w-[448px] w-full border border-outline-variant p-md shadow-lg animate-fade-in">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {editingSpace ? "Edit Space" : "Add New Space"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-secondary hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-sm">
                <div>
                  <label className="block text-label-md font-bold text-secondary mb-1">
                    Space Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
                    placeholder="e.g. Glass Studio"
                  />
                </div>

                <div>
                  <label className="block text-label-md font-bold text-secondary mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
                    placeholder="e.g. BKK1, Phnom Penh"
                  />
                </div>

                <div>
                  <label className="block text-label-md font-bold text-secondary mb-1">
                    Price per Hour ($)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(parseInt(e.target.value) || 0)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
                  />
                </div>

                <div>
                  <label className="block text-label-md font-bold text-secondary mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-body-md"
                    placeholder="Leave blank for default"
                  />
                </div>

                <div>
                  <label className="block text-label-md font-bold text-secondary mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Active" | "Maintenance")}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-body-md cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="flex gap-sm pt-sm">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-2 border border-outline-variant rounded-lg text-secondary font-label-md hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-opacity cursor-pointer font-bold"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </DashboardLayout>
  );
}
