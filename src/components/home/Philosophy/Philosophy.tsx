'use client';

import React, { useRef } from 'react';
import styles from './Philosophy.module.scss';
import Image from 'next/image';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

export default function Philosophy() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!scrollRef.current) return;

        gsap.to(scrollRef.current, {
            x: '-20%',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.philosophy} ref={containerRef}>
            <div className={styles.backgroundImage}>
                <Image
                    src="/assets/original/images/welcome/perfumer_portrait.jpg"
                    alt="Philosophy Background"
                    fill
                    className={styles.img}
                />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.scrollingText} ref={scrollRef}>
                VITTORIO &nbsp; • &nbsp; {t('home.philosophyTitle')} &nbsp; • &nbsp; VITTORIO &nbsp; • &nbsp; {t('home.philosophyTitle')}
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.content}>
                        <Reveal direction="up">
                            <span className={styles.label}>{t('home.philosophyTitle')}</span>
                            <h2 className={styles.title}>{t('home.transitionBanner')}</h2>
                            <p className={styles.text}>
                                {t('history.intro')}
                            </p>
                            <p className={styles.text} style={{ marginTop: '1.5rem', opacity: 0.6 }}>
                                {t('history.passion')}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
