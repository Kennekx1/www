'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
}

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 1
}: RevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        let x = 0;
        let y = 0;
        if (direction === 'up') y = 50;
        if (direction === 'down') y = -50;
        if (direction === 'left') x = 50;
        if (direction === 'right') x = -50;

        gsap.fromTo(element,
            {
                opacity: 0,
                x,
                y
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    }, [direction, delay, duration]);

    return <div ref={elementRef} style={{ width: '100%', height: '100%' }}>{children}</div>;
}
