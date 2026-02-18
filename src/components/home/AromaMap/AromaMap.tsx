'use client';

import React from 'react';
import styles from './AromaMap.module.scss';
import Image from 'next/image';

const mapPoints = [
    { id: 1, name: 'Italy', x: '48%', y: '35%', fragrance: 'Santal & Leather' },
    { id: 2, name: 'Morocco', x: '45%', y: '45%', fragrance: 'Protagonist' },
    { id: 3, name: 'Japan', x: '85%', y: '40%', fragrance: 'Musk Melody' },
    { id: 4, name: 'Brazil', x: '30%', y: '75%', fragrance: 'Voice of the Sea' },
    { id: 5, name: 'France', x: '46%', y: '30%', fragrance: 'Legend № 11.01' },
];

import Reveal from '@/components/common/Reveal';

export default function AromaMap() {
    return (
        <section className={styles.aromaMap} id="aroma_map">
            <div className={styles.container}>
                <div className={styles.header}>
                    <Reveal>
                        <h2 className={styles.title}>Карта Ароматов</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className={styles.subtitle}>Ольфакторное путешествие воплощенное в географии</p>
                    </Reveal>
                </div>

                <div className={styles.mapWrapper}>
                    <div className={styles.mapContainer}>
                        <Image
                            src="/assets/original/images/new-map.svg"
                            alt="World Aroma Map"
                            fill
                            style={{ objectFit: 'contain' }}
                            className={styles.mapSvg}
                        />

                        {mapPoints.map((point, index) => (
                            <div
                                key={point.id}
                                className={styles.point}
                                style={{ left: point.x, top: point.y }}
                            >
                                <Reveal delay={0.5 + index * 0.1} duration={0.8}>
                                    <div className={styles.pulse}></div>
                                    <div className={styles.dot}></div>
                                    <div className={styles.tooltip}>
                                        <span className={styles.location}>{point.name}</span>
                                        <span className={styles.fragrance}>{point.fragrance}</span>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>

                    <div className={styles.legend}>
                        <Image
                            src="/assets/original/images/map-legend.svg"
                            alt="Map Legend"
                            width={200}
                            height={100}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
