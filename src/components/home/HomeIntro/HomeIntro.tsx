'use client';

import React, { useRef } from 'react';
import styles from './HomeIntro.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeIntro() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.intro} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Reveal direction="up">
                        <span className={styles.label}>{t('home.introTitle')}</span>
                        <h2 className={styles.title}>
                            Scent of <span className={styles.italic}>Discovery</span>
                        </h2>
                    </Reveal>

                    <Reveal direction="up" delay={0.2}>
                        <p className={styles.description}>
                            {t('home.introText')}
                        </p>
                        <Link href="/about" className={styles.link}>
                            {t('common.more')} —
                        </Link>
                    </Reveal>
                </div>

                <div className={styles.visual}>
                    <div className={styles.imagePanel} ref={imageRef}>
                        <Image
                            src="/assets/original/images/welcome/perfumer_portrait.jpg"
                            alt="Brand Heritage"
                            fill
                            className={styles.bgImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
