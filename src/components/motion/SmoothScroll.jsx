"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,

      // Smooth mouse wheel
      smoothWheel: true,

      // Jangan terlalu lambat / berat
      lerp: 0.085,

      // Sedikit melembutkan wheel
      wheelMultiplier: 0.9,

      // Touch tetap natural
      touchMultiplier: 1,
      syncTouch: false,

      // Anchor seperti #selayang-pandang
      anchors: {
        offset: -90,
        lerp: 0.075,
      },

      // Stop inertia saat pindah route
      stopInertiaOnNavigate: true,

      // Accessibility
      respectReducedMotion: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
