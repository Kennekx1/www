'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/app/catalog/catalog.module.scss';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CatalogHeroClient() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Subtle Parallax on the background image
        gsap.to(imageRef.current, {
            y: "20%",
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        // Fade and move up the text content slightly faster
        gsap.to(contentRef.current, {
            y: -50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: sectionRef });

    return (
        <section className={styles.heroSection} ref={sectionRef}>
            <Image
                ref={imageRef}
                src="/assets/images/banners/catalog_hero_bottles.png"
                alt="Vittorio Parfum Collection"
                fill
                priority
                unoptimized={true}
                quality={100}
                className={styles.heroImage}
                style={{ objectPosition: 'center 40%' }}
            />
            {/* Vintage dust/scratches overlay exactly like About page */}
            <div className={styles.heroNoiseOverlay}></div>

            <div className={styles.heroOverlay}></div>
            <div className={styles.heroContent} ref={contentRef}>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Главная</Link>
                    <span>•</span>
                    <span style={{ fontWeight: 600 }}>Коллекция ароматов</span>
                </div>
                <h1 className={styles.heroTitle}>КОЛЛЕКЦИЯ АРОМАТОВ</h1>
            </div>
        </section>
    );
}
