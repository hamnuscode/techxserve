"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, CheckCircle } from "lucide-react";

interface Project {
  id: string;
  name: string;
  initials: string;
  tag: string;
  oneLine: string;
  overview: string;
  built: string[];
  photos: string[];
  liveLink: string | null;
}

const projects: Project[] = [
  {
    id: "ispr",
    name: "ISPR",
    initials: "IS",
    tag: "Government · Enterprise",
    oneLine: "A multi-layered enterprise dashboard managing a historical database spanning nearly 80 years.",
    overview: "ISPR required a high-performance internal platform capable of ingesting, organizing, and searching a deeply complex historical records database spanning nearly 80 years. The system needed to be fast, intuitive for non-technical staff, and secure at every layer.",
    built: [
      "Custom enterprise dashboard with advanced filtering and search",
      "Hierarchical navigation across 80 years of records",
      "Role-based access control and granular permissions",
      "Audit logging and full activity trail",
      "Lightning-fast query layer optimized for large-scale relational data",
    ],
    photos: ["Dashboard Overview", "Data Table View", "Search & Filter"],
    liveLink: null,
  },
  {
    id: "xephra",
    name: "Xephra",
    initials: "XP",
    tag: "Gaming · Technology",
    oneLine: "A next-gen gaming platform with an AI-driven ranking system and fully adaptive interface.",
    overview: "Xephra needed a platform that could intelligently match and rank players in real time while providing a premium subscription experience and a dynamic UI that adapted to each player's profile and history.",
    built: [
      "Custom AI ranking engine with real-time player matching",
      "Integrated payment and subscription management",
      "Real-time leaderboards with live data sync",
      "Personalized player dashboard and profile system",
      "High-concurrency architecture engineered for minimal latency",
    ],
    photos: ["Platform Homepage", "Player Dashboard", "Ranking Interface"],
    liveLink: null,
  },
  {
    id: "bhtd",
    name: "BHTD",
    initials: "BH",
    tag: "Logistics · Mobile",
    oneLine: "An end-to-end mobile delivery platform in Bahrain connecting riders, dispatchers, and customers.",
    overview: "BHTD needed a mobile-first logistics platform to coordinate last-mile delivery operations across Bahrain — connecting dispatchers, riders, and customers in a single, real-time system.",
    built: [
      "Cross-platform rider app with live GPS tracking",
      "Dispatcher web panel for order management and routing",
      "Customer interface for real-time delivery updates",
      "SMS notifications integrated at every delivery stage",
      "Route optimization logic for multi-stop deliveries",
    ],
    photos: ["Rider App", "Dispatcher Panel", "Customer Tracking"],
    liveLink: null,
  },
  {
    id: "police-foundation",
    name: "Police Foundation",
    initials: "PF",
    tag: "Government · AI · Real Estate",
    oneLine: "Two purpose-built portals — AI-powered agriculture advisory and seamless real estate management.",
    overview: "The Police Foundation required two separate but cohesive web portals serving entirely different audiences: an AI agricultural advisory portal and a real estate management portal for property listing and transaction support.",
    built: [
      "AI agricultural advisory platform with natural language input",
      "Personalized crop and resource recommendation engine",
      "Agricultural knowledge base with categorized resources",
      "Real estate listing and inquiry management system",
      "Admin dashboard for property teams with full analytics",
    ],
    photos: ["Agricultural Portal", "AI Advisory Interface", "Real Estate Dashboard"],
    liveLink: null,
  },
];

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wide border border-border-gray bg-off-white text-mid-gray">
      {tag}
    </span>
  );
}

function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
        isActive
          ? "border-brand-red/30 shadow-[0_4px_24px_rgba(204,0,0,0.07)]"
          : "border-border-gray hover:border-brand-red/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 ${
          isActive ? "bg-brand-red" : "bg-transparent group-hover:bg-brand-red/30"
        }`}
      />

      <div className="px-6 py-5 pl-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-red/8 flex items-center justify-center shrink-0">
              <span className="text-brand-red text-[10px] font-black">{project.initials}</span>
            </div>
            <h3 className={`font-black text-base transition-colors duration-200 ${isActive ? "text-brand-red" : "text-charcoal group-hover:text-charcoal"}`}>
              {project.name}
            </h3>
          </div>
          <ChevronDown
            size={15}
            className={`shrink-0 mt-0.5 text-mid-gray transition-transform duration-300 ${isActive ? "rotate-180 text-brand-red" : ""}`}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tag.split(" · ").map((t) => <TagBadge key={t} tag={t} />)}
        </div>

        {/* One-liner */}
        <p className="text-mid-gray text-sm leading-relaxed">{project.oneLine}</p>
      </div>
    </button>
  );
}

function CaseStudyDetail({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-border-gray bg-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-8 py-4 border-b border-border-gray bg-off-white">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-mid-gray">
          Case Study — {project.name}
        </p>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Overview + screenshots */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-3">Overview</p>
            <p className="text-charcoal/75 text-sm leading-relaxed">{project.overview}</p>
          </div>

          {/* Screenshot placeholders */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-3">Screenshots</p>
            <div className="grid grid-cols-3 gap-2">
              {project.photos.map((ph) => (
                <div
                  key={ph}
                  className="aspect-video rounded-lg bg-off-white border border-border-gray flex flex-col items-center justify-center gap-1"
                >
                  <div className="w-5 h-5 rounded bg-border-gray/70 flex items-center justify-center">
                    <span className="text-[6px] font-bold text-mid-gray">IMG</span>
                  </div>
                  <span className="text-[8px] text-mid-gray text-center leading-tight px-1">{ph}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: What we built */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-3">What We Built</p>
            <ul className="space-y-2.5">
              {project.built.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={13} className="text-brand-red mt-[3px] shrink-0" />
                  <span className="text-charcoal/75 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live link */}
          <div className="pt-4 border-t border-border-gray">
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-xs font-semibold rounded-xl hover:bg-brand-red-dark transition-colors"
              >
                Visit Live <ExternalLink size={12} />
              </a>
            ) : (
              <p className="text-mid-gray text-xs">
                {project.id === "ispr" || project.id === "police-foundation"
                  ? "Internal system — not publicly accessible"
                  : "Live link coming soon"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  // Group into rows of 2
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const active = row.find((p) => p.id === activeId) ?? null;
        return (
          <div key={row[0].id} className="space-y-3">
            {/* Card row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {row.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  isActive={proj.id === activeId}
                  onClick={() => toggle(proj.id)}
                />
              ))}
              {row.length < 2 && <div />}
            </div>

            {/* Inline dropdown detail */}
            <div
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                maxHeight: active ? "600px" : "0px",
                opacity: active ? 1 : 0,
              }}
            >
              {active && <CaseStudyDetail project={active} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
