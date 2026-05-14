"use client";

import { useEffect, useRef, useState } from "react";

// Simplified Mercator: x = (lng+180)/360*1000, y = (90-lat)/180*500
const locations = [
  { id: "hq",      label: "HQ — Sheridan, WY", x: 202, y: 124, type: "hq"     },
  { id: "dev",     label: "Dev — Islamabad",    x: 703, y: 155, type: "office" },
  { id: "bahrain", label: "Bahrain",             x: 638, y: 177, type: "client" },
  { id: "london",  label: "London",              x: 498, y: 107, type: "client" },
  { id: "dubai",   label: "Dubai",               x: 650, y: 182, type: "client" },
  { id: "ny",      label: "New York",            x: 293, y: 134, type: "client" },
  { id: "lagos",   label: "Lagos",               x: 505, y: 232, type: "client" },
  { id: "sydney",  label: "Sydney",              x: 880, y: 348, type: "client" },
  { id: "sg",      label: "Singapore",           x: 775, y: 264, type: "client" },
];

// Connection paths from HQ (202,124) and Dev (703,155) to clients
const connections = [
  { from: "hq",  to: "ny"      },
  { from: "hq",  to: "london"  },
  { from: "hq",  to: "lagos"   },
  { from: "dev", to: "bahrain" },
  { from: "dev", to: "dubai"   },
  { from: "dev", to: "sg"      },
  { from: "dev", to: "sydney"  },
];

function getPos(id: string) {
  return locations.find((l) => l.id === id)!;
}

