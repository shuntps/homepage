"use client";

import { useState, useEffect } from "react";

const TYPEWRITER_SPEED = 110;
const TYPEWRITER_DELAY = 600;

export default function HomePage({ domain, locale }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [clock, setClock] = useState({ time: "", date: "" });
  const clockLocale = locale.replaceAll("_", "-");

  // Typewriter effect
  useEffect(() => {
    let timer;
    const start = setTimeout(() => {
      let i = 0;
      timer = setInterval(() => {
        i++;
        setDisplayText(domain.slice(0, i));
        if (i >= domain.length) clearInterval(timer);
      }, TYPEWRITER_SPEED);
    }, TYPEWRITER_DELAY);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [domain]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  });

  // Real-time clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock({
        time: now.toLocaleTimeString(clockLocale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        date: now.toLocaleDateString(clockLocale, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [clockLocale]);

  return (
    <div className="relative min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden select-none">
      {/* Grid */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      {/* Ambient central glow */}
      <div
        className="glow-pulse absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-175 h-120 rounded-full bg-blue-900/25 blur-[140px]" />
      </div>

      {/* Scanlines */}
      <div
        className="scanlines absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        {/* Top rule */}
        <div className="flex items-center gap-4 w-full max-w-lg">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-blue-700/30 to-blue-500/50" />
          <span className="text-blue-600/50 text-[10px] font-mono tracking-[0.45em] uppercase">
            sys.online
          </span>
          <div className="h-px flex-1 bg-linear-to-l from-transparent via-blue-700/30 to-blue-500/50" />
        </div>

        {/* Domain with corner brackets */}
        <div className="relative px-14 py-8">
          <span
            className="absolute top-0 left-0 block w-5 h-5 border-t-2 border-l-2 border-blue-500/60"
            aria-hidden="true"
          />
          <span
            className="absolute top-0 right-0 block w-5 h-5 border-t-2 border-r-2 border-blue-500/60"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 left-0 block w-5 h-5 border-b-2 border-l-2 border-blue-500/60"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 right-0 block w-5 h-5 border-b-2 border-r-2 border-blue-500/60"
            aria-hidden="true"
          />

          <h1
            aria-label={domain}
            className="text-5xl sm:text-7xl font-mono font-bold tracking-widest text-white text-glow min-h-[1.2em]"
          >
            {displayText}
            <span
              className="text-blue-400 ml-0.5"
              style={{ opacity: showCursor ? 1 : 0 }}
              aria-hidden="true"
            >
              ▮
            </span>
          </h1>
        </div>

        {/* Divider */}
        <div
          className="flex items-center gap-4 w-full max-w-xs"
          aria-hidden="true"
        >
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-blue-600/40" />
          <div className="flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 motion-safe:animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700/50" />
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-blue-600/40" />
        </div>

        {/* Clock */}
        <div
          className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${clock.time ? "opacity-100" : "opacity-0"}`}
          aria-hidden={clock.time ? undefined : "true"}
        >
          <div className="text-3xl sm:text-4xl font-mono font-light text-blue-300 tracking-[0.25em] tabular-nums">
            {clock.time || "00:00:00"}
          </div>
          <div className="text-xs font-mono text-blue-500/55 tracking-[0.2em] uppercase">
            {clock.date || "\u00a0"}
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="flex items-center gap-4 w-full max-w-lg"
          aria-hidden="true"
        >
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-blue-700/20 to-blue-600/35" />
          <div className="flex gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-800/60" />
            <span className="w-1 h-1 rounded-full bg-blue-800/60" />
            <span className="w-1 h-1 rounded-full bg-blue-800/60" />
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent via-blue-700/20 to-blue-600/35" />
        </div>
      </div>
    </div>
  );
}
