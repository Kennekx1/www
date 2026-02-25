'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ProductDetailsClient.module.scss';
import { Product, LocalizedString, LocalizedArray } from '@/utils/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/common/Reveal';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsProps) {
    const { language, t } = useLanguage();
    const [selectedVolume, setSelectedVolume] = useState<'3ml' | '100ml'>('100ml');
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    const getLoc = (field: LocalizedString) => {
        if (typeof field === 'string') return field;
        return field?.[language as 'ru' | 'kk'] || (field as any)?.['ru'] || '';
    };

    const getLocNotes = (notesField: LocalizedArray | string[]): string[] => {
        if (Array.isArray(notesField)) return notesField;
        return (notesField as any)?.[language] || (notesField as any)?.['ru'] || [];
    };

    useGSAP(() => {
        gsap.to(heroImageRef.current, {
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

    if (!product) return null;

    const notes = typeof product.notes === 'object' && !Array.isArray(product.notes) ? product.notes : null;

    return (
        <div className={styles.productPage} ref={containerRef}>
            <section className={styles.hero}>
                <div className={styles.heroBg} ref={heroImageRef}>
                    <Image
                        src={product.image_hover || product.image}
                        alt={product.name}
                        fill
                        priority
                        className={styles.heroImg}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>

                <div className={styles.breadcrumbNav}>
                    <Link href="/catalog" className={styles.backLink}>
                        ← {t('product.backToCatalog')}
                    </Link>
                </div>

                <div className={styles.heroContent}>
                    <Reveal direction="up">
                        <span className={styles.collectionLabel}>{t('product.vittorioCollection')}</span>
                        <h1 className={styles.productName}>{product.name}</h1>
                        <p className={styles.productGroup}>{getLoc(product.group || '')}</p>
                    </Reveal>
                </div>
            </section>

            <section className={styles.configurator}>
                <div className={styles.container}>
                    <div className={styles.layout}>
                        <div className={styles.imageColumn}>
                            <Reveal direction="right">
                                <div className={styles.productWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={600}
                                        height={800}
                                        className={styles.mainProductImage}
                                    />
                                </div>
                            </Reveal>
                        </div>

                        <div className={styles.infoColumn}>
                            <Reveal direction="up">
                                <div className={styles.description}>
                                    {getLoc(product.description)}
                                </div>

                                <div className={styles.volumeSelector}>
                                    <span className={styles.selectorLabel}>{t('product.selectVolume')}</span>
                                    <div className={styles.volumeOptions}>
                                        <button
                                            className={`${styles.volumeBtn} ${selectedVolume === '3ml' ? styles.active : ''} ${!product.price_3ml ? styles.disabled : ''}`}
                                            onClick={() => product.price_3ml && setSelectedVolume('3ml')}
                                        >
                                            3 {t('product.ml')}
                                        </button>
                                        <button
                                            className={`${styles.volumeBtn} ${selectedVolume === '100ml' ? styles.active : ''}`}
                                            onClick={() => setSelectedVolume('100ml')}
                                        >
                                            100 {t('product.ml')}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.priceContainer}>
                                    <span className={styles.price}>
                                        {selectedVolume === '100ml' ? product.price_100ml : product.price_3ml}
                                    </span>
                                </div>

                                <div className={styles.actions}>
                                    <Link href={`/contacts?product=${product.slug}`} className={styles.orderBtn}>
                                        {t('product.checkAvailability')}
                                    </Link>
                                    <a
                                        href={`https://wa.me/77051234567?text=${encodeURIComponent(`${t('common.order')} ${product.name} (${selectedVolume})`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.whatsappBtn}
                                    >
                                        {t('product.whatsapp')}
                                    </a>
                                </div>
                            </Reveal>

                            {notes && (
                                <div className={styles.pyramid}>
                                    <Reveal direction="up" delay={0.2}>
                                        <h3 className={styles.pyramidTitle}>{t('product.layers')}</h3>

                                        <div className={styles.noteGroup}>
                                            <span className={styles.groupLabel}>{t('product.upper')}</span>
                                            <div className={styles.noteList}>
                                                {getLocNotes(notes.upper).map((note: string, i: number) => (
                                                    <span key={i} className={styles.noteItem}>{note}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.noteGroup}>
                                            <span className={styles.groupLabel}>{t('product.heart')}</span>
                                            <div className={styles.noteList}>
                                                {getLocNotes(notes.heart).map((note: string, i: number) => (
                                                    <span key={i} className={styles.noteItem}>{note}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.noteGroup}>
                                            <span className={styles.groupLabel}>{t('product.base')}</span>
                                            <div className={styles.noteList}>
                                                {getLocNotes(notes.base).map((note: string, i: number) => (
                                                    <span key={i} className={styles.noteItem}>{note}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.storySection}>
                <div className={styles.container}>
                    <Reveal direction="up">
                        <span className={styles.storyLabel}>{t('product.storyTitle')}</span>
                        <h2 className={styles.storyTitle}>{t('product.masterVoice')}</h2>
                        <div className={styles.storyContent}>
                            <p className={styles.quote}>
                                «{t(`product.phil_${product.slug.replace('-11-01', '_legend').replace('-leather', '_santal').replace('-of-the-sea', '_voice').replace('-melody', '_musk').replace('-v', '_ethnos').replace('-peony', '_velvet')}`)}»
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
