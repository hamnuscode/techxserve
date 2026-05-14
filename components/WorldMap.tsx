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
  { from: "hq",  to: "ny",      dur: 3.4 },
  { from: "hq",  to: "london",  dur: 4.0 },
  { from: "hq",  to: "lagos",   dur: 4.5 },
  { from: "dev", to: "bahrain", dur: 3.0 },
  { from: "dev", to: "dubai",   dur: 3.2 },
  { from: "dev", to: "sg",      dur: 3.8 },
  { from: "dev", to: "sydney",  dur: 4.8 },
];

function getPos(id: string) {
  return locations.find((l) => l.id === id)!;
}

function curvePath(from: string, to: string) {
  const f = getPos(from);
  const t = getPos(to);
  const mx = (f.x + t.x) / 2;
  const my = Math.min(f.y, t.y) - 60;
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
    <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl border border-border-gray shadow-sm bg-[#F3F5F8]">
      {/* Legend */}
      <div className="absolute top-3 left-4 z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red" />
          <span className="text-[9px] font-semibold text-charcoal/80">HQ + Dev Office</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A7A8A]" />
          <span className="text-[9px] text-mid-gray">Client Regions</span>
        </div>
      </div>

      <svg
        ref={ref}
        viewBox="30 28 940 400"
        className="w-full h-auto"
        aria-label="Global presence map"
      >
        <defs>
          {/* Subtle glow for beam dots */}
          <filter id="beam-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Path definitions */}
          {connections.map(({ from, to }) => (
            <path
              key={`def-${from}-${to}`}
              id={`conn-${from}-${to}`}
              d={curvePath(from, to)}
            />
          ))}
        </defs>

        {/* Ocean */}
        <rect x="0" y="0" width="1000" height="480" fill="#EBEEf4" />

        {/* ── Continents — more detailed paths ── */}
        <g fill="#D2D6E2" stroke="#BFC4D2" strokeWidth="0.6">

          {/* Alaska */}
          <path d="M 60,95 L 78,82 L 100,80 L 118,88 L 120,102 L 105,110 L 85,112 L 68,106 Z" />

          {/* North America */}
          <path d="M 100,95 L 130,80 L 162,72 L 200,62 L 245,64 L 278,78 L 305,100 L 322,128 L 325,158 L 312,195 L 295,222 L 270,228 L 248,220 L 230,228 L 210,238 L 188,228 L 165,210 L 142,198 L 118,188 L 98,172 L 88,148 Z" />

          {/* Greenland */}
          <path d="M 272,38 L 315,26 L 355,34 L 375,56 L 368,80 L 345,95 L 310,98 L 280,82 L 268,60 Z" />

          {/* Central America */}
          <path d="M 210,238 L 235,238 L 248,252 L 240,265 L 225,268 L 210,255 Z" />

          {/* South America */}
          <path d="M 205,265 L 238,252 L 278,248 L 310,255 L 328,272 L 332,305 L 320,348 L 305,390 L 285,425 L 258,438 L 232,420 L 218,388 L 212,348 L 208,308 L 210,280 Z" />

          {/* Iceland */}
          <path d="M 410,68 L 432,62 L 448,70 L 445,82 L 428,86 L 412,80 Z" />

          {/* British Isles */}
          <path d="M 452,96 L 464,90 L 474,96 L 475,110 L 465,118 L 452,112 Z" />
          <path d="M 444,108 L 452,104 L 454,115 L 446,120 L 440,114 Z" />

          {/* Scandinavia */}
          <path d="M 490,58 L 505,50 L 525,52 L 548,62 L 558,78 L 550,95 L 535,105 L 515,108 L 500,100 L 488,84 L 486,70 Z" />

          {/* Europe — with Iberian + Italian bumps */}
          <path d="M 446,108 L 470,100 L 498,95 L 530,95 L 558,100 L 568,118 L 565,138 L 548,152 L 522,162 L 495,165 L 470,162 L 452,150 L 444,132 Z" />

          {/* Iberian Peninsula */}
          <path d="M 430,128 L 458,122 L 468,135 L 464,158 L 448,168 L 430,162 L 423,148 L 425,134 Z" />

          {/* Italian Peninsula */}
          <path d="M 510,148 L 525,152 L 530,168 L 528,192 L 518,205 L 508,198 L 505,180 L 506,160 Z" />

          {/* Africa */}
          <path d="M 444,162 L 485,155 L 535,152 L 562,168 L 575,195 L 578,228 L 572,268 L 558,312 L 540,358 L 516,395 L 490,405 L 465,398 L 448,372 L 440,332 L 438,285 L 442,242 L 446,200 Z" />

          {/* Madagascar */}
          <path d="M 575,310 L 585,302 L 595,318 L 592,348 L 578,358 L 568,342 L 570,318 Z" />

          {/* Middle East */}
          <path d="M 548,150 L 578,145 L 608,148 L 632,160 L 642,182 L 635,205 L 615,215 L 588,218 L 565,205 L 552,185 L 548,165 Z" />

          {/* Asia — main body */}
          <path d="M 548,95 L 582,82 L 628,68 L 680,60 L 735,58 L 790,62 L 840,78 L 878,98 L 908,128 L 915,165 L 908,205 L 885,248 L 848,278 L 808,292 L 768,288 L 730,278 L 700,262 L 668,248 L 645,228 L 625,215 L 605,215 L 585,212 L 568,200 L 558,178 L 548,152 Z" />

          {/* India */}
          <path d="M 638,185 L 668,178 L 698,180 L 716,200 L 718,228 L 708,255 L 692,272 L 672,275 L 652,252 L 640,225 L 635,200 Z" />

          {/* Sri Lanka */}
          <path d="M 690,278 L 698,272 L 703,282 L 698,292 L 690,288 Z" />

          {/* SE Asia */}
          <path d="M 718,265 L 755,255 L 790,262 L 808,282 L 802,305 L 778,312 L 748,308 L 722,292 Z" />

          {/* Korean peninsula */}
          <path d="M 830,128 L 848,122 L 862,135 L 858,152 L 842,158 L 828,148 Z" />

          {/* Japan */}
          <path d="M 858,118 L 878,112 L 892,122 L 898,138 L 888,152 L 872,158 L 858,148 L 852,132 Z" />
          <path d="M 875,162 L 885,158 L 892,168 L 888,180 L 878,182 L 872,172 Z" />

          {/* Australia */}
          <path d="M 752,328 L 808,312 L 862,312 L 905,332 L 922,362 L 918,398 L 895,422 L 848,428 L 798,425 L 758,415 L 738,388 L 742,358 L 748,338 Z" />

          {/* Tasmania */}
          <path d="M 828,435 L 842,430 L 850,440 L 845,452 L 830,452 L 824,442 Z" />

          {/* New Zealand north */}
          <path d="M 928,368 L 942,360 L 952,372 L 948,388 L 935,392 L 924,382 Z" />
          {/* New Zealand south */}
          <path d="M 935,395 L 948,390 L 955,405 L 950,422 L 936,428 L 928,415 Z" />
        </g>

        {/* ── Base connection lines ── */}
        {connections.map(({ from, to }) => (
          <use
            key={`base-${from}-${to}`}
            href={`#conn-${from}-${to}`}
            fill="none"
            stroke="#CC0000"
            strokeWidth="0.7"
            opacity={visible ? 0.14 : 0}
            style={{ transition: "opacity 1.2s ease" }}
          />
        ))}

        {/* ── Animated beam dots — single clean dot per route ── */}
        {visible && connections.map(({ from, to, dur }, i) => (
          <g key={`beam-${from}-${to}`}>
            <circle r="2" fill="#CC0000" opacity="0.85" filter="url(#beam-glow)">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                begin={`${i * 0.7}s`}
              >
                <mpath href={`#conn-${from}-${to}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ── Location dots ── */}
        {locations.map((loc, idx) => {
          const isMain = loc.type === "hq" || loc.type === "office";
          const r = isMain ? 4 : 2.5;
          const color = isMain ? "#CC0000" : "#7A7A8A";
          return (
            <g key={loc.id}>
              {/* Single subtle pulse — HQ/office only */}
              {isMain && visible && (
                <circle cx={loc.x} cy={loc.y} r="4" fill={color} opacity="0">
                  <animate attributeName="r" values="4;11;4" dur="3.5s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                  <animate attributeName="opacity" values="0.14;0;0.14" dur="3.5s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                </circle>
              )}

              <circle
                cx={loc.x}
                cy={loc.y}
                r={r}
                fill={color}
                opacity={visible ? (isMain ? 0.95 : 0.65) : 0}
                style={{ transition: `opacity 0.5s ease ${idx * 80}ms` }}
              />

              {isMain && (
                <text
                  x={loc.x + 7}
                  y={loc.y + 1}
                  fontSize="6.5"
                  fontWeight="600"
                  fill={color}
                  opacity={visible ? 0.85 : 0}
                  style={{ transition: "opacity 0.6s ease 800ms" }}
                  fontFamily="Inter, sans-serif"
                >
                  {loc.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Stat overlays — repositioned for cropped viewBox */}
        {visible && (
          <g>


            <rect x="826" y="368" width="136" height="46" rx="7" fill="white" opacity="0.9" />
            <text x="840" y="384" fontSize="7" fill="#888" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.08em">SATISFACTION</text>
            <text x="840" y="400" fontSize="13" fill="#111" fontFamily="Inter, sans-serif" fontWeight="800">98% Rate</text>
            <text x="840" y="410" fontSize="7" fill="#CC0000" fontFamily="Inter, sans-serif" fontWeight="600">Since 2022</text>
          </g>
        )}
      </svg>
    </div>
  );
}
