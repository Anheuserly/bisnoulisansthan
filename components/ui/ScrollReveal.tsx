"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Animation duration in milliseconds
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  distance?: number; // Movement distance in pixels
  threshold?: number; // IntersectionObserver threshold (0 to 1)
  once?: boolean; // Trigger only once (default: true)
  as?: React.ElementType; // Container element tag (default: 'div')
  staggerIndex?: number; // Shortcut to compute delay = staggerIndex * 100ms
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 750,
  direction = "up",
  distance = 24,
  threshold = 0.12,
  once = true,
  as: Component = "div",
  staggerIndex,
  style,
  ...rest
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const effectiveDelay = staggerIndex !== undefined ? staggerIndex * 100 : delay;

  useEffect(() => {
    setIsMounted(true);
    const node = containerRef.current;
    if (!node) return;

    // Respect reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    // Check if element is already within viewport on mount
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Element is visible initially
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  // Compute direction transforms
  const getTransform = () => {
    if (isRevealed || !isMounted) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(-${distance}px, 0, 0)`;
      case "right":
        return `translate3d(${distance}px, 0, 0)`;
      case "scale":
        return `scale(0.96) translate3d(0, ${Math.round(distance / 2)}px, 0)`;
      case "none":
      default:
        return "none";
    }
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    opacity: !isMounted || isRevealed ? 1 : 0,
    transform: getTransform(),
    transition: isMounted
      ? `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${effectiveDelay}ms`
      : undefined,
    willChange: isMounted && !isRevealed ? "opacity, transform" : "auto",
  };

  return (
    <Component
      ref={containerRef as any}
      className={cn("transition-all", className)}
      style={computedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}
