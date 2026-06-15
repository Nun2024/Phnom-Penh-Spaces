export function HowItWorksSection() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">How It Works</h2>
        <p className="text-body-md text-on-surface-variant">Your perfect creative space is just a few clicks away.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl hover:bg-surface-container transition-colors duration-300">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl">search</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-3">1. Discover</h3>
          <p className="text-body-md text-on-surface-variant">Browse through our curated list of creative spaces across Phnom Penh.</p>
        </div>
        <div className="p-6 rounded-2xl hover:bg-surface-container transition-colors duration-300">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl">event_available</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-3">2. Book</h3>
          <p className="text-body-md text-on-surface-variant">Select your preferred date and time, and secure your booking instantly.</p>
        </div>
        <div className="p-6 rounded-2xl hover:bg-surface-container transition-colors duration-300">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-3">3. Create</h3>
          <p className="text-body-md text-on-surface-variant">Show up, get inspired, and bring your creative projects to life.</p>
        </div>
      </div>
    </section>
  );
}
