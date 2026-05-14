"use client";

import { useEffect, useRef, useState } from "react";

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

const connections = [
  { from: "hq",  to: "ny",      dur: 3.2 },
  { from: "hq",  to: "london",  dur: 3.6 },
  { from: "hq",  to: "lagos",   dur: 4.0 },
  { from: "dev", to: "bahrain", dur: 2.8 },
  { from: "dev", to: "dubai",   dur: 3.0 },
  { from: "dev", to: "sg",      dur: 3.4 },
  { from: "dev", to: "sydney",  dur: 4.2 },
];

function getPos(id: string) {
  return locations.find((l) => l.id === id)!;
}

function curvePath(from: string, to: string) {
  const f = getPos(from);
  const t = getPos(to);
  const mx = (f.x + t.x) / 2;
  const my = Math.min(f.y, t.y) - 70;
  return `M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`;
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
    <div className="relative w-full overflow-hidden rounded-3xl border border-border-gray shadow-md bg-[#F2F4F7]">
      {/* Legend */}
      <div className="absolute top-4 left-5 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(204,0,0,0.6)]" />
          <span className="text-[10px] font-semibold text-charcoal">Headquarters + Dev Office</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-charcoal/40" />
          <span className="text-[10px] text-mid-gray">Active Client Regions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-brand-red/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          <span className="text-[10px] text-mid-gray">Live Signal</span>
        </div>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 1000 480"
        className="w-full h-auto"
        aria-label="Global presence map"
      >
        <defs>
          {/* Glow filter for beam dots */}
          <filter id="beam-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sharper glow for main HQ dots */}
          <filter id="hq-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path definitions for animateMotion */}
          {connections.map(({ from, to }) => (
            <path
              key={`def-${from}-${to}`}
              id={`conn-${from}-${to}`}
              d={curvePath(from, to)}
            />
          ))}
        </defs>

        {/* Ocean */}
        <rect width="1000" height="480" fill="#EEF1F6" />

        {/* Continents */}
        <g fill="#D8DCE6" stroke="#C8CDD8" strokeWidth="0.8">
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
          {/* Asia */}
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

        {/* ── Base connection lines (faint) ── */}
        {connections.map(({ from, to }) => (
          <use
            key={`base-${from}-${to}`}
            href={`#conn-${from}-${to}`}
            fill="none"
            stroke="#CC0000"
            strokeWidth="0.8"
            opacity={visible ? 0.18 : 0}
            style={{ transition: "opacity 1s ease" }}
          />
        ))}

        {/* ── Animated beam dots ── */}
        {visible && connections.map(({ from, to, dur }, i) => (
          <g key={`beam-${from}-${to}`}>
            {/* Outer glow halo */}
            <circle r="6" fill="#CC0000" opacity="0.18" filter="url(#beam-glow)">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.55}s`}
              >
                <mpath href={`#conn-${from}-${to}`} />
              </animateMotion>
            </circle>

            {/* Main bright dot */}
            <circle r="2.8" fill="#CC0000" opacity="0.95" filter="url(#beam-glow)">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.55}s`}
              >
                <mpath href={`#conn-${from}-${to}`} />
              </animateMotion>
            </circle>

            {/* Second pulse — offset by 1/3 of duration */}
            <circle r="1.8" fill="#FF5555" opacity="0.55">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.55 + dur / 2.5}s`}
              >
                <mpath href={`#conn-${from}-${to}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ── Location dots ── */}
        {locations.map((loc, idx) => {
          const isMain = loc.type === "hq" || loc.type === "office";
          const r = isMain ? 5 : 3;
          const color = isMain ? "#CC0000" : "#7A7A8A";
          return (
            <g key={loc.id}>
              {isMain && visible && (
                <>
                  <circle cx={loc.x} cy={loc.y} r="20" fill={color} opacity="0">
                    <animate attributeName="r" values="6;22;6" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.22;0;0.22" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={loc.x} cy={loc.y} r="12" fill={color} opacity="0">
                    <animate attributeName="r" values="4;14;4" dur="2.8s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.28;0;0.28" dur="2.8s" begin="0.4s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle
                cx={loc.x}
                cy={loc.y}
                r={r}
                fill={color}
                filter={isMain ? "url(#hq-glow)" : undefined}
                opacity={visible ? (isMain ? 1 : 0.75) : 0}
                style={{ transition: `opacity 0.5s ease ${idx * 100}ms` }}
              />
              {isMain && (
                <text
                  x={loc.x + 8}
                  y={loc.y + 1}
                  fontSize="7"
                  fontWeight="700"
                  fill={color}
                  opacity={visible ? 0.9 : 0}
                  style={{ transition: "opacity 0.6s ease 900ms" }}
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
            <rect x="10" y="418" width="150" height="54" rx="9" fill="white" opacity="0.92" />
            <text x="24" y="437" fontSize="7.5" fill="#888" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.08em">GLOBAL REACH</text>
            <text x="24" y="455" fontSize="15" fill="#111" fontFamily="Inter, sans-serif" fontWeight="800">15+ Countries</text>
            <text x="24" y="466" fontSize="7.5" fill="#CC0000" fontFamily="Inter, sans-serif" fontWeight="600">25+ Active Clients</text>

            <rect x="838" y="418" width="150" height="54" rx="9" fill="white" opacity="0.92" />
            <text x="852" y="437" fontSize="7.5" fill="#888" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.08em">SATISFACTION</text>
            <text x="852" y="455" fontSize="15" fill="#111" fontFamily="Inter, sans-serif" fontWeight="800">98% Rate</text>
            <text x="852" y="466" fontSize="7.5" fill="#CC0000" fontFamily="Inter, sans-serif" fontWeight="600">Since 2022</text>
          </g>
        )}
      </svg>
    </div>
  );
}
