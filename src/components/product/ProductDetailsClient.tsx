'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/utils/data';
import styles from './ProductDetailsClient.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProductDetailsClientProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const pyramidRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Parallax effect for the image
            gsap.to(imageRef.current?.querySelector('img') || null, {
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Sticky-like effect or reveal for info section
            gsap.from(infoRef.current?.children || [], {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
        });

        // Common animations
        const noteItems = pyramidRef.current?.querySelectorAll(`.${styles.noteGroup}`);
        if (noteItems) {
            gsap.from(noteItems, {
                x: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: pyramidRef.current,
                    start: 'top 85%',
                }
            });
        }

    }, { scope: containerRef });

    const notes = product.notes;

    return (
        <div className={styles.productPage} ref={containerRef}>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>

            <div className={styles.productContainer}>
                {/* Image Section */}
                <div className={styles.imageSection} ref={imageRef}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority
                            className={styles.mainImage}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className={styles.productTag}>Vittorio Collection</div>
                </div>

                {/* Info Section */}
                <div className={styles.infoSection} ref={infoRef}>
                    <Link href="/catalog" className={styles.backLink}>
                        <span className={styles.arrow}>←</span> НАЗАД В КАТАЛОГ
                    </Link>

                    <div className={styles.header}>
                        <span className={styles.collection}>{product.collection}</span>
                        <h1 className={styles.title}>{product.name}</h1>
                        <span className={styles.group}>{product.group}</span>
                    </div>

                    <p className={styles.shortDesc}>
                        {product.description.split('.')[0]}. Бескомпромиссное качество ингредиентов и аутентичность в каждом флаконе.
                    </p>

                    <div className={styles.configurator}>
                        <div className={styles.configLabel}>Объем:</div>
                        <div className={styles.volumeValue}>
                            <span className={styles.vol}>100 мл</span>
                            <span className={styles.priceDivider}>—</span>
                            <span className={styles.finalPrice}>{product.price_100ml}</span>
                        </div>
                    </div>

                    {/* Pyramid Section */}
                    <div className={styles.pyramidSection}>
                        <h3 className={styles.sectionTitle}>Пирамида аромата</h3>
                        <div className={styles.pyramid} ref={pyramidRef}>
                            <div className={styles.pyramidLine}></div>

                            {typeof notes === 'object' && !Array.isArray(notes) && (
                                <>
                                    <div className={styles.noteGroup}>
                                        <div className={styles.notePoint}></div>
                                        <div className={styles.noteLabel}>Верхние ноты</div>
                                        <div className={styles.noteValues}>
                                            {notes.upper.map((n, i) => (
                                                <span key={i} className={styles.note}>{n}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.noteGroup}>
                                        <div className={styles.notePoint}></div>
                                        <div className={styles.noteLabel}>Ноты сердца</div>
                                        <div className={styles.noteValues}>
                                            {notes.heart.map((n, i) => (
                                                <span key={i} className={styles.note}>{n}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.noteGroup}>
                                        <div className={styles.notePoint}></div>
                                        <div className={styles.noteLabel}>Базовые ноты</div>
                                        <div className={styles.noteValues}>
                                            {notes.base.map((n, i) => (
                                                <span key={i} className={styles.note}>{n}</span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href={`/contacts?product=${product.slug}`} className={styles.btnPrimary}>
                            Оформить заказ
                        </Link>
                        <button className={styles.btnSecondary}>
                            Найти в Beautymania
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Story Section */}
            <section className={styles.storySection}>
                <div className={styles.storyContent}>
                    <div className={styles.storyLabel}>История создания</div>
                    <h2>Голос Маэстро</h2>
                    <p>Италия — это мой дом, моё вдохновение и моё начало. С детства я впитывал ароматы узких улочек, цветущих садов и солёного морского ветра.</p>
                    <p>{product.description}</p>
                    <p className={styles.quote}>
                        &quot;{product.name} — это не просто парфюм. Это отрывок из моей жизни, запечатанный во флаконе. Я хотел передать ту самую секунду абсолютного счастья.&quot;
                    </p>
                    <div className={styles.signature}>Vittorio</div>
                </div>
            </section>
        </div>
    );
}