export default function WorldMap() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#F9F9F9] border border-border-gray shadow-md">
      {/* Labels overlay */}
      <div className="absolute top-4 left-5 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(204,0,0,0.6)]" />
          <span className="text-[10px] font-semibold text-charcoal">Headquarters + Dev Office</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-charcoal/50" />
          <span className="text-[10px] text-mid-gray">Active Client Regions</span>
        </div>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 1000 480"
        className="w-full h-auto"
        aria-label="Global presence map"
      >
        {/* Ocean bg */}
        <rect width="1000" height="480" fill="#F4F4F6" />

        {/* ── Continent paths (simplified Mercator) ── */}
        <g fill="#E0E0E3" stroke="#D0D0D5" strokeWidth="0.8">

          {/* North America */}
          <path d="M 60,115 L 105,85 L 135,90 L 170,78 L 205,65 L 250,68 L 285,85 L 310,110 L 330,145 L 315,200 L 290,230 L 260,215 L 230,215 L 218,230 L 195,240 L 170,220 L 150,200 L 125,188 L 98,175 Z" />

          {/* Greenland */}
          <path d="M 268,42 L 320,28 L 360,38 L 372,62 L 350,90 L 308,96 L 278,78 Z" />

          {/* South America */}
          <path d="M 200,242 L 240,232 L 295,235 L 322,255 L 325,295 L 308,355 L 285,418 L 255,440 L 228,412 L 215,362 L 210,310 L 215,270 Z" />

          {/* Europe */}
          <path d="M 448,95 L 478,88 L 513,82 L 545,88 L 560,105 L 558,130 L 540,152 L 508,165 L 472,162 L 450,145 L 442,122 Z" />

          {/* British Isles */}
          <path d="M 455,98 L 468,92 L 472,105 L 462,115 L 453,110 Z" />

          {/* Africa */}
          <path d="M 446,158 L 536,153 L 565,172 L 580,215 L 570,290 L 550,360 L 510,400 L 478,398 L 458,372 L 448,308 L 446,248 L 452,200 Z" />

          {/* Middle East */}
          <path d="M 548,152 L 600,148 L 628,162 L 638,192 L 625,215 L 590,220 L 562,205 L 552,178 Z" />

          {/* Asia (main) */}
          <path d="M 548,95 L 590,85 L 645,68 L 700,62 L 770,65 L 830,88 L 880,105 L 915,135 L 918,200 L 888,255 L 845,282 L 800,292 L 755,285 L 718,272 L 680,255 L 645,232 L 622,215 L 600,215 L 580,215 L 563,200 L 555,175 L 548,148 Z" />

          {/* India */}
          <path d="M 635,190 L 670,182 L 700,185 L 715,205 L 715,240 L 695,268 L 672,270 L 652,248 L 638,218 Z" />

          {/* SE Asia */}
          <path d="M 718,265 L 762,258 L 790,270 L 805,295 L 785,308 L 750,305 L 722,290 Z" />

          {/* Japan */}
          <path d="M 855,142 L 880,136 L 892,152 L 888,172 L 868,175 L 852,160 Z" />

          {/* Australia */}
          <path d="M 748,332 L 818,315 L 875,318 L 908,342 L 918,385 L 882,415 L 830,418 L 778,415 L 748,388 Z" />

          {/* New Zealand */}
          <path d="M 930,378 L 948,370 L 952,395 L 935,408 L 922,398 Z" />

        </g>

        {/* ── Connection lines ── */}
        {visible && connections.map(({ from, to }, i) => {
          const f = getPos(from);
          const t = getPos(to);
          // Curved path using quadratic bezier
          const mx = (f.x + t.x) / 2;
          const my = Math.min(f.y, t.y) - 50;
          return (
            <path
              key={`${from}-${to}`}
              d={`M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`}
              fill="none"
              stroke="#CC0000"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="map-line"
              style={{ animationDelay: `${i * 200}ms` }}
              opacity="0.3"
            />
          );
        })}

        {/* ── Location dots ── */}
        {locations.map((loc) => {
          const isMain = loc.type === "hq" || loc.type === "office";
          const r = isMain ? 5 : 3.5;
          const color = loc.type === "hq" ? "#CC0000" : loc.type === "office" ? "#CC0000" : "#555";

          return (
            <g key={loc.id}>
              {isMain && visible && (
                <>
                  <circle cx={loc.x} cy={loc.y} r="14" fill={color} opacity="0.1">
                    <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.18;0;0.18" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={loc.x} cy={loc.y} r="9" fill={color} opacity="0.15">
                    <animate attributeName="r" values="5;12;5" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              <circle
                cx={loc.x}
                cy={loc.y}
                r={r}
                fill={color}
                opacity={visible ? 0.9 : 0}
                style={{ transition: `opacity 0.5s ease ${locations.indexOf(loc) * 120}ms` }}
              />

              {/* Label (only for main ones on larger screens) */}
              {isMain && (
                <text
                  x={loc.x + 8}
                  y={loc.y + 1}
                  fontSize="7"
                  fontWeight="600"
                  fill={color}
                  opacity={visible ? 0.9 : 0}
                  style={{ transition: `opacity 0.5s ease 800ms` }}
                  fontFamily="Inter, sans-serif"
                >
                  {loc.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Stat overlays */}
        {visible && (
          <g>
            <rect x="10" y="418" width="148" height="52" rx="8" fill="white" opacity="0.9" />
            <text x="24" y="436" fontSize="8" fill="#888" fontFamily="Inter, sans-serif" fontWeight="500">GLOBAL REACH</text>
            <text x="24" y="454" fontSize="14" fill="#111" fontFamily="Inter, sans-serif" fontWeight="800">15+ Countries</text>
            <text x="24" y="464" fontSize="8" fill="#CC0000" fontFamily="Inter, sans-serif">25+ Active Clients</text>

            <rect x="840" y="418" width="148" height="52" rx="8" fill="white" opacity="0.9" />
            <text x="854" y="436" fontSize="8" fill="#888" fontFamily="Inter, sans-serif" fontWeight="500">SATISFACTION</text>
            <text x="854" y="454" fontSize="14" fill="#111" fontFamily="Inter, sans-serif" fontWeight="800">98% Rate</text>
            <text x="854" y="464" fontSize="8" fill="#CC0000" fontFamily="Inter, sans-serif">Since 2022</text>
          </g>
        )}
      </svg>
    </div>
  );
}
