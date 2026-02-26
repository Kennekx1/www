'use client';

import React, { useRef } from 'react';
import styles from './AromaJournal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AromaJournal: React.FC = () => {
    const { language, t } = useLanguage();
    const containerRef = useRef<HTMLElement>(null);

    const journalEntries = [
        {
            location: { ru: "ИТАЛИЯ", kk: "ИТАЛИЯ" },
            title: { ru: "Лигурийское побережье", kk: "Лигурия жағалауы" },
            quote: {
                ru: "«В воздухе разлит аромат спелых цитрусов и морской соли...»",
                kk: "«Ауада піскен цитрус пен теңіз тұзының хош иісі аңқиды...»"
            },
            image: "/assets/images/banners/journal_italy.png",
            align: 'left'
        },
        {
            location: { ru: "МАРОККО", kk: "МАРОККО" },
            title: { ru: "Рынки Марракеша", kk: "Марракеш базарлары" },
            quote: {
                ru: "«Запах специй, кожи и раскаленного солнца на узких улочках...»",
                kk: "«Тар көшелердегі дәмдеуіштердің, былғарының және аптап күннің иісі...»"
            },
            image: "/assets/images/banners/journal_morocco.png",
            align: 'right'
        },
        {
            location: { ru: "ЯПОНИЯ", kk: "ЖАПОНИЯ" },
            title: { ru: "Киото на рассвете", kk: "Таңсәрідегі Киото" },
            quote: {
                ru: "«Тонкий аромат влажного мха и тишины буддийских храмов...»",
                kk: "«Ылғал мүк пен будда храмдарындағы тыныштықтың нәзік хош иісі...»"
            },
            image: "/assets/images/banners/journal_japan.png",
            align: 'left'
        }
    ];

    useGSAP(() => {
        const sections = gsap.utils.toArray(`.${styles.entry}`) as HTMLElement[];

        sections.forEach((section) => {
            const image = section.querySelector(`.${styles.imageWrapper}`) as HTMLElement;
            const text = section.querySelector(`.${styles.textContent}`) as HTMLElement;

            gsap.from(image, {
                opacity: 0,
                x: section.classList.contains(styles.left) ? -50 : 50,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                }
            });

            gsap.from(text, {
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                }
            });

            gsap.to(image.querySelector('img'), {
                y: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        });
    }, { scope: containerRef });

    return (
        <section className={styles.aromaJournal} ref={containerRef} id="journal">
            <div className={styles.leatherTexture}></div>
            <div className={styles.header}>
                <span className={styles.label}>{t('home.journalLabel')}</span>
                <h2 className={styles.title}>{t('home.journalTitle')}</h2>
            </div>

            <div className={styles.entries}>
                {journalEntries.map((entry, index) => (
                    <article
                        key={index}
                        className={`${styles.entry} ${entry.align === 'left' ? styles.left : styles.right}`}
                    >
                        <div className={styles.inner}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={entry.image}
                                    alt={entry.title[language as 'ru' | 'kk']}
                                    fill
                                    className={styles.image}
                                />
                                <div className={styles.imageOverlay}></div>
                            </div>

                            <div className={styles.textContent}>
                                <span className={styles.entryLocation}>{entry.location[language as 'ru' | 'kk']}</span>
                                <h3 className={styles.entryTitle}>{entry.title[language as 'ru' | 'kk']}</h3>
                                <blockquote className={styles.entryQuote}>
                                    {entry.quote[language as 'ru' | 'kk']}
                                </blockquote>
                                <Link href="/about" className={styles.entryLink}>
                                    {t('common.readMore')}
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AromaJournal;
