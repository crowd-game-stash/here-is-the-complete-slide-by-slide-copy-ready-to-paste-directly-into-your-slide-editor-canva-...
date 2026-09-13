import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Expand, Grid2X2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sub-400ms Voice AI Agent | Capstone" },
      { name: "description", content: "A six-slide engineering story about building a real-time voice AI receptionist." },
      { property: "og:title", content: "How I Built a Sub-400ms Real-Time Voice AI Agent" },
      { property: "og:description", content: "Architecture, latency benchmarks, and lessons from a B.Tech capstone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Presentation,
});

type SlideData = {
  tag: string;
  title: string;
  bullets: string[];
  caption: string;
};

const slides: SlideData[] = [
  {
    tag: "B.Tech Capstone Project",
    title: "How I Built a Sub-400ms Real-Time Voice AI Agent",
    bullets: [
      "Replaced missed clinic voicemails with an autonomous receptionist",
      "Full duplex streaming audio over WebSockets",
      "Handles live interruptions, FAQs, and Google Calendar bookings",
    ],
    caption: "Swipe for architecture, latency benchmarks, and lessons",
  },
  {
    tag: "Market Pain Point",
    title: "Why Voicemails Cost Local Clinics Thousands",
    bullets: [
      "30% of patient phone inquiries occur after 6:00 PM or during lunch hours",
      "85% of callers hang up immediately without leaving a voicemail",
      "Patients in pain simply call the next clinic on Google Maps",
      "Average clinic loses 15+ potential appointments every month",
    ],
    caption: "Missed After-Hours Call → Unheard Voicemail → Lost Patient Lifetime Value ($1,200+)",
  },
  {
    tag: "System Design",
    title: "The Ultra-Low-Latency Audio Pipeline",
    bullets: [
      "Inbound phone calls routed via Twilio to bidirectional WebSockets",
      "Deepgram Nova-2 handles speech-to-text with ~140ms stream turnaround",
      "Groq-hosted Llama-3 70B evaluates intent and executes tool calls in ~90ms",
      "Cartesia Sonic converts text to conversational audio in ~100ms",
    ],
    caption: "Twilio Audio Stream → Deepgram (STT) → Groq / Llama-3 (Brain) → Cartesia (TTS) → Real-Time Audio Return (~390ms total loop)",
  },
  {
    tag: "Performance Data",
    title: "Tested Across 50 Simulated Inbound Calls",
    bullets: [
      "390ms median round-trip response time — natural and conversational",
      "94% task completion across bookings, hours checks, and insurance questions",
      "Zero dropped WebSocket connections across concurrent test sessions",
      "Direct calendar slot reservation confirmed via instant SMS notification",
    ],
    caption: "Standard Human Pause (300–500ms) vs. Agent Response Time (390ms)",
  },
  {
    tag: "Engineering Toolkit",
    title: "Built with Modern Real-Time Infrastructure",
    bullets: [
      "Languages: TypeScript, Node.js, and Python",
      "Real-Time: WebSockets, WebRTC, and Twilio Media Streams",
      "AI & Speech: Deepgram, Groq, Cartesia, and ElevenLabs",
      "Backend: Supabase, PostgreSQL, Edge Functions, and Google Calendar API",
    ],
    caption: "Decoupled event-driven backend built on lightweight serverless functions and persistent WebSockets",
  },
  {
    tag: "Key Takeaways",
    title: "3 Hard Lessons From Building With Real-Time Voice",
    bullets: [
      "Barge-in is non-negotiable: flush outbound audio the millisecond the user interrupts",
      "Latency is cumulative: 30ms saved on transcription gives the LLM crucial breathing room",
      "Utility over complexity: reliable slot booking beats fancy multi-turn tricks",
    ],
    caption: "Live demo link and open-source GitHub repository in the first comment below",
  },
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-4 border-signal pl-7">
      <div className="font-display text-[70px] font-bold leading-none">{value}</div>
      <div className="slide-caption mt-3 max-w-[260px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Visual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute h-[460px] w-[460px] rounded-full border border-border" />
        <div className="absolute h-[330px] w-[330px] rounded-full border border-border" />
        <div className="relative flex h-[190px] w-[190px] items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-mono text-[44px] font-semibold">390ms</span>
        </div>
        {[0,1,2,3,4].map((bar) => <span key={bar} className="mx-2 h-[140px] w-5 rounded-full bg-signal" style={{ transform: `scaleY(${0.4 + (bar % 3) * 0.28})` }} />)}
      </div>
    );
  }
  if (index === 1) {
    return <div className="grid h-full content-center gap-12"><Metric value="30%" label="calls arrive outside reliable desk coverage"/><Metric value="85%" label="leave without recording a voicemail"/><Metric value="15+" label="potential bookings lost each month"/></div>;
  }
  if (index === 2) {
    const nodes = [["01","Twilio","stream"],["02","Deepgram","140ms"],["03","Llama-3","90ms"],["04","Cartesia","100ms"]];
    return <div className="grid h-full content-center gap-4">{nodes.map(([n,name,time]) => <div key={n} className="flex items-center gap-6 border-b border-border py-7"><span className="slide-chrome text-muted-foreground">{n}</span><span className="slide-subtitle flex-1 font-semibold">{name}</span><span className="slide-chrome rounded-full bg-signal-soft px-6 py-3 text-signal-foreground">{time}</span></div>)}<div className="mt-6 flex items-center justify-between"><span className="slide-kicker">Voice in</span><ArrowRight className="h-12 w-12 text-signal"/><span className="slide-kicker">Voice out · 390ms</span></div></div>;
  }
  if (index === 3) {
    return <div className="flex h-full flex-col justify-center"><div className="font-display text-[180px] font-bold leading-none">390<span className="text-[64px] text-muted-foreground">ms</span></div><div className="mt-12 h-8 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[78%] rounded-full bg-signal" /></div><div className="slide-caption mt-5 flex justify-between text-muted-foreground"><span>300ms</span><span>Natural human pause</span><span>500ms</span></div><div className="mt-20 grid grid-cols-2 gap-12"><Metric value="94%" label="task completion"/><Metric value="0" label="dropped connections"/></div></div>;
  }
  if (index === 4) {
    const groups = [["CORE","TypeScript · Node.js · Python"],["VOICE","Deepgram · Cartesia · ElevenLabs"],["INTELLIGENCE","Groq · Llama-3 70B"],["SYSTEMS","WebSockets · Twilio · PostgreSQL"]];
    return <div className="grid h-full content-center gap-5">{groups.map(([label,items],i) => <div key={label} className={`border p-8 ${i === 2 ? "border-signal bg-signal-soft" : "border-border bg-card"}`}><div className="slide-kicker text-muted-foreground">{label}</div><div className="slide-body-lg mt-3 font-medium">{items}</div></div>)}</div>;
  }
  return <div className="flex h-full flex-col justify-center gap-8"><div className="border-l-4 border-signal p-8"><div className="slide-kicker text-muted-foreground">Author</div><div className="slide-subtitle mt-4 font-semibold">Kasabu Nikhil Goud</div><div className="slide-body mt-3 text-muted-foreground">Final Year B.Tech CSE · Class of 2026</div></div><div className="bg-primary p-9 text-primary-foreground"><div className="slide-kicker opacity-70">Next chapter</div><div className="slide-body-lg mt-3 font-semibold">Open for SDE & AI Engineering roles</div></div></div>;
}

