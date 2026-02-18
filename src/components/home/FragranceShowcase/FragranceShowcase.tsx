'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/utils/data';
import styles from './FragranceShowcase.module.scss';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseProps {
    products: Product[];
}

export default function FragranceShowcase({ products }: ShowcaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Filter products that have essential data
    const featured = products.filter(p => p.notes).slice(0, 8);

    useGSAP(() => {
        const stories = gsap.utils.toArray(`.${styles.story}`) as HTMLDivElement[];

        stories.forEach((story, i) => {
            // Update active index for navigation
            ScrollTrigger.create({
                trigger: story,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
            });

            // Animate background color transition
            if (featured[i].themeColor) {
                gsap.to(containerRef.current, {
                    backgroundColor: featured[i].themeColor,
                    scrollTrigger: {
                        trigger: story,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: true,
                    }
                });
            }
        });
    }, { scope: containerRef });

    if (!featured.length) return null;

    return (
        <section
            className={styles.showcase}
            ref={containerRef}
            style={{ '--theme-color': featured[activeIndex].themeColor } as React.CSSProperties}
        >
            {/* Background Texture & Watermark */}
            <div className={styles.bgOverlay}>
                <div className={styles.noise}></div>
                <div className={styles.orb}></div>
                <div className={styles.orb}></div>
                <div className={styles.watermarkContainer}>
                    <div className={styles.watermarkText}>
                        {featured[activeIndex].name.split(' ')[0]}
                    </div>
                </div>
            </div>

            {featured.map((product, index) => (
                <div
                    key={product.id}
                    className={styles.story}
                >
                    {/* Left Side: Content */}
                    <div className={styles.contentSide}>
                        <Reveal direction="up" duration={1.2}>
                            <span className={styles.label}>Группа аромата — {product.group}</span>
                            <h2 className={styles.title}>{product.name}</h2>
                            <p className={styles.description}>
                                {product.description}
                            </p>

                            <div className={styles.notesTable}>
                                <div className={styles.row}>
                                    <span className={styles.rowLabel}>группа аромата</span>
                                    <span className={styles.rowValue}>{product.group}</span>
                                </div>
                                {typeof product.notes === 'object' && !Array.isArray(product.notes) && (
                                    <>
                                        <div className={styles.row}>
                                            <span className={styles.rowLabel}>верхние ноты</span>
                                            <span className={styles.rowValue}>{product.notes.upper.join(', ')}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.rowLabel}>ноты сердца</span>
                                            <span className={styles.rowValue}>{product.notes.heart.join(', ')}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.rowLabel}>базовые ноты</span>
                                            <span className={styles.rowValue}>{product.notes.base.join(', ')}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Side: Visual */}
                    <div className={styles.imageSide}>
                        <div className={styles.circleContainer}>
                            <div className={styles.archedText}>
                                <svg viewBox="0 0 500 500">
                                    <path id="curve" d="M 50,250 A 200,200 0 1,1 450,250" fill="transparent" />
                                    <text>
                                        <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                                            VITTORIO &nbsp; • &nbsp; {product.name}
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            <Reveal direction="right" duration={1.2} delay={0.2}>
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
                            </Reveal>

                            <button className={styles.cartButton}>В КОРЗИНУ</button>

                            <div className={styles.priceBar}>
                                <span>100 мл</span>
                                <span>{product.price_100ml}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Sticky Bottom Navigation */}
            <div className={styles.bottomNav}>
                {featured.map((p, i) => (
                    <span
                        key={p.id}
                        className={activeIndex === i ? styles.active : ''}
                        onClick={() => {
                            const target = containerRef.current?.querySelectorAll(`.${styles.story}`)[i];
                            target?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {p.name}
                    </span>
                ))}
            </div>
        </section>
    );
}
