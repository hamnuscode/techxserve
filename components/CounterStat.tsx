"use client";

import { useEffect, useRef, useState } from "react";

interface CounterStatProps {
  value: string;
  label: string;
  dark?: boolean;
  labelRed?: boolean;
}

function parseTarget(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return { num: parseInt(match[2], 10), prefix: match[1], suffix: match[3] };
}

export default function CounterStat({ value, label, dark = false, labelRed = false }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const { num, prefix, suffix } = parseTarget(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * num));
      if (t < 1) requestAnimationFrame(raf);
      else setCount(num);
    };
    requestAnimationFrame(raf);
  }, [started, num]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className={`text-4xl md:text-5xl font-black tabular-nums tracking-tight ${dark ? "text-white" : "text-charcoal"}`}>
        {prefix}<span>{count}</span>{suffix}
      </span>
      <span className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-[#666]" : labelRed ? "text-brand-red" : "text-mid-gray"}`}>
        {label}
      </span>
    </div>
  );
}
