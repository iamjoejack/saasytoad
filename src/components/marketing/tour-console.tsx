"use client";
import * as React from "react";
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Sparkles,
  Bot,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";
import { ToadAvatar } from "@/components/brand/toad-avatar";
import { SAASYTOADS, type ToadId } from "@/lib/characters";
import { cn } from "@/lib/utils";
import { BrassPanel, Cog, GearDivider, FiligreeCorner } from "@/components/marketing/steampunk";

type TourTopic = "intro" | "crm" | "agents" | "founders" | "start";

interface TopicConfig {
  label: string;
  icon: typeof HelpCircle;
}

const TOPICS: Record<TourTopic, TopicConfig> = {
  intro: { label: "Introduce yourself", icon: Bot },
  crm: { label: "SaaSyToadCRM tour", icon: Compass },
  agents: { label: "What agents can do", icon: Sparkles },
  founders: { label: "Who built this?", icon: Users },
  start: { label: "How do I start?", icon: ArrowRight },
};

const SCRIPTS: Record<ToadId, Record<TourTopic, string>> = {
  ronald: {
    intro: "Ronald here, Founder and Chief Operator. My focus is simple: sales strategy, healthy pipelines, and keeping the boilers running at full pressure. I turn cold leads into a solid plan. What part of the workshop shall we inspect?",
    crm: "Our CRM is a marvel of modern engineering. All your client communication funnels into a single, unified chamber: mails, SMS, and DMs. No leakages, no lost leads. I score the leads automatically in the background, telling you exactly who to follow up with first.",
    agents: "AI agents aren't magic. They're just highly efficient mechanical apprentices. They monitor your forms, score leads using advanced logic, and draft digests of your sales health. They do the boring parts so you can focus on making deals.",
    founders: "Three of us built this workshop. We got fed up with software companies charging you by the user, by the email, by the breath you take. We decided to build honest, flat-priced software for hard-working business owners.",
    start: "Ready to fire up the boilers? Click the 'Book a Demo' button. We'll hop on a call, inspect your current setup, and see if our steam-powered agents are the right fit."
  },
  camille: {
    intro: "Hello! Camille here. I manage brand relations and messaging. If you have contacts sitting idle in your database, I design the campaigns to warm them up and win them back. How can I help you navigate our workshop?",
    crm: "The CRM's unified inbox is where I do my best work. Instead of hopping between three different screens, you get SMS, emails, and chat messages in one fluid dashboard. It makes customer service feel like a breeze.",
    agents: "My agents keep your leads warm. When someone fills out a booking request, we send automated (but completely natural) confirmation drips. If a lead goes quiet, my re-engagement agent springs to life to follow up.",
    founders: "We're a small, passionate crew. The founders wanted to create tools that feel premium, like a finely crafted pocket watch, but work without any fuss or hidden costs.",
    start: "The best way to start is to see it in action. Let's schedule a chat! We'll show you how my inbox and campaign features can win you more customers."
  },
  dbug: {
    intro: "D-Bug here, Lead Engineer. I keep the pipes connected, the TypeScript compiled, and the database pressure stable. If you like automations and clean APIs, we'll get along. Otherwise, just let me do the wiring.",
    crm: "The CRM's backend is a beauty. Real-time database sync, automatic schema generation via Prisma, and custom webhook listeners. Everything communicates via high-speed asynchronous queues.",
    agents: "Agents are just autonomous loops running tasks in the background. We have agents that trigger on contact creation, run lead enrichment pipelines, and fetch transcripts. Less copying, more coding.",
    founders: "Three of us built this. They handle the talk, I handle the TypeScript. We keep the code minimal, the dependencies light, and the databases fast.",
    start: "If you're ready, book a demo. Or if you're a developer, inspect the integrations page. Either way, let's get those boilers running."
  },
  amanda: {
    intro: "Hey! Amanda here. I handle brand voice and audience building. Keeping your socials active can feel like a full-time job, but my content repurposing agent makes it effortless. What's on your mind?",
    crm: "A great CRM is nothing without a steady stream of incoming leads. My tools link directly into the CRM to help you turn social attention into database contacts, ready for follow-ups.",
    agents: "My content agent takes your blog posts or documents and automatically drafts social threads, email newsletters, and updates. It's like having a dedicated copywriter working 24/7.",
    founders: "The founders are incredibly down-to-earth. We wanted to build a company that acts like a partner to small businesses, not a distant corporate vendor.",
    start: "Let's build your audience together. Book a demo, and I'll show you how we can automate your social presence without losing your personal touch."
  },
  sammy: {
    intro: "Aha! Sammy here! Welcome to my creative laboratory! I write the prompts and design the aesthetics. Need a spark of inspiration or some gorgeous campaign art? Let's brainstorm!",
    crm: "The CRM is where the magic happens! I help you generate stunning, personalized email templates and campaign graphics directly from the dashboard. Your emails will look like absolute works of art!",
    agents: "My creative agents help you brainstorm marketing hooks, write copy variants, and generate visual assets. They help you break through writer's block in seconds!",
    founders: "We are creative craftsmen at heart. We design every interface to feel premium, tactile, and alive, with smooth physics, physical buttons, and rich colors.",
    start: "Let's start creating! Book a demo, and we'll show you how to generate stunning custom templates for your own brand."
  }
};

