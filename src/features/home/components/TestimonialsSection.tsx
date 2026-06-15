export function TestimonialsSection() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-12">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">What Creators Say</h2>
          <p className="text-body-md text-on-surface-variant">Hear from the community of artists, podcasters, and professionals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-body-md text-on-surface mb-8 italic">&quot;The Sonic Wave Suite was exactly what we needed for our podcast. High-quality acoustic treatment and a super professional vibe. Will definitely book again!&quot;</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://ui-avatars.com/api/?name=Sok+Mean&amp;background=006c49&amp;color=fff" alt="Sok Mean" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-label-md text-label-md">Sok Mean</h4>
                <p className="text-label-sm text-outline">Podcast Host</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-body-md text-on-surface mb-8 italic">&quot;Finding a spacious art studio with good natural light in Phnom Penh used to be hard. Canvas &amp; Clay Studio is a game-changer for my weekend painting sessions.&quot;</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://ui-avatars.com/api/?name=Bopha+Chan&amp;background=10b981&amp;color=fff" alt="Bopha Chan" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-label-md text-label-md">Bopha Chan</h4>
                <p className="text-label-sm text-outline">Visual Artist</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 text-[#F59E0B] mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-body-md text-on-surface mb-8 italic">&quot;Our team hosted a full-day workshop at The Boardroom. The seamless AV setup and beautiful modern design really impressed our international clients.&quot;</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://ui-avatars.com/api/?name=Vireak+Rath&amp;background=a43a3a&amp;color=fff" alt="Vireak Rath" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-label-md text-label-md">Vireak Rath</h4>
                <p className="text-label-sm text-outline">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
