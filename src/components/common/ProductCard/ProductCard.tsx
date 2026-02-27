'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Product, LocalizedString } from '@/utils/data';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const { language, t } = useLanguage();
    const cardRef = useRef<HTMLAnchorElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        const onMouseEnter = () => {
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

        cardRef.current.addEventListener('mouseenter', onMouseEnter);
        cardRef.current.addEventListener('mouseleave', onMouseLeave);

        return () => {
            cardRef.current?.removeEventListener('mouseenter', onMouseEnter);
            cardRef.current?.removeEventListener('mouseleave', onMouseLeave);
        };
    }, { scope: cardRef });

    const getLoc = (field: LocalizedString) => {
        if (typeof field === 'string') return field;
        return field?.[language as 'ru' | 'kk'] || (field as any)?.['ru'] || '';
    };

    return (
        <Link href={`/product/${product.slug}`} className={styles.card} ref={cardRef} data-cursor-text={t('common.more')}>
            <div className={styles.imageContainer} ref={imageContainerRef}>
                {product.is_new && <span className={styles.newBadge}>New</span>}

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    priority={priority}
                />
            </div>

            <div className={styles.info} ref={infoRef}>
                <span className={styles.collection}>{getLoc(product.collection)}</span>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>{product.price_100ml}</p>
                <div className={styles.line} />
            </div>
        </Link>
    );
}
