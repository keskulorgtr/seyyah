import RequestForm from "./RequestForm";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#0f2f35] pt-64 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Landscape Background Image */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[url('/images/footer_bg.png')] bg-cover bg-top opacity-30 mix-blend-screen"></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-[#0f2f35]/80 to-[#0f2f35]"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 mb-16">

        {/* Column 1: Request Form */}
        <div className="flex flex-col justify-start md:pr-12 md:border-r border-white/10">
          <p className="font-sans text-xs tracking-widest text-white/40 uppercase mb-6">Start Your Journey</p>
          <p className="font-sans text-xs text-white/60 leading-relaxed mb-8 max-w-sm">
            Tell us where you would like to go, and our team will help you shape a meaningful journey with the right route, timing and guidance.
          </p>
          <RequestForm />
        </div>

        {/* Column 2: Brand */}
        <div className="flex flex-col justify-start md:px-12 md:border-r border-white/10">
          <p className="font-sans text-xs tracking-widest text-white/40 uppercase mb-6">General</p>
          <div className="mb-8">
            <div className="w-8 h-8 border border-[#0C7B8A] rotate-45 mb-6" />
            <h3 className="font-serif text-2xl text-white mb-2">Seyyah Travel</h3>
            <p className="font-sans text-xs tracking-widest text-[#0C7B8A] uppercase">Authentic yet Modern</p>
          </div>
          <p className="font-sans text-xs text-white/60 leading-relaxed">
            Curating meaningful travel experiences that blend sacred routes, cultural discovery and trusted organisation.
          </p>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col justify-start md:pl-12">
          <p className="font-sans text-xs tracking-widest text-white/40 uppercase mb-6">Resources</p>
          <div>
            <p className="font-sans text-[10px] text-white/30 mb-2 uppercase tracking-widest">Verified Address</p>
            <address className="font-sans text-xs text-white/70 not-italic leading-relaxed mb-6">
              Atatürk Mahallesi, Estergon Caddesi No:24<br />
              Suryapı Exen Kule Rezidans F Blok, Daire:16<br />
              Ümraniye / İstanbul
            </address>
            <p className="font-sans text-[10px] text-white/30 mb-2 uppercase tracking-widest">Email</p>
            <a href="mailto:info@seyyah.ch" className="font-sans text-xs text-white/70 hover:text-[#0C7B8A] transition-colors">info@seyyah.ch</a>
          </div>
        </div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-[10px] tracking-widest text-white/40 uppercase">
          © 2026 Seyyah Travel &amp; Organisation. All rights reserved.
        </p>
        <div className="flex gap-6 font-sans text-[10px] tracking-widest text-white/40 uppercase">
          <a href="#" className="hover:text-[#0C7B8A] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#0C7B8A] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