export function TourConsole() {
  const [activeToad, setActiveToad] = React.useState<ToadId>("ronald");
  const [activeTopic, setActiveTopic] = React.useState<TourTopic>("intro");
  const [typedText, setTypedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [meterVal, setMeterVal] = React.useState(15);

  const activeData = SAASYTOADS.find((t) => t.id === activeToad) ?? SAASYTOADS[0]!;
  const fullText = SCRIPTS[activeToad][activeTopic];

  const typingTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const meterIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Play mechanical typewriter click sound
  const playClickSound = React.useCallback(() => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        const w = window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        };
        const AudioCtor = window.AudioContext ?? w.webkitAudioContext;
        if (!AudioCtor) return;
        audioContextRef.current = new AudioCtor();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = Math.random() > 0.5 ? "triangle" : "sine";
      // Mechanical sound frequency
      const freq = 600 + Math.random() * 800;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.015);

      gainNode.gain.setValueAtTime(0.02, ctx.currentTime); // Low volume
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } catch {
      // AudioContext failed/blocked
    }
  }, [audioEnabled]);

  // Use web speech API to speak text
  const speakText = React.useCallback((text: string) => {
    if (!audioEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop current speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to select an appropriate voice
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;
    
    if (activeToad === "camille" || activeToad === "amanda") {
      // Female-sounding voice preference
      preferredVoice = voices.find(v => v.lang.startsWith("en") && (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("hazel")));
    } else {
      // Male-sounding or neutral voice preference
      preferredVoice = voices.find(v => v.lang.startsWith("en") && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark") || v.name.toLowerCase().includes("george")));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Mechanical adjustments to make them sound like steam-powered agents
    utterance.pitch = activeToad === "sammy" ? 1.15 : activeToad === "dbug" ? 0.85 : 0.95;
    utterance.rate = activeToad === "ronald" ? 0.95 : activeToad === "dbug" ? 0.9 : 1.0;
    
    window.speechSynthesis.speak(utterance);
  }, [audioEnabled, activeToad]);

  // Handle dial needle oscillations while typing/speaking. The needle's rest
  // position is derived at render time (see needleVal), so this effect only
  // drives the live oscillation and never sets state synchronously.
  React.useEffect(() => {
    if (!isTyping) return;
    meterIntervalRef.current = setInterval(() => {
      setMeterVal(30 + Math.floor(Math.random() * 55));
    }, 100);
    return () => {
      if (meterIntervalRef.current) clearInterval(meterIntervalRef.current);
    };
  }, [isTyping]);

  // Typewriter effect. The reset (clear text, mark typing) happens on the
  // interval's first tick rather than synchronously in the effect body, so we
  // don't trigger a cascading render on every topic change.
  React.useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    let currentIndex = 0;
    let initialised = false;

    // Trigger spoken voice immediately if audio is enabled
    speakText(fullText);

    // Characters per tick
    const speed = 15; // ms per char

    typingTimerRef.current = setInterval(() => {
      if (!initialised) {
        initialised = true;
        setTypedText("");
        setIsTyping(true);
      }
      if (currentIndex < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(currentIndex));
        if (currentIndex % 2 === 0) {
          playClickSound();
        }
        currentIndex++;
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, speed);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [fullText, playClickSound, speakText]);

  // Stop speech if audio toggled off
  React.useEffect(() => {
    if (!audioEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    } else if (audioEnabled) {
      speakText(fullText);
    }
  }, [audioEnabled, fullText, speakText]);

  // Needle rests at 15 when idle; oscillates via meterVal while typing.
  const needleVal = isTyping ? meterVal : 15;

  return (
    <section className="relative overflow-hidden py-20 bg-neutral-950/20 border-y border-border/40">
      {/* Decorative Blueprint background under vignette */}
      <div className="circuit-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="engraved-label justify-center">Agent Tour Guide</span>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Audit the workshop
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">
            Inspect our pneumatic systems and consult the crew. Toggle the acoustic horn and request a tour.
          </p>
          <GearDivider className="mt-6" />
        </div>

        {/* Master Steampunk Machine Console */}
        <BrassPanel rivets className="metal-grain shadow-2xl rounded-2xl border-2 border-(--border-strong) overflow-hidden max-w-5xl mx-auto">
          {/* Filigree Corner Details */}
          <FiligreeCorner corner="tl" size={60} className="opacity-40" />
          <FiligreeCorner corner="tr" size={60} className="opacity-40" />
          <FiligreeCorner corner="bl" size={60} className="opacity-40" />
          <FiligreeCorner corner="br" size={60} className="opacity-40" />

          {/* Top Status Bar with Brass Accents */}
          <div className="h-10 flex items-center justify-between px-6 border-b border-border bg-black/40 relative">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-[10px] tracking-widest text-foreground-subtle uppercase">
                SYSTEM STATE: ONLINE
              </span>
            </div>

            {/* Acoustic Horn Toggle (Volume control) */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded border font-mono text-[10px] tracking-wider transition-all cursor-pointer",
                audioEnabled
                  ? "bg-(--sp-amber)/15 border-(--sp-amber) text-(--sp-amber) shadow-[0_0_8px_rgba(223,160,68,0.25)]"
                  : "bg-black/40 border-border text-foreground-subtle hover:text-foreground hover:border-foreground-subtle"
              )}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="size-3.5" />
                  <span>ACOUSTIC HORN: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="size-3.5" />
                  <span>ACOUSTIC HORN: OFF</span>
                </>
              )}
            </button>
          </div>

          {/* Machine Grid */}
          <div className="grid gap-0 lg:grid-cols-[260px_1fr_300px] bg-neutral-900/50 min-h-[380px]">
            
            {/* LEFT COLUMN: The Toad Dial Console */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border flex flex-col gap-4 bg-black/20">
              <span className="font-mono text-[9px] tracking-widest text-foreground-subtle uppercase block border-b border-border/30 pb-2">
                I. SELECT AGENT COG
              </span>
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                {SAASYTOADS.map((toad) => {
                  const isActive = toad.id === activeToad;
                  return (
                    <button
                      key={toad.id}
                      onClick={() => {
                        setActiveToad(toad.id);
                        setActiveTopic("intro");
                      }}
                      className={cn(
                        "group flex items-center gap-3 p-2 rounded-xl text-left transition-all border outline-none cursor-pointer shrink-0 lg:shrink",
                        isActive
                          ? "bg-surface border-border-strong shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                          : "bg-transparent border-transparent hover:bg-surface/30 hover:border-border/30"
                      )}
                      style={isActive ? { borderColor: toad.accent } : undefined}
                    >
                      <span
                        className="gear-ring shrink-0 transition-transform duration-300 group-hover:rotate-12"
                        style={
                          isActive
                            ? {
                                padding: "3px",
                                boxShadow: `0 0 0 1px oklch(0 0 0 / 0.5), 0 0 0 3px ${toad.accent}, 0 4px 12px color-mix(in oklch, ${toad.accent} 25%, transparent)`,
                              }
                            : { padding: "3px" }
                        }
                      >
                        <ToadAvatar toadId={toad.id} className="size-10" iconClassName="size-4" />
                      </span>
                      <div className="hidden sm:flex flex-col">
                        <span
                          className="text-xs font-semibold font-mono tracking-tight"
                          style={{ color: isActive ? toad.accent : undefined }}
                        >
                          {toad.name}
                        </span>
                        <span className="text-[10px] text-foreground-subtle truncate max-w-[120px]">
                          {toad.role.split(" & ")[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MIDDLE COLUMN: Teleprinter Output & Text Chamber */}
            <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-neutral-950/40">
              {/* Spinning background cog when typing */}
              <Cog
                size={220}
                teeth={14}
                spin={isTyping ? "cw" : false}
                tone={activeData.accent}
                className="absolute right-4 bottom-4 opacity-[0.03] pointer-events-none"
              />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-center border-b border-border/30 pb-3 mb-4">
                  <span className="font-mono text-[9px] tracking-widest text-foreground-subtle uppercase">
                    II. TELEPRINTER TRANSCRIPT
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase font-bold"
                    style={{ color: activeData.accent }}
                  >
                    {activeData.name} speaking
                  </span>
                </div>

                {/* Aged Parchment Panel for Text */}
                <div className="flex-1 flex flex-col justify-center min-h-[140px] px-2 py-4">
                  <p className="font-mono text-sm sm:text-base leading-relaxed text-foreground text-pretty">
                    {typedText}
                    {isTyping && (
                      <span
                        className="inline-block w-2 h-4 ml-1 bg-(--sp-amber) animate-pulse"
                        style={{ backgroundColor: activeData.accent }}
                      />
                    )}
                  </p>
                </div>
              </div>

              {/* Boiler Pressure Gauges / Nixie Tubes */}
              <div className="mt-6 border-t border-border/30 pt-4 flex flex-wrap items-center gap-6 justify-between relative z-10">
                {/* Audio Waves Simulation */}
                <div className="flex items-end gap-1 h-6">
                  {[0.3, 0.8, 0.4, 0.9, 0.6, 0.2, 0.75, 0.45, 0.85, 0.5, 0.35, 0.1].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full transition-all duration-150"
                      style={{
                        backgroundColor: activeData.accent,
                        height: isTyping
                          ? `${Math.max(4, Math.floor(h * 24 * (0.45 + ((meterVal + i * 13) % 55) / 100)))}px`
                          : "4px",
                        opacity: isTyping ? 0.85 : 0.25,
                      }}
                    />
                  ))}
                </div>

                {/* Dial Gauge */}
                <div className="flex items-center gap-3">
                  <div className="relative size-12 rounded-full border border-border bg-black/40 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="size-full">
                      {/* Scale marks */}
                      <circle cx="20" cy="20" r="16" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                      {/* Needle */}
                      <line
                        x1="20"
                        y1="20"
                        x2="20"
                        y2="6"
                        stroke={activeData.accent}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                          transform: `rotate(${needleVal - 50}deg)`,
                          transformOrigin: "20px 20px",
                          transition: "transform 0.1s ease-out",
                        }}
                      />
                    </svg>
                    <span className="absolute bottom-1 font-mono text-[7px] text-foreground-subtle">PSI</span>
                  </div>
                  
                  {/* Vacuum Tube Indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-7 rounded-t-full border border-white/20 transition-all duration-300 relative shadow-inner"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${activeData.accent} ${isTyping ? "40%" : "5%"}, black)`,
                        boxShadow: isTyping
                          ? `0 0 12px ${activeData.accent}, inset 0 2px 4px rgba(255,255,255,0.2)`
                          : "inset 0 2px 4px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Filament */}
                      <span
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-px h-3 bg-amber-400 opacity-60"
                        style={isTyping ? { filter: "brightness(2)" } : { opacity: 0.1 }}
                      />
                    </div>
                    <span className="font-mono text-[7px] text-foreground-subtle mt-1">VALVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Instructions Dial */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l border-border flex flex-col gap-4 bg-black/20">
              <span className="font-mono text-[9px] tracking-widest text-foreground-subtle uppercase block border-b border-border/30 pb-2">
                III. DIAL TOPIC CHANNEL
              </span>
              <div className="flex flex-col gap-2.5">
                {(Object.keys(TOPICS) as TourTopic[]).map((topic) => {
                  const isActive = topic === activeTopic;
                  const Icon = TOPICS[topic].icon;
                  return (
                    <button
                      key={topic}
                      onClick={() => setActiveTopic(topic)}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-lg border text-left transition-all font-mono text-xs cursor-pointer outline-none",
                        isActive
                          ? "bg-surface border-border-strong text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                          : "bg-black/30 border-border/40 text-foreground-muted hover:text-foreground hover:border-border"
                      )}
                      style={isActive ? { borderLeft: `3px solid ${activeData.accent}` } : undefined}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" style={isActive ? { color: activeData.accent } : undefined} />
                        <span>{TOPICS[topic].label}</span>
                      </div>
                      {isActive && (
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: activeData.accent }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </BrassPanel>
      </div>
    </section>
  );
}
