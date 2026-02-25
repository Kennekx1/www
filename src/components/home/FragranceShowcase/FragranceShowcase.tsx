'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Product, LocalizedString, LocalizedArray } from '@/utils/data';
import styles from './FragranceShowcase.module.scss';
import Link from 'next/link';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseProps {
    products: Product[];
}

const ExpandableRow = ({ label, value }: { label: string, value: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;
        if (isOpen) {
            gsap.to(contentRef.current, { height: 'auto', duration: 0.4, opacity: 1, ease: 'power2.out' });
        } else {
            gsap.to(contentRef.current, { height: 0, duration: 0.4, opacity: 0, ease: 'power2.inOut' });
        }
    }, [isOpen]);

    return (
        <div className={`${styles.row} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
            <div className={styles.rowHeader}>
                <span className={styles.rowLabel}>{label}</span>
                <span className={styles.rowToggle}>{isOpen ? '[ — ]' : '[ + ]'}</span>
            </div>
            <div className={styles.rowContent} ref={contentRef} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                <div className={styles.rowValue}>
                    {value}
                </div>
            </div>
        </div>
    );
};

export default function FragranceShowcase({ products }: ShowcaseProps) {
    const { language, t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTracksRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const featured = products.filter(p => p.notes).slice(0, 8);

    const getLoc = (field: LocalizedString) => {
        if (typeof field === 'string') return field;
        return field?.[language as 'ru' | 'kk'] || (field as any)?.['ru'] || '';
    };

    const getLocNotes = (notesField: LocalizedArray | string[]) => {
        if (Array.isArray(notesField)) return notesField.join(', ');
        const currentNotes = (notesField as any)?.[language] || (notesField as any)?.[language === 'ru' ? 'ru' : 'kk'] || (notesField as any)?.['ru'] || [];
        return Array.isArray(currentNotes) ? currentNotes.join(', ') : '';
    };

    useGSAP(() => {
        const ctx = gsap.matchMedia();

        ctx.add("(min-width: 1024px)", () => {
            const amountToScroll = 100 * (featured.length - 1);
            gsap.to(scrollTracksRef.current, {
                x: `-${amountToScroll}vw`,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${window.innerWidth * featured.length}`,
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (featured.length - 1));
                        setActiveIndex(index);
                        if (featured[index]?.themeColor) {
                            gsap.to(containerRef.current, {
                                backgroundColor: featured[index].themeColor,
                                duration: 0.5,
                                overwrite: "auto"
                            });
                        }
                    }
                }
            });
        });

        ctx.add("(max-width: 1023px)", () => {
            const stories = gsap.utils.toArray(`.${styles.story}`) as HTMLElement[];
            stories.forEach((story, i) => {
                ScrollTrigger.create({
                    trigger: story,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
                if (featured[i].themeColor) {
                    gsap.to(containerRef.current, {
                        backgroundColor: featured[i].themeColor,
                        scrollTrigger: { trigger: story, start: 'top center', end: 'bottom center', scrub: true }
                    });
                }
            });
        });

        return () => ctx.revert();
    }, { scope: containerRef });

    if (!featured.length) return null;

    return (
        <section
            className={styles.showcase}
            ref={containerRef}
            style={{ '--theme-color': featured[activeIndex]?.themeColor } as React.CSSProperties}
        >
            <div className={styles.bgOverlay}>
                <div className={styles.noise}></div>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
                <div className={styles.watermarkContainer}>
                    <div className={styles.watermarkText}>
                        {featured[activeIndex]?.name.split(' ')[0]}
                    </div>
                </div>
            </div>

            <div className={styles.scrollWrapper}>
                <div className={styles.scrollTracks} ref={scrollTracksRef} style={{ width: `${featured.length * 100}vw` }}>
                    {featured.map((product, index) => (
                        <div key={product.id} className={styles.story}>
                            <div className={styles.contentSide}>
                                <Reveal direction="up" duration={1.2}>
                                    <span className={styles.label}>{t('product.vittorioCollection')} — {getLoc(product.group || '')}</span>
                                    <h2 className={styles.title}>{product.name}</h2>
                                    <p className={styles.description}>
                                        {getLoc(product.description)}
                                    </p>

                                    <div className={styles.notesTable}>
                                        <ExpandableRow label={t('product.layers')} value={getLoc(product.group || '') || ''} />
                                        {typeof product.notes === 'object' && !Array.isArray(product.notes) && (
                                            <>
                                                <ExpandableRow label={t('product.upper')} value={getLocNotes(product.notes.upper)} />
                                                <ExpandableRow label={t('product.heart')} value={getLocNotes(product.notes.heart)} />
                                                <ExpandableRow label={t('product.base')} value={getLocNotes(product.notes.base)} />
                                            </>
                                        )}
                                    </div>
                                </Reveal>
                            </div>

                            <div className={styles.imageSide}>
                                <div className={styles.circleContainer}>
                                    <div className={styles.archedText}>
                                        <svg viewBox="0 0 500 500">
                                            <path id={`curve-${index}`} d="M 50,250 A 200,200 0 1,1 450,250" fill="transparent" />
                                            <text>
                                                <textPath xlinkHref={`#curve-${index}`} startOffset="50%" textAnchor="middle">
                                                    VITTORIO &nbsp; • &nbsp; {product.name}
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>

                                    <div className={styles.mask}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className={styles.productImg}
                                            priority={index === 0}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>

                                    <Link href={`/product/${product.slug}`} className={styles.cartButton}>
                                        {t('common.more')}
                                    </Link>

                                    <div className={styles.priceBar}>
                                        <span>100 {t('product.ml')}</span>
                                        <span>{product.price_100ml}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.bottomNav}>
                {featured.map((p, i) => (
                    <span
                        key={p.id}
                        className={activeIndex === i ? styles.active : ''}
                        onClick={() => {
                            if (window.innerWidth >= 1024) {
                                const st = ScrollTrigger.getAll().find(t => t.pin === containerRef.current);
                                if (st) {
                                    const progress = i / (featured.length - 1);
                                    const scrollPos = st.start + (st.end - st.start) * progress;
                                    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                                }
                            } else {
                                const target = document.querySelectorAll(`.${styles.story}`)[i];
                                target?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        {p.name}
                    </span>
                ))}
            </div>
        </section>
    );
}
