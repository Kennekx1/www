'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.scss';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState<string | null>(null);
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

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactable = target.closest('[data-cursor-text], a, button, input, textarea, [role="button"]');

            if (interactable) {
                setIsHovering(true);
                const text = interactable.getAttribute('data-cursor-text');
                setCursorText(text || null);
            } else {
                setIsHovering(false);
                setCursorText(null);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, [pathname]); // Re-run when path changes to re-attach hover listeners

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        if (cursorText) {
            // Text mode
            gsap.to(cursor, {
                width: 80,
                height: 80,
                backgroundColor: 'rgba(214, 209, 202, 0.9)', // Solid brand color
                borderColor: 'transparent',
                duration: 0.3
            });
            gsap.to(dot, { opacity: 0, duration: 0.2 });
        } else if (isHovering) {
            // Normal hover mode
            gsap.to(cursor, {
                width: 75,
                height: 75,
                backgroundColor: 'rgba(214, 209, 202, 0.1)',
                borderColor: 'transparent',
                duration: 0.3
            });
            gsap.to(dot, { opacity: 1, duration: 0.2 });
        } else {
            // Default mode
            gsap.to(cursor, {
                width: 30,
                height: 30,
                backgroundColor: 'transparent',
                borderColor: 'rgba(214, 209, 202, 0.5)',
                duration: 0.3
            });
            gsap.to(dot, { opacity: 1, duration: 0.2 });
        }
    }, [isHovering, cursorText]);

    return (
        <>
            <div ref={cursorRef} className={styles.cursorRing}>
                {cursorText && <span className={styles.cursorText}>{cursorText}</span>}
            </div>
            <div ref={cursorDotRef} className={styles.cursorDot} />
        </>
    );
}
