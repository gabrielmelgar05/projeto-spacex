"use client";

import { useEffect } from "react";
import { scheduleRefresh } from "@/lib/gsap";

/**
 * Global scroll housekeeping: re-measures every ScrollTrigger once web fonts
 * and late resources have landed, so pin spacers and start/end positions stay
 * correct when text reflows or images arrive after the first layout.
 */
export function ScrollRuntime() {
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && scheduleRefresh(50));

    const onLoad = () => scheduleRefresh(50);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
