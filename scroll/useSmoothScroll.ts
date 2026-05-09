'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll({ lerp = 0.1, duration = 1.2 } = {}) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp,
            duration,
            smoothWheel: true,
         
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [lerp, duration]);
}

export { gsap, ScrollTrigger };