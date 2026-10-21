"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FileText, MapPin, Sparkles } from "lucide-react";
import { storyMilestones, type StoryMilestone } from "@/data/story";
import type { StoryPresentation } from "@/config/customizer";

export function StoryExperience({
  milestones = storyMilestones,
  presentation = "editorial",
}: {
  milestones?: StoryMilestone[];
  presentation?: StoryPresentation;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const milestone = milestones[activeIndex] ?? milestones[0]!;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reducedMotion) return <StaticStory milestones={milestones} presentation={presentation} reducedMotion />;

  return (
    <>
      <section
        id="story-experience"
        className="relative hidden overflow-hidden bg-brand-900 py-16 text-white md:block md:py-20"
      >
        <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-brand-200/10" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-[10rem_minmax(0,1fr)_minmax(22rem,.92fr)] items-center gap-8 px-6 lg:gap-10 lg:px-8">
          <aside aria-label="Chronology of Growth & Development" className="relative h-[24rem] self-center">
            <p className="absolute -top-10 left-0 text-xs font-bold uppercase tracking-[.14em] text-brand-200 whitespace-nowrap">
              Chronology of Growth &amp; Development
            </p>
            <div className="absolute bottom-0 left-[.3rem] top-0 w-px bg-white/25" />
            <ol className="relative flex h-full flex-col justify-between">
              {milestones.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={activeIndex === index ? "step" : undefined}
                    className="group flex items-start gap-3 text-left cursor-pointer"
                  >
                    <span className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-brand-900 transition ${activeIndex === index ? "scale-125 bg-brand-100 shadow-[0_0_0_5px_rgba(214,234,236,.18)]" : "bg-white/60 group-hover:bg-white"}`} />
                    <div className="min-w-0">
                      <span className={`font-display text-lg block transition ${activeIndex === index ? "font-bold text-white" : "text-white/55 group-hover:text-white"}`}>{item.year}</span>
                      <span className={`text-[11px] block transition truncate max-w-[8rem] ${activeIndex === index ? "text-brand-200 font-semibold" : "text-white/40 group-hover:text-white/70"}`}>{item.title}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
          <div key={milestone.id} className="max-w-xl motion-safe:animate-rise">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-800/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-brand-200 border border-brand-700/60">
                <Sparkles className="h-3 w-3 text-amber-300" />
                <span>{milestone.category}</span>
              </div>
              <p className="mt-5 font-display text-7xl font-bold leading-none text-white/15">{milestone.year}</p>
              <h2 className="-mt-2 font-display text-3xl font-bold leading-tight !text-white lg:text-4xl">{milestone.title}</h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-brand-100">{milestone.description}</p>
              <p className="mt-6 border-l border-brand-300 pl-4 text-xs sm:text-sm text-brand-200">{milestone.location}</p>
          </div>
          {presentation === "photographic" ? (
            <div key={milestone.image} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-800 shadow-2xl">
              <Image src={milestone.image} alt={milestone.imageAlt} fill sizes="(min-width: 1024px) 38vw, 0px" className="object-cover transition-all duration-700 ease-out" priority={activeIndex < 2} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-semibold text-white/90">
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}</span>
                <span>{milestone.year}</span>
              </div>
            </div>
          ) : (
            <EditorialMilestonePanel milestone={milestone} index={activeIndex} total={milestones.length} />
          )}
        </div>
      </section>
      <StaticStory milestones={milestones} presentation={presentation} />
    </>
  );
}

function StaticStory({
  milestones = storyMilestones,
  presentation = "editorial",
  reducedMotion = false,
}: {
  milestones?: StoryMilestone[];
  presentation?: StoryPresentation;
  reducedMotion?: boolean;
}) {
  return (
    <section
      id={reducedMotion ? "story-experience" : undefined}
      className={`bg-brand-900 py-16 text-white ${reducedMotion ? "" : "md:hidden"}`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">
          Chronology of Growth &amp; Development
        </p>
        <div className="mt-8 space-y-8">
          {milestones.map((milestone) => (
            <article key={milestone.id} className="overflow-hidden rounded-xl bg-white/10">
              {presentation === "photographic" ? (
                <div className="relative aspect-[16/10]">
                  <Image src={milestone.image} alt={milestone.imageAlt} fill sizes="100vw" className="object-cover" />
                </div>
              ) : (
                <div className="border-b border-white/15 px-6 py-5">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[.18em] text-brand-200">Community record</p>
                  <p className="mt-2 font-display text-4xl font-bold text-white/35">{milestone.year}</p>
                  <p className="mt-3 flex items-start gap-2 text-sm text-brand-100"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" />{milestone.location}</p>
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-200">
                  {milestone.category} · {milestone.year}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold !text-white">{milestone.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-100">{milestone.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialMilestonePanel({
  milestone,
  index,
  total,
}: {
  milestone: StoryMilestone;
  index: number;
  total: number;
}) {
  return (
    <div key={milestone.id} className="relative isolate overflow-hidden rounded-2xl border border-white/20 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-sm lg:p-9">
      <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border border-brand-200/20" />
      <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full border border-brand-200/20" />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[.2em] text-brand-200">Community record</p>
          <p className="mt-3 font-display text-6xl font-bold leading-none text-white/25">{milestone.year}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200/40 bg-brand-200/10 text-brand-100">
          <Sparkles className="h-5 w-5" />
        </span>
      </div>

      <div className="relative mt-12 border-l border-brand-200/50 pl-5">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[.16em] text-brand-200">Milestone {String(index + 1).padStart(2, "0")}</p>
        <p className="mt-2 text-base font-semibold leading-relaxed text-white">{milestone.category}</p>
      </div>

      <div className="relative mt-7 border-t border-white/15 pt-5">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-brand-100"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" />{milestone.location}</p>
        <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-brand-200"><FileText className="h-4 w-4" />BSGSS journey archive</p>
      </div>

      <p className="relative mt-10 text-xs font-semibold text-white/60">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · Since 1994</p>
    </div>
  );
}
