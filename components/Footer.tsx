export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sps-navy text-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                  <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">SPS Commerce</span>
            </div>
            <p className="text-xs leading-relaxed">
              Transforming retail data into decision-ready intelligence for leading brands and manufacturers.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Solutions</h4>
            <ul className="space-y-2">
              {['Analytics Platform', 'Data Integration', 'Snowflake Connector', 'Databricks Connector', 'AI-Ready Data'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Company</h4>
            <ul className="space-y-2">
              {['About SPS Commerce', 'Customers', 'Partners', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">Get Started</h4>
            <ul className="space-y-2">
              {['Request a Demo', 'Contact Sales', 'Documentation', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {year} SPS Commerce, Inc. All rights reserved. This site is a marketing showcase.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
