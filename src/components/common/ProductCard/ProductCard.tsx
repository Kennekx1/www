'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Product } from '@/utils/data';

import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`} className={styles.card}>
            <div className={styles.imageContainer}>
                {product.is_new && <span className={styles.newBadge}>Новинка</span>}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
                <div className={styles.discoverOverlay}>
                    <span>Узнать больше</span>
                </div>
            </div>

            <div className={styles.info}>
                <span className={styles.collection}>{product.collection}</span>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>{product.price_3ml}</p>

                {/* Decorative animated line */}
                <div className={styles.line} />
            </div>
        </Link>
    );
}
