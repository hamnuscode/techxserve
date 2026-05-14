"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ExternalLink, ArrowUpRight, ArrowLeft, CheckCircle } from "lucide-react";

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
  year: string;
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
      "Fully custom enterprise web dashboard with advanced filtering and search",
      "Hierarchical data navigation across 80 years of records",
      "Role-based access control and granular permissions",
      "Audit logging and full activity trail",
      "Lightning-fast query layer optimized for large-scale relational data",
    ],
    photos: ["Dashboard Overview", "Data Table View", "Search & Filter Interface"],
    liveLink: null,
    year: "2023",
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
      "Integrated payment and subscription management system",
      "Real-time leaderboards with live data sync",
      "Personalized player dashboard and profile system",
      "High-concurrency architecture with minimal latency",
    ],
    photos: ["Platform Homepage", "Player Dashboard", "Ranking Interface"],
    liveLink: null,
    year: "2023",
  },
  {
    id: "bhtd",
    name: "BHTD",
    initials: "BH",
    tag: "Logistics · Mobile",
    oneLine: "An end-to-end mobile delivery platform in Bahrain connecting riders, dispatchers and customers.",
    overview: "BHTD needed a mobile-first logistics platform to coordinate last-mile delivery operations across Bahrain — connecting dispatchers, riders, and customers in a single, real-time system.",
    built: [
      "Cross-platform rider mobile app with live GPS tracking",
      "Dispatcher web panel for order management and routing",
      "Customer-facing interface for real-time delivery updates",
      "SMS notification integration for every delivery stage",
      "Route optimization logic for multi-stop deliveries",
    ],
    photos: ["Rider App View", "Dispatcher Panel", "Customer Tracking Screen"],
    liveLink: null,
    year: "2024",
  },
  {
    id: "police-foundation",
    name: "Police Foundation",
    initials: "PF",
    tag: "Government · AI · Real Estate",
    oneLine: "Two purpose-built portals — AI-powered agriculture advisory and seamless real estate management.",
    overview: "The Police Foundation required two separate but cohesive web portals serving entirely different audiences: an AI agricultural advisory portal delivering personalized crop guidance, and a real estate management portal for property listing and transaction support.",
    built: [
      "AI agricultural advisory platform with natural language input",
      "Personalized crop and resource recommendations engine",
      "Agricultural knowledge base with categorized resources",
      "Real estate listing and inquiry management system",
      "Admin dashboard for property teams with full analytics",
    ],
    photos: ["Agricultural Portal", "AI Advisory Interface", "Real Estate Dashboard"],
    liveLink: null,
    year: "2024",
  },
];

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wide border bg-off-white text-mid-gray border-border-gray">
      {tag}
    </span>
  );
}

function CaseStudyPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    setMounted(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: mounted ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Panel — slides in from right */}
      <div
        className="relative ml-auto w-full max-w-3xl h-full bg-white flex flex-col shadow-[-24px_0_80px_rgba(0,0,0,0.12)] transition-transform duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: mounted ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border-gray shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-mid-gray hover:text-charcoal transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-mid-gray">{project.year}</span>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full border border-border-gray flex items-center justify-center text-mid-gray hover:text-charcoal hover:bg-off-white transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero block */}
          <div className="px-8 py-10 border-b border-border-gray bg-off-white">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-red/8 border border-brand-red/12 flex items-center justify-center shrink-0">
                <span className="text-brand-red text-lg font-black">{project.initials}</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-charcoal tracking-tight leading-tight mb-2">
                  {project.name}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {project.tag.split(" · ").map((t) => <TagBadge key={t} tag={t} />)}
                </div>
              </div>
            </div>
            <p className="text-mid-gray leading-relaxed">{project.oneLine}</p>
          </div>

          <div className="px-8 py-8 space-y-10">
            {/* Screenshots placeholder */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-4">Screenshots</p>
              <div className="grid grid-cols-3 gap-3">
                {project.photos.map((ph) => (
                  <div
                    key={ph}
                    className="aspect-video rounded-xl bg-off-white border border-border-gray flex flex-col items-center justify-center gap-1.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-border-gray/60 flex items-center justify-center">
                      <span className="text-mid-gray text-[7px] font-bold">IMG</span>
                    </div>
                    <span className="text-mid-gray text-[9px] text-center px-1">{ph}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-4">Project Overview</p>
              <p className="text-charcoal/75 leading-relaxed">{project.overview}</p>
            </div>

            {/* What We Built */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-4">What We Built</p>
              <ul className="space-y-3">
                {project.built.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-brand-red mt-0.5 shrink-0" />
                    <span className="text-charcoal/80 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border-gray pb-4">
              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-colors"
                >
                  Visit Live Site <ExternalLink size={14} />
                </a>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-off-white border border-border-gray">
                  <div className="w-2 h-2 rounded-full bg-mid-gray/40" />
                  <p className="text-mid-gray text-sm">
                    {project.id === "ispr" || project.id === "police-foundation"
                      ? "Internal system — not publicly accessible"
                      : "Live link coming soon"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => setActive(proj)}
            className="group text-left rounded-2xl border border-border-gray bg-white hover:border-brand-red/25 hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Visual area */}
            <div className="relative h-44 bg-off-white flex items-center justify-center overflow-hidden border-b border-border-gray">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Large monogram */}
              <span className="text-[96px] font-black text-charcoal/5 select-none leading-none">
                {proj.initials}
              </span>
              {/* Red gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 to-brand-red/0 group-hover:from-brand-red/5 group-hover:to-brand-red/12 transition-all duration-500" />
              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="flex items-center gap-2 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  View Case Study <ArrowUpRight size={13} />
                </span>
              </div>
              {/* Year tag */}
              <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-white/80 backdrop-blur-sm border border-border-gray text-[9px] font-semibold text-mid-gray">
                {proj.year}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-black text-charcoal group-hover:text-brand-red transition-colors duration-200">
                  {proj.name}
                </h3>
                <ArrowUpRight
                  size={16}
                  className="text-border-gray group-hover:text-brand-red group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5"
                />
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {proj.tag.split(" · ").map((t) => <TagBadge key={t} tag={t} />)}
              </div>
              <p className="text-mid-gray text-sm leading-relaxed line-clamp-2">{proj.oneLine}</p>
            </div>
          </button>
        ))}
      </div>

      {active && <CaseStudyPanel project={active} onClose={() => setActive(null)} />}
    </>
  );
}
