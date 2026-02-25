'use client';

import React, { useRef } from 'react';
import styles from './ScrollIndicator.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollIndicator() {
    const { t } = useLanguage();
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(lineRef.current, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            repeat: -1,
            ease: "power2.inOut"
        });
    }, { scope: lineRef });

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.scrollIndicator} onClick={handleScroll}>
            <span className={styles.text}>{t('common.scroll')}</span>
            <div className={styles.lineWrapper}>
                <div className={styles.line} ref={lineRef}></div>
            </div>
        </div>
    );
}
