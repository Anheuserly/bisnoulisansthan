"use client";

import { useEffect } from "react";

/**
 * GlobalScrollObserver attaches an IntersectionObserver to any DOM elements
 * with the class `.reveal-on-scroll` or attribute `[data-reveal]`.
 * 
 * When elements scroll into the viewport, it smoothly adds `.is-revealed`.
 * It also uses MutationObserver to detect dynamically mounted elements.
 */
export function GlobalScrollObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal-on-scroll, [data-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed), [data-reveal]:not(.is-revealed)");
      targets.forEach((el) => {
        // If element is already in viewport on page load/render, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    observeElements();

    // Listen to route changes / dynamic content renders
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
