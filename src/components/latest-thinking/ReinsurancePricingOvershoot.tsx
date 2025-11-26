'use client';

import React from 'react';

export default function ReinsurancePricingOvershoot() {
  return (
    <div className="antialiased bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header / Title Area */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            The Great Overshoot
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
            Why Reinsurance Pricing detached from reality—and how to fix it.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Introduction */}
        <section className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            The global insurance market is under pressure, but the story is more complex than the headlines suggest. 
            While external volatility from climate and economic factors is real, the data reveals a stark truth: 
            <strong>recent pricing has overshot actual risk requirements.</strong>
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            This "overshoot" exposes the fragility of manual pricing models and highlights the urgent need for 
            tools that adapt to data, rather than reacting to panic.
          </p>
        </section>

        {/* Timeline Chart */}
        <section className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Visualizing the Cycle
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive Chart: Hover or tap points to see details
            </p>
          </div>

          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 md:p-8 overflow-hidden">
            {/* Scroll hint for mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent md:hidden pointer-events-none z-10" />
            
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[800px]">
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm ring-2 ring-rose-100 dark:ring-rose-900"></span>
                    <span className="text-slate-600 dark:text-slate-300">Loss Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm ring-2 ring-amber-100 dark:ring-amber-900"></span>
                    <span className="text-slate-600 dark:text-slate-300">Pricing Reactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm ring-2 ring-emerald-100 dark:ring-emerald-900"></span>
                    <span className="text-slate-600 dark:text-slate-300">Financial Outcomes</span>
                  </div>
                </div>

                {/* SVG Chart */}
                <svg 
                  viewBox="0 0 1400 720" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                  style={{ fontFamily: 'inherit' }}
                >
                  {/* Background Zones */}
                  <rect x="80" y="60" width="840" height="540" fill="#fef2f2" className="dark:fill-red-900/10" rx="12" />
                  <rect x="920" y="60" width="180" height="540" fill="#fffbeb" className="dark:fill-amber-900/10" rx="12" />
                  <rect x="1100" y="60" width="260" height="540" fill="#ecfdf5" className="dark:fill-emerald-900/10" rx="12" />

                  {/* Zone Labels */}
                  <g className="section-label">
                    <rect x="400" y="70" width="200" height="36" rx="18" fill="white" stroke="#fca5a5" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-red-800" />
                    <text x="500" y="93" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="700" letterSpacing="1" className="dark:fill-red-400">CRISIS PERIOD</text>

                    <rect x="930" y="70" width="140" height="36" rx="18" fill="white" stroke="#fcd34d" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-amber-800" />
                    <text x="1000" y="93" textAnchor="middle" fill="#d97706" fontSize="13" fontWeight="700" letterSpacing="1" className="dark:fill-amber-400">HARD MARKET</text>

                    <rect x="1110" y="70" width="200" height="36" rx="18" fill="white" stroke="#6ee7b7" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-emerald-800" />
                    <text x="1210" y="93" textAnchor="middle" fill="#059669" fontSize="13" fontWeight="700" letterSpacing="1" className="dark:fill-emerald-400">CORRECTION</text>
                  </g>

                  {/* X-Axis */}
                  <g className="axis">
                    <line x1="110" y1="620" x2="1320" y2="620" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" className="dark:stroke-slate-700" />
                    {['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, i) => (
                      <g key={year} transform={`translate(${120 + i * 145}, 0)`}>
                        <line y1="615" y2="625" stroke="#94a3b8" strokeWidth="2" />
                        <text y="650" textAnchor="middle" fontSize="14" fontWeight="600" fill="#64748b" className="dark:fill-slate-400">{year}</text>
                      </g>
                    ))}
                  </g>

                  {/* Interactive Event Nodes */}
                  <g className="events">
                    {/* 2017: Hurricanes */}
                    <g className="group cursor-pointer">
                      {/* Invisible larger hit area */}
                      <circle cx="120" cy="180" r="30" fill="transparent" />
                      <line x1="120" y1="620" x2="120" y2="180" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200" />
                      <circle cx="120" cy="180" r="16" fill="#f43f5e" stroke="white" strokeWidth="4" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="20" y="90" width="200" height="70" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="120" y="115" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">Triple Hurricane Season</text>
                        <text x="120" y="135" textAnchor="middle" fontSize="12" fill="#64748b">Harvey, Irma, Maria</text>
                        <text x="120" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f43f5e">$94B Insured Loss</text>
                      </g>
                    </g>

                    {/* 2020: Covid/Cyber */}
                    <g className="group cursor-pointer">
                      <circle cx="555" cy="180" r="30" fill="transparent" />
                      <line x1="555" y1="620" x2="555" y2="180" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200" />
                      <circle cx="555" cy="180" r="16" fill="#f43f5e" stroke="white" strokeWidth="4" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="455" y="100" width="200" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="555" y="125" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">COVID-19 + Cyber Spike</text>
                        <text x="555" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f43f5e">Loss Ratio: 67%</text>
                      </g>
                    </g>

                    {/* 2022: Ian */}
                    <g className="group cursor-pointer">
                      <circle cx="845" cy="180" r="30" fill="transparent" />
                      <line x1="845" y1="620" x2="845" y2="180" stroke="#f43f5e" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200" />
                      <circle cx="845" cy="180" r="16" fill="#f43f5e" stroke="white" strokeWidth="4" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="745" y="100" width="200" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="845" y="125" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">Hurricane Ian</text>
                        <text x="845" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f43f5e">$67B Loss / Capital Dip</text>
                      </g>
                    </g>

                    {/* 2023: Rate Hike */}
                    <g className="group cursor-pointer">
                      <circle cx="990" cy="360" r="30" fill="transparent" />
                      <line x1="990" y1="620" x2="990" y2="360" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200" />
                      <circle cx="990" cy="360" r="18" fill="#f59e0b" stroke="white" strokeWidth="4" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="865" y="280" width="250" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="990" y="305" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">Jan '23: The Great Realignment</text>
                        <text x="990" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">+37% to +50% Rate Hikes</text>
                      </g>
                    </g>

                    {/* 2023: Results */}
                    <g className="group cursor-pointer">
                      <circle cx="1050" cy="480" r="30" fill="transparent" />
                      <line x1="1050" y1="620" x2="1050" y2="480" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" className="opacity-30 group-hover:opacity-100 transition-opacity duration-200" />
                      <circle cx="1050" cy="480" r="18" fill="#10b981" stroke="white" strokeWidth="4" />
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="925" y="400" width="250" height="60" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                        <text x="1050" y="425" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">2023 Profitability Boom</text>
                        <text x="1050" y="445" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">ROE: 22% (Historic High)</text>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Crisis of Overshooting */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Evidence of the Overshoot
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              The period from 2017–2022 was undeniable chaos. Catastrophe losses like Hurricane Ian ($67B) and investment volatility 
              justified a correction. However, the market's reaction in January 2023—with retrocession rates rising 50%—swung the pendulum 
              too far.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mt-4">
              The financial results for 2023 prove that pricing exceeded risk-adjusted requirements by a wide margin:
            </p>
          </div>

          {/* Performance Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full">
              <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">2023 Result</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Benchmark</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">The "Overshoot"</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Global Reinsurance ROE</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold text-lg">22.0%</td>
                  <td className="px-6 py-4 text-slate-500">8.1% - 9.5%</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-sm">
                    Profit was <span className="font-bold text-rose-500">2.5x</span> the cost of capital
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Combined Ratio</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold text-lg">95%</td>
                  <td className="px-6 py-4 text-slate-500">&lt; 100%</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-sm">
                    High underwriting profit margin
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              <strong>The Reality Check:</strong> This level of profit signals pricing that isn't just covering risk—it's actively repelling clients. 
              The market softened quickly in 2024 (dropping to 5-10% increases) because the 2023 rates were unsustainable.
            </p>
          </div>
        </section>

        {/* Section 2: Cyber Case Study */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Case Study: The Cyber Market Swing
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              Nowhere is this "panic-then-profit" cycle clearer than in Cyber insurance. After a spike in 2020 losses, 
              carriers raised rates so aggressively that the loss ratio collapsed, indicating they were charging far too much for the risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm text-center">
              <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">2020 (The Panic)</div>
              <div className="text-3xl font-bold text-red-500">67%</div>
              <div className="text-xs text-red-400 mt-1">Loss Ratio</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm text-center transform scale-105 ring-2 ring-emerald-500 dark:ring-emerald-400">
              <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">2023 (The Overshoot)</div>
              <div className="text-3xl font-bold text-emerald-600">42%</div>
              <div className="text-xs text-emerald-500 mt-1">Loss Ratio</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm text-center">
              <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">2024 (The Correction)</div>
              <div className="text-3xl font-bold text-blue-500">49%</div>
              <div className="text-xs text-blue-400 mt-1">Loss Ratio (Est.)</div>
            </div>
          </div>
        </section>

        {/* Section 3: Climate Narrative */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              The "Climate" Narrative vs. Data
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              A major justification for the 2023 price hikes was escalating climate risk. However, academic research suggests 
              we are misidentifying the culprit. The primary driver of disaster losses is not the weather itself, 
              but <strong>where and how we build.</strong>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Loss Driver</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Industry Narrative</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Research Reality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Exposure Growth
                    <span className="block text-xs font-normal text-slate-500 mt-1">Population & Wealth in high-risk zones</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Undervalued (~25%)</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold bg-emerald-50/50 dark:bg-emerald-900/20">
                    Primary Driver (~50%)
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Climate Intensity
                    <span className="block text-xs font-normal text-slate-500 mt-1">Severity of weather events</span>
                  </td>
                  <td className="px-6 py-4 text-rose-500 font-bold bg-rose-50/50 dark:bg-rose-900/20">Overweighted (~60%)</td>
                  <td className="px-6 py-4 text-slate-400">Secondary Driver (~20%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm italic">
            * By conflating exposure growth with climate change, the industry justifies higher premiums while ignoring the positive impact of modern building codes.
          </p>
        </section>

        {/* Section 4: Solution */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              The Fix: Adaptive Pricing
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-8">
              To avoid these boom-and-bust cycles, carriers must move beyond manual spreadsheets. 
              Modern pricing engines prevent overshooting by ensuring clarity, speed, and fairness.
            </p>

            <div className="grid gap-6">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Granular Transparency</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    See exactly how capital charges and margins build up the price. This stops "buffer stacking," where every department adds a safety margin until the price becomes uncompetitive.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Rapid Re-calibration</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    When loss trends shift, update assumptions instantly across the organization. No more "pricing lag" that leads to massive corrections years later.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Reward Resilience</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Easily factor in mitigation efforts (like flood defenses). This attracts better risks and incentivizes customers to protect themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-slate-900 dark:bg-black text-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
            The market winners of the next decade won't be the ones with the highest rates in a crisis—they will be the ones 
            whose pricing engines are transparent, adaptable, and rooted in reality.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
             {['Insurtech', 'Pricing Strategy', 'Actuarial Science', 'Risk Management'].map(tag => (
               <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700">
                 #{tag.replace(/\s+/g, '')}
               </span>
             ))}
          </div>
        </section>

      </main>
    </div>
  );
}
