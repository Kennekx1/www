'use client';

import React from 'react';
import styles from './AromaJournal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/common/Reveal';

const journalEntries = [
    {
        id: 'italy',
        location: 'Italy, Amalfi Coast',
        coordinates: '40.6333° N, 14.6022° E',
        fragrance: 'Santal & Leather',
        description: 'Warm limestone cliffs, the salt of the Tyrrhenian Sea, and the deep, masculine soul of aged leather. A sunset captured in a bottle.',
        image: '/journal_italy.png',
        slug: 'santal-leather'
    },
    {
        id: 'morocco',
        location: 'Morocco, Sahara',
        coordinates: '31.1728° N, 3.9750° W',
        fragrance: 'Protagonist',
        description: 'The silence of the dunes at twilight. Spices from a distant caravan, saffron, and mysterious oud. The scent of a desert nomad.',
        image: '/journal_morocco.png',
        slug: 'protagonist'
    },
    {
        id: 'japan',
        location: 'Japan, Kyoto',
        coordinates: '35.0116° N, 135.7681° E',
        fragrance: 'Musk Melody',
        description: 'Early morning mist in a moss garden. The purity of white musk, cedarwood, and the untouchable elegance of a tea ceremony.',
        image: '/journal_japan.png',
        slug: 'musk-melody'
    }
];

const AromaJournal: React.FC = () => {
    return (
        <section className={styles.aromaJournal}>
            <div className={styles.leatherBg} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <Reveal>
                        <span className={styles.subtitle}>Curated Origins</span>
                    </Reveal>
                    <Reveal>
                        <h2 className={styles.title}>ОЛЬФАКТОРНЫЙ ДНЕВНИК</h2>
                    </Reveal>
                </div>

                <div className={styles.journalEntries}>
                    {journalEntries.map((entry, index) => (
                        <div
                            key={entry.id}
                            className={`${styles.entry} ${index % 2 === 0 ? styles.even : styles.odd}`}
                        >
                            <div className={styles.imageWrapper}>
                                <Reveal>
                                    <div className={styles.photoFrame}>
                                        <Image
                                            src={entry.image}
                                            alt={entry.fragrance}
                                            width={600}
                                            height={600}
                                            className={styles.image}
                                        />
                                        <div className={styles.handwrittenCoords}>{entry.coordinates}</div>
                                    </div>
                                </Reveal>
                            </div>

                            <div className={styles.content}>
                                <Reveal delay={0.2}>
                                    <span className={styles.location}>{entry.location}</span>
                                </Reveal>
                                <Reveal delay={0.3}>
                                    <h3 className={styles.fragranceName}>{entry.fragrance}</h3>
                                </Reveal>
                                <Reveal delay={0.4}>
                                    <p className={styles.description}>{entry.description}</p>
                                </Reveal>
                                <Reveal delay={0.5}>
                                    <Link href={`/catalog/${entry.slug}`} className={styles.exploreLink}>
                                        УЗНАТЬ ИСТОРИЮ
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </Reveal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footerText}>
                THE ART OF DISCOVERY • 2026
            </div>
        </section>
    );
};

export default AromaJournal;
