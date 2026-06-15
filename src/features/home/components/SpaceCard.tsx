import Link from 'next/link';

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
    <div className="space-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col relative">
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
        <Link 
          href={`/spaces/${space.id}`}
          className="availability-btn absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <span className="text-on-primary font-label-md text-label-md px-6 py-3 border border-on-primary rounded-full hover:bg-on-primary hover:text-primary transition-colors">
            Check Availability
          </span>
        </Link>
      </div>
    </div>
  );
}
