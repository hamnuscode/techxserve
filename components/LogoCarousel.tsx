"use client";

const clients = [
  { name: "ISPR",             abbr: "IS" },
  { name: "Xephra",           abbr: "XP" },
  { name: "BHTD",             abbr: "BH" },
  { name: "Police Foundation",abbr: "PF" },
  { name: "FinTech Co.",      abbr: "FT" },
  { name: "LogiCore",         abbr: "LC" },
  { name: "EduSpark",         abbr: "ES" },
  { name: "PropNest",         abbr: "PN" },
  { name: "RetailX",          abbr: "RX" },
];

const accentColors = [
  "bg-blue-100   text-blue-700",
  "bg-green-100  text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-sky-100    text-sky-700",
  "bg-pink-100   text-pink-700",
  "bg-amber-100  text-amber-700",
  "bg-teal-100   text-teal-700",
  "bg-red-100    text-red-700",
];

function LogoItem({ name, abbr, colorIdx }: { name: string; abbr: string; colorIdx: number }) {
  const color = accentColors[colorIdx % accentColors.length];
  return (
    <div className="flex items-center gap-3 mx-6 px-5 py-3 bg-white rounded-xl border border-border-gray hover:border-brand-red/25 hover:shadow-sm transition-all duration-300 cursor-default group">
      <span className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-[11px] font-black shrink-0`}>
        {abbr}
      </span>
      <span className="text-sm font-semibold text-charcoal whitespace-nowrap group-hover:text-brand-red transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function LogoCarousel() {
  const doubled = [...clients, ...clients];
  return (
    <div className="overflow-hidden w-full select-none">
      <div className="carousel-track">
        {doubled.map((c, i) => (
          <LogoItem key={i} name={c.name} abbr={c.abbr} colorIdx={i % clients.length} />
        ))}
      </div>
    </div>
  );
}
