// src/components/latest-thinking/ReinsurancePricingOvershoot.tsx
'use client';

import React from 'react';

export default function ReinsurancePricingOvershoot() {
  return (
    <div className="antialiased bg-[var(--paper)] text-[var(--sumi)] font-serif">
      
      {/* Introduction */}
      <section className="max-w-3xl mx-auto space-y-6">
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)]">
          The global insurance market is under pressure, but the story is more complex than the headlines suggest. 
          While external volatility from climate and economic factors is real, the data reveals a stark truth: 
          <strong className="font-medium text-[var(--vermilion)]"> recent pricing has overshot actual risk requirements.</strong>
        </p>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi-2)]">
          This "overshoot" exposes the fragility of manual pricing models and highlights the urgent need for 
          tools that adapt to data, rather than reacting to panic.
        </p>
      </section>

      {/* Timeline Chart */}
      <section className="space-y-6 my-12">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h2 className="heading-2 font-serif font-light text-[var(--sumi)]">
            Visualizing the Cycle
          </h2>
          <p className="label-mono text-[11px] text-[var(--sumi-3)]">
            Interactive Chart: Hover points to view historical details
          </p>
        </div>

        <div className="relative bg-[var(--paper-deep)] border border-[var(--paper-edge)] rounded-[2px] p-4 md:p-8 overflow-hidden">
          
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 label-mono text-[11px] text-[var(--sumi-2)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[var(--vermilion)]"></span>
                  <span>Loss Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[var(--sumi-2)]"></span>
                  <span>Pricing Reactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[var(--bottle)]"></span>
                  <span>Financial Outcomes</span>
                </div>
              </div>

              {/* SVG Chart */}
              <svg 
                viewBox="0 0 1400 720" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-[var(--sumi)]"
                style={{ fontFamily: 'inherit' }}
              >
                {/* Background Zones */}
                <rect x="80" y="60" width="840" height="540" fill="var(--paper)" stroke="var(--paper-edge)" strokeWidth="1" rx="2" />
                <rect x="920" y="60" width="180" height="540" fill="var(--bottle-soft)" stroke="var(--paper-edge)" strokeWidth="1" rx="2" />
                <rect x="1100" y="60" width="260" height="540" fill="var(--paper)" stroke="var(--paper-edge)" strokeWidth="1" rx="2" />

                {/* Zone Labels */}
                <g className="label-mono text-[11px]">
                  <rect x="400" y="70" width="200" height="36" rx="2" fill="var(--paper-deep)" stroke="var(--rule)" strokeWidth="1" />
                  <text x="500" y="93" textAnchor="middle" fill="var(--vermilion)" fontSize="11" fontWeight="600" letterSpacing="1">CRISIS PERIOD</text>

                  <rect x="930" y="70" width="140" height="36" rx="2" fill="var(--paper-deep)" stroke="var(--rule)" strokeWidth="1" />
                  <text x="1000" y="93" textAnchor="middle" fill="var(--sumi)" fontSize="11" fontWeight="600" letterSpacing="1">HARD MARKET</text>

                  <rect x="1110" y="70" width="200" height="36" rx="2" fill="var(--paper-deep)" stroke="var(--rule)" strokeWidth="1" />
                  <text x="1210" y="93" textAnchor="middle" fill="var(--bottle)" fontSize="11" fontWeight="600" letterSpacing="1">CORRECTION</text>
                </g>

                {/* X-Axis */}
                <g className="label-mono text-[12px]">
                  <line x1="110" y1="620" x2="1320" y2="620" stroke="var(--sumi-3)" strokeWidth="1" />
                  {['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, i) => (
                    <g key={year} transform={`translate(${120 + i * 145}, 0)`}>
                      <line y1="615" y2="625" stroke="var(--sumi-3)" strokeWidth="1" />
                      <text y="650" textAnchor="middle" fill="var(--sumi-3)" fontSize="12">{year}</text>
                    </g>
                  ))}
                </g>

                {/* Interactive Event Nodes */}
                <g className="events">
                  {/* 2017: Hurricanes */}
                  <g className="group cursor-pointer">
                    <circle cx="120" cy="180" r="30" fill="transparent" />
                    <line x1="120" y1="620" x2="120" y2="180" stroke="var(--vermilion)" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    <circle cx="120" cy="180" r="12" fill="var(--paper)" stroke="var(--vermilion)" strokeWidth="2" />
                    <circle cx="120" cy="180" r="4" fill="var(--vermilion)" />
                    
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect x="20" y="90" width="200" height="70" rx="2" fill="var(--paper-deep)" stroke="var(--sumi)" strokeWidth="1" />
                      <text x="120" y="115" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--sumi)">Triple Hurricane Season</text>
                      <text x="120" y="133" textAnchor="middle" fontSize="11" fill="var(--sumi-2)">Harvey, Irma, Maria</text>
                      <text x="120" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--vermilion)">$94B Insured Loss</text>
                    </g>
                  </g>

                  {/* 2020: Covid/Cyber */}
                  <g className="group cursor-pointer">
                    <circle cx="555" cy="180" r="30" fill="transparent" />
                    <line x1="555" y1="620" x2="555" y2="180" stroke="var(--vermilion)" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    <circle cx="555" cy="180" r="12" fill="var(--paper)" stroke="var(--vermilion)" strokeWidth="2" />
                    <circle cx="555" cy="180" r="4" fill="var(--vermilion)" />
                    
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect x="455" y="100" width="200" height="60" rx="2" fill="var(--paper-deep)" stroke="var(--sumi)" strokeWidth="1" />
                      <text x="555" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--sumi)">COVID-19 + Cyber Spike</text>
                      <text x="555" y="145" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--vermilion)">Loss Ratio: 67%</text>
                    </g>
                  </g>

                  {/* 2022: Ian */}
                  <g className="group cursor-pointer">
                    <circle cx="845" cy="180" r="30" fill="transparent" />
                    <line x1="845" y1="620" x2="845" y2="180" stroke="var(--vermilion)" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    <circle cx="845" cy="180" r="12" fill="var(--paper)" stroke="var(--vermilion)" strokeWidth="2" />
                    <circle cx="845" cy="180" r="4" fill="var(--vermilion)" />
                    
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect x="745" y="100" width="200" height="60" rx="2" fill="var(--paper-deep)" stroke="var(--sumi)" strokeWidth="1" />
                      <text x="845" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--sumi)">Hurricane Ian</text>
                      <text x="845" y="145" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--vermilion)">$67B Loss / Capital Dip</text>
                    </g>
                  </g>

                  {/* 2023: Rate Hike */}
                  <g className="group cursor-pointer">
                    <circle cx="990" cy="360" r="30" fill="transparent" />
                    <line x1="990" y1="620" x2="990" y2="360" stroke="var(--sumi)" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    <circle cx="990" cy="360" r="12" fill="var(--paper)" stroke="var(--sumi)" strokeWidth="2" />
                    <circle cx="990" cy="360" r="4" fill="var(--sumi)" />
                    
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect x="865" y="280" width="250" height="60" rx="2" fill="var(--paper-deep)" stroke="var(--sumi)" strokeWidth="1" />
                      <text x="990" y="305" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--sumi)">Jan '23: The Realignment</text>
                      <text x="990" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--vermilion)">+37% to +50% Rate Hikes</text>
                    </g>
                  </g>

                  {/* 2023: Results */}
                  <g className="group cursor-pointer">
                    <circle cx="1050" cy="480" r="30" fill="transparent" />
                    <line x1="1050" y1="620" x2="1050" y2="480" stroke="var(--bottle)" strokeWidth="1" strokeDasharray="3 3" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    <circle cx="1050" cy="480" r="12" fill="var(--paper)" stroke="var(--bottle)" strokeWidth="2" />
                    <circle cx="1050" cy="480" r="4" fill="var(--bottle)" />
                    
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect x="925" y="400" width="250" height="60" rx="2" fill="var(--paper-deep)" stroke="var(--sumi)" strokeWidth="1" />
                      <text x="1050" y="425" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--sumi)">2023 Profitability Boom</text>
                      <text x="1050" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--bottle)">ROE: 22% (Historic High)</text>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Crisis of Overshooting */}
      <section className="max-w-3xl mx-auto space-y-6">
        <h2 className="heading-2 font-serif text-[var(--sumi)] font-light mt-10">
          Evidence of the Overshoot
        </h2>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)]">
          The period from 2017–2022 was undeniable chaos. Catastrophe losses like Hurricane Ian ($67B) and investment volatility 
          justified a correction. However, the market's reaction in January 2023—with retrocession rates rising 50%—swung the pendulum 
          too far.
        </p>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi-2)]">
          The financial results for 2023 prove that pricing exceeded risk-adjusted requirements by a wide margin:
        </p>

        {/* Performance Table (Manuscript Style) */}
        <div className="border border-[var(--paper-edge)] rounded-[2px] overflow-hidden my-8 bg-[var(--paper-deep)]">
          <table className="min-w-full border-collapse">
            <thead className="border-b border-[var(--rule)] bg-[var(--paper)]">
              <tr className="label-mono text-[11px] text-[var(--sumi-2)]">
                <th className="px-6 py-4 text-left font-medium">Metric</th>
                <th className="px-6 py-4 text-left font-medium">2023 Result</th>
                <th className="px-6 py-4 text-left font-medium">Benchmark</th>
                <th className="px-6 py-4 text-left font-medium">The "Overshoot"</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--paper-edge)] font-serif text-[15px]">
              <tr>
                <td className="px-6 py-4 font-medium text-[var(--sumi)]">Global Reinsurance ROE</td>
                <td className="px-6 py-4 text-[var(--vermilion)] font-semibold text-base">22.0%</td>
                <td className="px-6 py-4 text-[var(--sumi-3)]">8.1% - 9.5%</td>
                <td className="px-6 py-4 text-[var(--sumi-2)]">
                  Profit was <span className="font-semibold text-[var(--vermilion)]">2.5x</span> the cost of capital
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-[var(--sumi)]">Combined Ratio</td>
                <td className="px-6 py-4 text-[var(--bottle)] font-semibold text-base">95%</td>
                <td className="px-6 py-4 text-[var(--sumi-3)]">&lt; 100%</td>
                <td className="px-6 py-4 text-[var(--sumi-2)]">
                  High underwriting profit margin
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-l-2 border-[var(--vermilion)] pl-6 py-2 my-6">
          <p className="font-serif text-[16px] italic text-[var(--sumi-2)]">
            <strong>The Reality Check:</strong> This level of profit signals pricing that isn't just covering risk—it's actively repelling clients. 
            The market softened quickly in 2024 (dropping to 5-10% increases) because the 2023 rates were unsustainable.
          </p>
        </div>
      </section>

      {/* Section 2: Cyber Case Study */}
      <section className="max-w-3xl mx-auto space-y-6 my-12">
        <h2 className="heading-2 font-serif text-[var(--sumi)] font-light">
          Case Study: The Cyber Market Swing
        </h2>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)]">
          Nowhere is this "panic-then-profit" cycle clearer than in Cyber insurance. After a spike in 2020 losses, 
          carriers raised rates so aggressively that the loss ratio collapsed, indicating they were charging far too much for the risk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="bg-[var(--paper-deep)] p-6 rounded-[2px] border border-[var(--paper-edge)] text-center space-y-2">
            <div className="label-mono text-[10px] text-[var(--sumi-3)]">2020 (The Panic)</div>
            <div className="text-3xl font-serif font-light text-[var(--vermilion)]">67%</div>
            <div className="label-mono text-[9px] text-[var(--sumi-3)]">Loss Ratio</div>
          </div>
          <div className="bg-[var(--paper)] p-6 rounded-[2px] border border-[var(--vermilion)] text-center space-y-2 transform md:scale-105">
            <div className="label-mono text-[10px] text-[var(--vermilion)] font-medium">2023 (The Overshoot)</div>
            <div className="text-3xl font-serif font-semibold text-[var(--vermilion)]">42%</div>
            <div className="label-mono text-[9px] text-[var(--sumi-3)]">Loss Ratio</div>
          </div>
          <div className="bg-[var(--paper-deep)] p-6 rounded-[2px] border border-[var(--paper-edge)] text-center space-y-2">
            <div className="label-mono text-[10px] text-[var(--sumi-3)]">2024 (The Correction)</div>
            <div className="text-3xl font-serif font-light text-[var(--bottle)]">49%</div>
            <div className="label-mono text-[9px] text-[var(--sumi-3)]">Loss Ratio (Est.)</div>
          </div>
        </div>
      </section>

      {/* Section 3: Climate Narrative */}
      <section className="max-w-3xl mx-auto space-y-6 my-12">
        <h2 className="heading-2 font-serif text-[var(--sumi)] font-light">
          The "Climate" Narrative vs. Data
        </h2>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi)]">
          A major justification for the 2023 price hikes was escalating climate risk. However, academic research suggests 
          we are misidentifying the culprit. The primary driver of disaster losses is not the weather itself, 
          but <strong className="font-medium text-[var(--sumi)]">where and how we build.</strong>
        </p>

        <div className="border border-[var(--paper-edge)] rounded-[2px] overflow-hidden my-6 bg-[var(--paper-deep)]">
          <table className="min-w-full border-collapse text-left">
            <thead className="border-b border-[var(--rule)] bg-[var(--paper)]">
              <tr className="label-mono text-[11px] text-[var(--sumi-2)]">
                <th className="px-6 py-4 font-medium">Loss Driver</th>
                <th className="px-6 py-4 font-medium">Industry Narrative</th>
                <th className="px-6 py-4 font-medium">Research Reality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--paper-edge)] font-serif text-[15px]">
              <tr className="hover:bg-[var(--paper)] transition-colors">
                <td className="px-6 py-4 font-medium text-[var(--sumi)]">
                  Exposure Growth
                  <span className="block label-mono text-[9px] text-[var(--sumi-3)] mt-1">Population & Wealth in high-risk zones</span>
                </td>
                <td className="px-6 py-4 text-[var(--sumi-3)]">Undervalued (~25%)</td>
                <td className="px-6 py-4 text-[var(--bottle)] font-semibold">
                  Primary Driver (~50%)
                </td>
              </tr>
              <tr className="hover:bg-[var(--paper)] transition-colors">
                <td className="px-6 py-4 font-medium text-[var(--sumi)]">
                  Climate Intensity
                  <span className="block label-mono text-[9px] text-[var(--sumi-3)] mt-1">Severity of weather events</span>
                </td>
                <td className="px-6 py-4 text-[var(--vermilion)] font-semibold">Overweighted (~60%)</td>
                <td className="px-6 py-4 text-[var(--sumi-3)]">Secondary Driver (~20%)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="font-serif text-[14px] text-[var(--sumi-3)] italic">
          * By conflating exposure growth with climate change, the industry justifies higher premiums while ignoring the positive impact of modern building codes.
        </p>
      </section>

      {/* Section 4: Solution */}
      <section className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-[var(--rule)]">
        <h2 className="heading-2 font-serif text-[var(--sumi)] font-light">
          The Fix: Adaptive Pricing
        </h2>
        <p className="font-serif text-[17px] leading-[1.65] text-[var(--sumi-2)] mb-8">
          To avoid these boom-and-bust cycles, carriers must move beyond manual spreadsheets. 
          Modern pricing engines prevent overshooting by ensuring clarity, speed, and fairness.
        </p>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="flex gap-4 items-start p-4 border border-transparent hover:border-[var(--paper-edge)] rounded-[2px] transition-all">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--sumi)] text-[var(--sumi)] font-mono text-xs uppercase">
              1
            </div>
            <div>
              <h3 className="font-serif font-medium text-[var(--sumi)] text-lg">Granular Transparency</h3>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] mt-1 leading-relaxed">
                See exactly how capital charges and margins build up the price. This stops "buffer stacking," where every department adds a safety margin until the price becomes uncompetitive.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4 items-start p-4 border border-transparent hover:border-[var(--paper-edge)] rounded-[2px] transition-all">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--sumi)] text-[var(--sumi)] font-mono text-xs uppercase">
              2
            </div>
            <div>
              <h3 className="font-serif font-medium text-[var(--sumi)] text-lg">Rapid Re-calibration</h3>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] mt-1 leading-relaxed">
                When loss trends shift, update assumptions instantly across the organization. No more "pricing lag" that leads to massive corrections years later.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4 items-start p-4 border border-transparent hover:border-[var(--paper-edge)] rounded-[2px] transition-all">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--sumi)] text-[var(--sumi)] font-mono text-xs uppercase">
              3
            </div>
            <div>
              <h3 className="font-serif font-medium text-[var(--sumi)] text-lg">Reward Resilience</h3>
              <p className="font-serif text-[15px] text-[var(--sumi-2)] mt-1 leading-relaxed">
                Easily factor in mitigation efforts (like flood defenses). This attracts better risks and incentivizes customers to protect themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-[var(--bottle)] text-[var(--paper)] rounded-[2px] p-8 md:p-12 text-center max-w-4xl mx-auto my-12 transition-colors">
        <p className="font-serif font-light text-[19px] leading-relaxed mb-6">
          The market winners of the next decade won't be the ones with the highest rates in a crisis—they will be the ones 
          whose pricing engines are transparent, adaptable, and rooted in reality.
        </p>
        <div className="flex flex-wrap justify-center gap-3 label-mono text-[9px] text-[var(--paper-edge)]">
          {['Insurtech', 'Pricing Strategy', 'Actuarial Science', 'Risk Management'].map(tag => (
            <span key={tag} className="px-2.5 py-0.5 border border-[var(--bottle-deep)] rounded-[1px] bg-[var(--bottle-deep)]">
              #{tag.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
