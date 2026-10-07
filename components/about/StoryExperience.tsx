"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyMilestones } from "@/data/story";

gsap.registerPlugin(ScrollTrigger);

export function StoryExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const milestone = storyMilestones[activeIndex] ?? storyMilestones[0]!;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          const index = Math.min(storyMilestones.length - 1, Math.round(self.progress * (storyMilestones.length - 1)));
          progressRef.current?.style.setProperty("transform", `scaleY(${Math.max(0.015, self.progress)})`);
          setActiveIndex((current) => current === index ? current : index);
        },
      });
    }, section);
    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(contentRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity,visibility,transform" });
    });
    return () => context.revert();
  }, [activeIndex, reducedMotion]);

  const goToMilestone = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    const target = section.getBoundingClientRect().top + window.scrollY + (travel * index) / (storyMilestones.length - 1);
    window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (reducedMotion) return <StaticStory reducedMotion />;

  return <><section id="story-experience" ref={sectionRef} className="relative hidden bg-brand-900 text-white md:block" style={{ height: `${storyMilestones.length * 100}vh` }}>
    <div className="sticky top-0 h-screen overflow-hidden">
      <div className="absolute inset-0 bg-brand-900" />
      <div className="relative z-10 mx-auto grid h-full max-w-6xl grid-cols-[8rem_minmax(0,1fr)_minmax(22rem,.9fr)] items-center gap-8 px-8">
        <aside aria-label="Journey timeline" className="relative h-[25rem] self-center">
          <p className="absolute -top-11 left-0 text-xs font-bold uppercase tracking-[.16em] text-brand-200">Our journey</p>
          <div className="absolute bottom-0 left-[.3rem] top-0 w-px bg-white/25" />
          <div ref={progressRef} className="absolute bottom-0 left-[.3rem] top-0 w-px origin-bottom bg-brand-200" style={{ transform: "scaleY(.015)" }} />
          <ol className="relative flex h-full flex-col justify-between">{storyMilestones.map((item, index) => <li key={item.id}><button type="button" onClick={() => goToMilestone(index)} aria-current={activeIndex === index ? "step" : undefined} className="group flex items-center gap-3 text-left"><span className={`relative z-10 h-3 w-3 rounded-full border-2 border-brand-900 transition ${activeIndex === index ? "scale-125 bg-brand-100 shadow-[0_0_0_5px_rgba(214,234,236,.18)]" : "bg-white/60 group-hover:bg-white"}`} /><span className={`font-display text-lg transition ${activeIndex === index ? "font-bold text-white" : "text-white/55 group-hover:text-white"}`}>{item.year}</span></button></li>)}</ol>
        </aside>
        <div ref={contentRef} key={milestone.id} className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-200">{milestone.category}</p>
          <p className="mt-7 font-display text-7xl font-bold leading-none text-white/15">{milestone.year}</p>
          <h2 className="-mt-2 font-display text-4xl font-bold leading-tight !text-white lg:text-5xl">{milestone.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-100">{milestone.description}</p>
          <p className="mt-8 border-l border-brand-300 pl-4 text-sm text-brand-100">{milestone.location}</p>
        </div>
        <div key={milestone.image} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-800 shadow-2xl">
          <Image src={milestone.image} alt={milestone.imageAlt} fill sizes="(min-width: 1024px) 38vw, 0px" className="object-cover transition-all duration-700 ease-out" priority={activeIndex < 2} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-semibold text-white/90"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(storyMilestones.length).padStart(2, "0")}</span><span>{milestone.year}</span></div>
        </div>
      </div>
    </div>
  </section><StaticStory /></>;
}

function StaticStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return <section id={reducedMotion ? "story-experience" : undefined} className={`bg-brand-900 py-16 text-white ${reducedMotion ? "" : "md:hidden"}`}><div className="mx-auto max-w-6xl px-5"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">Our journey</p><div className="mt-8 space-y-8">{storyMilestones.map((milestone) => <article key={milestone.id} className="overflow-hidden rounded-xl bg-white/10"><div className="relative aspect-[16/10]"><Image src={milestone.image} alt={milestone.imageAlt} fill sizes="100vw" className="object-cover" /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-200">{milestone.category} · {milestone.year}</p><h2 className="mt-3 font-display text-2xl font-bold !text-white">{milestone.title}</h2><p className="mt-3 leading-relaxed text-brand-100">{milestone.description}</p></div></article>)}</div></div></section>;
}
