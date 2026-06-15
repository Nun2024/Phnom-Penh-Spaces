import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/features/home/components/Hero";
import { HowItWorksSection } from "@/features/home/components/HowItWorksSection";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { SpaceCard, SpaceData } from "@/features/home/components/SpaceCard";

const SPACES: SpaceData[] = [
  {
    id: '1',
    title: 'The Glass Studio',
    location: 'BKK1 Branch',
    price: '$12.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1J7BkwGxvVieSNADcYJreb5fxUOWWlw1sQIjv15tW-PYERNab14Q2y4m__1jtDHuCWHgjcV_rJcyD93QyqvWtuWzkBgwCoCRi2dh-4Mr44FezAHGtD0YddtFVGWX94xp5K1NtkNMnrgV_jgf4LRSd5lYD7leZjD14tN7CUhTMgTUKA0Ckd3BtzUy_v5MqOx4SS11hIvoi4QbhEwEJpWJs3Att8U2Pm2bAjKD7-Ccc6w48_Hco0yYIZy1ilDIKwNS3zsHaAe6rc1Y',
    imageAlt: 'The Glass Studio',
  },
  {
    id: '2',
    title: 'Sonic Wave Suite',
    location: 'Tuol Kork Branch',
    price: '$15.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCslIuaIO1SBE_HNXUyDF2YuYlojUt-1oqARrAelsIATfl7KJ8ZRducuAmYqnJGNa3L7UTd2_ZT2hNkDx8AM8mEs-Y3nlhXMPiOmBXetdr4CofEvTHdxSA_RWsIDsXXH9hMSowebaUAOVbrL4ozFR7MOuNY2vq3VsLu9sWZLm88NxtDcoumrPT7h4IxOnIVdmo-ROUMcUPRMQTzISOV9QA6dpwfpFzeIV9EjrzmT9xPawIIFGt6GWSgjCqNC4HTFfPK7aT4KNY7iBo',
    imageAlt: 'Sonic Wave Suite',
  },
  {
    id: '3',
    title: 'Vibe Meeting Room',
    location: 'BKK1 Branch',
    price: '$10.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADfNeNUWtyVA9pVjCfbEzGspRUEi6AAx1l61TsSCQKIjG6gYYs7scyDiGo8YC_qjysZkb9FLw7i3yu6z6I0nO4RnfEC5D40zJDS3a_Hp0zLpJtp7H1dFF_Pz-Mx-WNhJP2J6bI1jNoaofS8OE9vxK7Vz8tJwBqCYh0kwytzZcTzrOxXZIBlgjZNQjY3-DyFzCyuEfazzgBvMkSXDP67e82w-rN-0UesNvIIVghl5rWYXuPqo_LRoXFfgreSpdzp11dGKkE7_-uWWY',
    imageAlt: 'Vibe Meeting Room',
  },
  {
    id: '4',
    title: 'Canvas & Clay Studio',
    location: 'Daun Penh Branch',
    price: '$8.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4czZrSQQ4RwHh_cRmYORCskXCd5hiHnFAYWps5Sq7EoLlNZzm2z25xJ5yLOTjWnXUneNNHESZ48gPUYmaEvWif3wlGfyDl6ud9x5OlNHGyGPkP5jRyuFi0OHOQ5Pd8eRhd5P6ugKcZma7trvvy97GiQ8-Y3oP4fbOJCwOL4KEBWQSVZQY8WQOQ1t4PJKDPACG9P0aBVgJfAw2QklglQdh2T1sn_xmf6b6blct8fNrXmuqI_7N-w9Lwe61t5of9k-Ey_Yfg6Xc2Xk',
    imageAlt: 'Canvas & Clay Studio',
  },
  {
    id: '5',
    title: 'The Boardroom',
    location: 'Tuol Kork Branch',
    price: '$25.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA4S-VtAAM4hE6PrV2SvUBiQDH5TlOJXr_Q5oI-SsTzsNXkHA5n4GtN0plJCn5D3OzqVVaytQs0d-KVTTa3W_d5aeAqpZ50zgXgaN1U6oh0dPqMDNiHBGhcZeo9lZ4AFttklhpXYr3-dlu-sft7uTPeZkR_JExMRZcg5Jsi6DUhR8__JSVSyN2-1xvYBZh-v1MVt8EX1szouSO8d8zf3S_FlfLNX_vwxvmg45wKC-JCKQbVnjYEAbzBt5d-swhxKhiRfhnzpp6Jo0',
    imageAlt: 'The Boardroom',
  },
  {
    id: '6',
    title: 'Literary Lounge',
    location: 'BKK1 Branch',
    price: '$6.00',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwI1SUrERQ8DeQuRTBwyAtML0U0Tg47aDX3cjBAcaXIlhTkHiR8Y0occGEPIhamX9grnqZjcMJ5P4RPqdglL2GnmuYjBPvReDqayayUQcnCxIVc1Utx81mhi5M5X8AgcHNIHaoxbteCXHgkCL4bNmCp4OevbWMXsBecIh4KyW-MKn4QiPRhK8qhKg5iii_Q-u8Uig2-fgLJpPyxWTOupJBrosxlBhl5w9BvgFVAnzeRxejAFhK8F7qGUAmMHSWzB869KZUUkdX_4',
    imageAlt: 'Literary Lounge',
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
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

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {SPACES.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>

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