function Slide({ index }: { index: number }) {
  const slide = slides[index];
  return (
    <article className="slide-content slide-enter flex flex-col px-[108px] py-[82px]" aria-label={`Slide ${index + 1}: ${slide.title}`}>
      <header className="flex items-center justify-between border-b border-border pb-7">
        <span className="slide-kicker">{slide.tag}</span>
        <span className="slide-chrome text-muted-foreground">VOICE / AI · 0{index + 1}</span>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-[1.12fr_0.88fr] gap-[92px] pt-[68px]">
        <div className="flex min-h-0 flex-col">
          <h1 className={index === 0 ? "slide-title-lg max-w-[1000px]" : "slide-title max-w-[1020px]"}>{slide.title}</h1>
          <ul className="mt-[52px] grid gap-6">
            {slide.bullets.map((bullet, i) => (
              <li key={bullet} className="slide-body flex items-start gap-6 text-ink-soft">
                <span className="slide-chrome mt-2 flex size-9 shrink-0 items-center justify-center rounded-full bg-signal-soft text-signal-foreground">{i + 1}</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <Visual index={index} />
      </div>
      <footer className="mt-8 flex items-center gap-6 border-t border-border pt-7">
        <span className="h-3 w-3 shrink-0 rounded-full bg-signal" />
        <p className="slide-caption flex-1 font-medium">{slide.caption}</p>
        {index === 0 && <ArrowRight className="h-9 w-9" />}
      </footer>
    </article>
  );
}

function ScaledSlide({ index }: { index: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setScale(Math.min(host.clientWidth / 1920, host.clientHeight / 1080));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);
  return <div ref={hostRef} className="relative h-full w-full overflow-hidden"><div className="absolute left-1/2 top-1/2 h-[1080px] w-[1920px] -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center" }}><Slide index={index}/></div></div>;
}

function Presentation() {
  const initial = typeof window === "undefined" ? 0 : Math.min(Math.max(Number(new URLSearchParams(window.location.search).get("slide")) - 1 || 0, 0), slides.length - 1);
  const [current, setCurrent] = useState(initial);
  const [overview, setOverview] = useState(false);
  const go = useCallback((next: number) => setCurrent(Math.min(Math.max(next, 0), slides.length - 1)), []);
  useEffect(() => {
    const url = new URL(window.location.href); url.searchParams.set("slide", String(current + 1)); window.history.replaceState({}, "", url);
    document.title = `${current + 1}/${slides.length} — ${slides[current].title}`;
  }, [current]);
  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") go(current + 1);
      if (event.key === "ArrowLeft") go(current - 1);
      if (event.key.toLowerCase() === "g") setOverview((value) => !value);
      if (event.key === "F5") { event.preventDefault(); void document.documentElement.requestFullscreen(); }
      if (event.key === "Escape") setOverview(false);
    };
    window.addEventListener("keydown", keys); return () => window.removeEventListener("keydown", keys);
  }, [current, go]);

  const printMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("print");
  if (printMode) return <main className="print-deck">{slides.map((_, i) => <div className="print-slide" key={i}><Slide index={i}/></div>)}</main>;

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      <nav className="print-hide flex h-16 shrink-0 items-center justify-between border-b border-border px-4 md:px-6" aria-label="Presentation controls">
        <div className="flex items-center gap-3"><span className="font-display text-sm font-semibold">VOICE / AI</span><span className="hidden font-mono text-xs text-muted-foreground sm:inline">CAPSTONE · 2026</span></div>
        <div className="flex items-center gap-2">
          <Button variant="deck" size="icon" aria-label="Show all slides" title="Grid view (G)" onClick={() => setOverview(true)}><Grid2X2 /></Button>
          <Button variant="deck" size="icon" aria-label="Enter fullscreen" title="Present (F5)" onClick={() => void document.documentElement.requestFullscreen()}><Expand /></Button>
        </div>
      </nav>
      <section className="min-h-0 flex-1 p-3 md:p-6"><div className="h-full overflow-hidden border border-border bg-stage shadow-2xl"><ScaledSlide index={current}/></div></section>
      <footer className="print-hide flex h-20 shrink-0 items-center justify-between px-4 md:px-6">
        <Button variant="deck" size="deckIcon" aria-label="Previous slide" disabled={current === 0} onClick={() => go(current - 1)}><ArrowLeft /></Button>
        <div className="flex items-center gap-4"><span className="font-mono text-xs text-muted-foreground">{String(current + 1).padStart(2,"0")}</span><div className="flex gap-2">{slides.map((_,i) => <button key={i} aria-label={`Go to slide ${i+1}`} onClick={() => go(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-10 bg-primary" : "w-4 bg-border"}`} />)}</div><span className="font-mono text-xs text-muted-foreground">06</span></div>
        <Button variant="deckPrimary" size="deckIcon" aria-label="Next slide" disabled={current === slides.length - 1} onClick={() => go(current + 1)}><ArrowRight /></Button>
      </footer>
      {overview && <div className="fixed inset-0 z-50 overflow-y-auto bg-background/95 p-6 backdrop-blur-md"><div className="mx-auto max-w-7xl"><div className="mb-6 flex items-center justify-between"><h2 className="font-display text-2xl font-semibold">All slides</h2><Button variant="deck" size="icon" aria-label="Close overview" onClick={() => setOverview(false)}><X /></Button></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{slides.map((slide,i) => <button key={slide.title} onClick={() => {go(i);setOverview(false)}} className="group overflow-hidden border border-border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="aspect-video bg-stage p-7"><div className="font-mono text-xs text-muted-foreground">0{i+1} · {slide.tag}</div><div className="mt-8 font-display text-2xl font-semibold leading-tight">{slide.title}</div><div className="mt-8 h-1 w-16 bg-signal" /></div></button>)}</div></div></div>}
    </main>
  );
}