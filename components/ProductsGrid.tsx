"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  tag: string;
  oneLine: string;
  overview: string;
  built: string;
  photos: string[];
  liveLink: string | null;
}

const projects: Project[] = [
  {
    id: "ispr",
    name: "ISPR",
    tag: "Government · Enterprise",
    oneLine: "A multi-layered enterprise dashboard managing a massive historical database dating back to 1947.",
    overview: "ISPR required a high-performance internal platform capable of ingesting, organizing, and searching a deeply complex historical records database spanning nearly 80 years. The system needed to be fast, intuitive for non-technical staff, and secure at every layer.",
    built: "A fully custom enterprise web dashboard with advanced filtering, search, and hierarchical data navigation. Built with role-based access control, audit logging, and a lightning-fast query layer optimized for large-scale relational data.",
    photos: ["Dashboard Overview", "Data Table View", "Search & Filter Interface"],
    liveLink: null,
  },
  {
    id: "xephra",
    name: "Xephra",
    tag: "Gaming · Technology",
    oneLine: "A next-gen gaming platform with an AI-driven ranking system, seamless subscriptions, and adaptive UI.",
    overview: "Xephra needed a platform that could intelligently match and rank players in real time while providing a premium subscription experience and a dynamic UI that adapted to each player's profile and history.",
    built: "A full-stack gaming platform with a custom AI ranking engine, integrated payment and subscription management, real-time leaderboards, and a personalized dashboard for each player. Designed to handle high-concurrency traffic with minimal latency.",
    photos: ["Platform Homepage", "Player Dashboard", "Ranking Interface"],
    liveLink: null,
  },
  {
    id: "bhtd",
    name: "BHTD",
    tag: "Logistics · Mobile",
    oneLine: "An end-to-end mobile delivery platform in Bahrain handling complex logistics and real-time operations.",
    overview: "BHTD needed a mobile-first logistics platform to coordinate last-mile delivery operations across Bahrain — connecting dispatchers, riders, and customers in a single, real-time system.",
    built: "A cross-platform mobile app for riders with live GPS tracking, a dispatcher web panel for order management and routing, and a customer-facing interface for real-time delivery updates. Integrated with SMS notifications and route optimization logic.",
    photos: ["Rider App View", "Dispatcher Panel", "Customer Tracking Screen"],
    liveLink: null,
  },
  {
    id: "police-foundation",
    name: "Police Foundation",
    tag: "Government · AI · Real Estate",
    oneLine: "Two purpose-built portals — AI-powered agriculture advisory and seamless real estate management.",
    overview: "The Police Foundation required two separate but cohesive web portals serving entirely different audiences: an agricultural advisory portal leveraging AI to deliver personalized crop and resource guidance, and a real estate management portal for property listing, tracking, and transaction support.",
    built: "Portal 1 — An AI-integrated agricultural advisory platform with natural language input, personalized recommendations, and a resource knowledge base. Portal 2 — A real estate management system with listing management, inquiry tracking, and an admin dashboard for property teams.",
    photos: ["Agricultural Portal", "AI Advisory Interface", "Real Estate Dashboard"],
    liveLink: null,
  },
];

const tagColors: Record<string, string> = {
  Government:    "bg-charcoal/6 text-charcoal border-charcoal/12",
  Enterprise:    "bg-charcoal/6 text-charcoal border-charcoal/12",
  Gaming:        "bg-charcoal/6 text-charcoal border-charcoal/12",
  Technology:    "bg-charcoal/6 text-charcoal border-charcoal/12",
  Logistics:     "bg-charcoal/6 text-charcoal border-charcoal/12",
  Mobile:        "bg-charcoal/6 text-charcoal border-charcoal/12",
  AI:            "bg-brand-red/8 text-brand-red border-brand-red/20",
  "Real Estate": "bg-charcoal/6 text-charcoal border-charcoal/12",
};

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wide border ${tagColors[tag] ?? "bg-off-white text-charcoal border-border-gray"}`}>
      {tag}
    </span>
  );
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="aspect-video rounded-xl bg-off-white border border-border-gray flex flex-col items-center justify-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-border-gray/60 flex items-center justify-center">
        <span className="text-mid-gray text-[8px] font-bold">IMG</span>
      </div>
      <span className="text-mid-gray text-[10px]">{label}</span>
    </div>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ animation: "fadeIn 0.18s ease" }}
    >
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white w-full sm:rounded-3xl sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto z-10 rounded-t-3xl"
        style={{ animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Drag handle on mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border-gray" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border-gray px-7 py-5 flex items-start justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-xl font-black text-charcoal mb-1.5">{project.name}</h2>
            <div className="flex flex-wrap gap-1">
              {project.tag.split(" · ").map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border-gray flex items-center justify-center text-mid-gray hover:text-charcoal hover:bg-off-white transition-all shrink-0 ml-4 mt-0.5"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-7 space-y-7">
          {/* Photos */}
          <div className="grid grid-cols-3 gap-3">
            {project.photos.map((ph) => (
              <PlaceholderImage key={ph} label={ph} />
            ))}
          </div>

          {/* Overview */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-2.5">Overview</p>
            <p className="text-charcoal/75 leading-relaxed text-sm">{project.overview}</p>
          </div>

          {/* What We Built */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red mb-2.5">What We Built</p>
            <p className="text-charcoal/75 leading-relaxed text-sm">{project.built}</p>
          </div>

          {/* Footer */}
          <div className="pt-1 border-t border-border-gray">
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-red-dark transition-colors"
              >
                Visit Live <ExternalLink size={13} />
              </a>
            ) : (
              <p className="text-mid-gray text-xs">
                {project.id === "ispr" || project.id === "police-foundation"
                  ? "Internal system — not publicly accessible"
                  : "Live link to be added by team"}
              </p>
            )}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => setActive(proj)}
            className="group text-left rounded-2xl border border-border-gray bg-white hover:border-brand-red/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {/* Visual bar */}
            <div className="relative h-3 w-full bg-off-white rounded-t-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 via-brand-red/8 to-transparent group-hover:from-brand-red/40 transition-all duration-500" />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-red/8 flex items-center justify-center shrink-0">
                    <span className="text-brand-red text-[10px] font-black">
                      {proj.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-charcoal">{proj.name}</h3>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-mid-gray group-hover:text-brand-red group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {proj.tag.split(" · ").map((t) => <TagBadge key={t} tag={t} />)}
              </div>

              {/* Description */}
              <p className="text-mid-gray text-sm leading-relaxed line-clamp-2">{proj.oneLine}</p>

              {/* Divider + CTA */}
              <div className="mt-4 pt-4 border-t border-border-gray flex items-center gap-1.5 text-xs font-semibold text-brand-red">
                View Case Study <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && <Modal project={active} onClose={() => setActive(null)} />}
    </>
  );
}
