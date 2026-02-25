'use client';

import React, { useRef } from 'react';
import styles from './CatalogHeroClient.module.scss';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/common/Reveal';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CatalogHeroClient() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(bgRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.hero} ref={containerRef}>
            <div className={styles.bgWrapper} ref={bgRef}>
                <Image
                    src="/assets/images/banners/page-11.jpg"
                    alt="Catalog Collection"
                    fill
                    priority
                    className={styles.bgImage}
                />
                <div className={styles.noise}></div>
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.content}>
                <Reveal direction="up">
                    <div className={styles.breadcrumbs}>
                        <Link href="/">{t('nav.home')}</Link> / <span>{t('nav.catalog')}</span>
                    </div>
                    <h1 className={styles.title}>{t('catalog.title')}</h1>
                </Reveal>
            </div>
        </section>
    );
}
