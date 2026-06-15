import React from 'react';

export interface SpaceData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  title: string;
  location: string;
}

interface SpaceCardProps {
  space: SpaceData;
}

export function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="space-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-surface-variant">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={space.imageAlt} 
          src={space.imageSrc} 
        />
        <div className="absolute top-4 right-4">
          <span className="bg-[#ECFDF5] text-[#10B981] px-3 py-1 rounded-full text-label-sm font-label-sm shadow-sm">
            {space.price} / Hour
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">{space.title}</h3>
        <p className="text-label-md text-outline mb-6 flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">location_on</span>
          {space.location}
        </p>
        <div className="mt-auto">
          <button className="availability-btn opacity-0 translate-y-4 transition-all duration-300 w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-opacity-90">
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}
