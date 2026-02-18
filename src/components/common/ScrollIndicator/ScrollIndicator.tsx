'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './ScrollIndicator.module.scss';

gsap.registerPlugin(useGSAP);

export default function ScrollIndicator() {
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(lineRef.current, {
            y: '100%',
            duration: 1.5,
            repeat: -1,
            ease: 'power2.inOut',
            modifiers: {
                y: gsap.utils.unitize((y) => parseFloat(y) % 100) // seamless loop attempt, or just simple fromTo
            }
        });

        // Better simple loop
        gsap.fromTo(lineRef.current,
            { y: '-100%' },
            { y: '100%', duration: 1.5, repeat: -1, ease: 'power2.inOut' }
        );
    }, { scope: lineRef });

    const handleScroll = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className={styles.indicator} onClick={handleScroll}>
            <span className={styles.text}>Scroll</span>
            <div className={styles.line}>
                <div ref={lineRef} style={{ width: '100%', height: '100%', background: '#fff', position: 'absolute', top: 0, left: 0 }} />
            </div>
        </div>
    );
}
