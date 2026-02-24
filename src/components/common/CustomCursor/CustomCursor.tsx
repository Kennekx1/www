'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.scss';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        // Ensure initially hidden on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            cursor.style.display = 'none';
            dot.style.display = 'none';
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: 'power3.out'
            });
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'none'
            });
        };

        const updateHoverState = () => {
            const hoverables = document.querySelectorAll('a, button, input, textarea, [role="button"]');

            hoverables.forEach((el) => {
                const element = el as HTMLElement;
                element.addEventListener('mouseenter', () => setIsHovering(true));
                element.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        updateHoverState();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            const hoverables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            hoverables.forEach((el) => {
                const element = el as HTMLElement;
                element.removeEventListener('mouseenter', () => setIsHovering(true));
                element.removeEventListener('mouseleave', () => setIsHovering(false));
            });
        };
    }, [pathname]); // Re-run when path changes to re-attach hover listeners

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        if (isHovering) {
            gsap.to(cursor, {
                scale: 2.5,
                backgroundColor: 'rgba(214, 209, 202, 0.1)', // СЕРЫЙ ШЁЛК with low opacity
                borderColor: 'transparent',
                duration: 0.3
            });
        } else {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(214, 209, 202, 0.5)',
                duration: 0.3
            });
        }
    }, [isHovering]);

    return (
        <>
            <div ref={cursorRef} className={styles.cursorRing} />
            <div ref={cursorDotRef} className={styles.cursorDot} />
        </>
    );
}
