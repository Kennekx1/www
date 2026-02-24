'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Product } from '@/utils/data';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current || !overlayRef.current) return;

        const overlay = overlayRef.current;
        const xTo = gsap.quickTo(overlay, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(overlay, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = cardRef.current!.getBoundingClientRect();

            // Calculate relative position (-0.5 to 0.5)
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            // Move overlay slightly towards the mouse (magnetic/parallax effect)
            xTo(x * 60);
            yTo(y * 60);
        };

        const onMouseEnter = () => {
            gsap.to(overlay, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });

            // Animate text reveal in info section
            const infoElements = infoRef.current?.children;
            if (infoElements) {
                gsap.to(infoElements, {
                    y: -5,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        };

        const onMouseLeave = () => {
            gsap.to(overlay, { opacity: 0, scale: 0.8, x: 0, y: 0, duration: 0.4, ease: "power2.inOut" });

            // Reset info section
            const infoElements = infoRef.current?.children;
            if (infoElements) {
                gsap.to(infoElements, {
                    y: 0,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            }
        };

        cardRef.current.addEventListener('mousemove', onMouseMove);
        cardRef.current.addEventListener('mouseenter', onMouseEnter);
        cardRef.current.addEventListener('mouseleave', onMouseLeave);

        return () => {
            cardRef.current?.removeEventListener('mousemove', onMouseMove);
            cardRef.current?.removeEventListener('mouseenter', onMouseEnter);
            cardRef.current?.removeEventListener('mouseleave', onMouseLeave);
        };
    }, { scope: cardRef });

    return (
        <Link href={`/product/${product.slug}`} className={styles.card} ref={cardRef}>
            <div className={styles.imageContainer} ref={imageContainerRef}>
                {product.is_new && <span className={styles.newBadge}>Новинка</span>}

                {/* Main Image */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    priority={priority}
                />

                {/* Hover Image (Swap) */}
                {product.image_hover && (
                    <Image
                        src={product.image_hover}
                        alt={`${product.name} alternate view`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.imageHover}
                    />
                )}

                <div className={styles.discoverOverlay} ref={overlayRef}>
                    <span>ПОДРОБНЕЕ</span>
                </div>
            </div>

            <div className={styles.info} ref={infoRef}>
                <span className={styles.collection}>{product.collection}</span>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>{product.price_100ml}</p>

                {/* Decorative animated line */}
                <div className={styles.line} />
            </div>
        </Link>
    );
}
