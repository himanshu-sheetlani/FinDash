import { useLayoutEffect } from "react";
import gsap from "gsap";

function useMotionSafeLayoutEffect(scopeRef, setupAnimation, dependencies = []) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const context = gsap.context(setupAnimation, scopeRef);
    return () => context.revert();
  }, dependencies);
}

export default useMotionSafeLayoutEffect;
