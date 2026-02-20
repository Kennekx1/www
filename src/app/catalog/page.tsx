import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Catalog from '@/components/catalog/Catalog';
import { getAllProducts } from '@/utils/data';
import styles from './catalog.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Коллекция Ароматов | Vittorio Parfum',
    description: 'Уникальные ароматы Vittorio Parfum для ценителей парфюмерного искусства.',
};

export default function CatalogPage() {
    const products = getAllProducts();

    return (
        <main className={styles.catalogWrapper}>
            <section className={styles.heroSection}>
                <Image
                    src="/assets/images/banners/page-07.jpg"
                    alt="Vittorio Parfum Collection"
                    fill
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <div className={styles.breadcrumbs}>
                        <Link href="/">Главная</Link>
                        <span>•</span>
                        <span style={{ fontWeight: 600 }}>Коллекция ароматов</span>
                    </div>
                    <h1 className={styles.heroTitle}>КОЛЛЕКЦИЯ АРОМАТОВ</h1>
                </div>
            </section>

            <div className={styles.catalogContainer}>
                <div className={styles.innerContent}>
                    <div className={styles.header}>
                        <div className={styles.divider}></div>
                        <p className={styles.description}>
                            Долгое время ароматы Витторио были доступны лишь избранным. Сегодня бренд Vittorio рад представить свою новую линейку уникальных ароматов для ценителей парфюмерного искусства в России. Мы понимаем, что настоящая магия ароматов должна быть доступна каждому, кто ценит подлинную красоту и элегантность. Вдохновлённый богатством культур и природы, Витторио создал коллекцию, которая объединяет в себе его непревзойдённое мастерство и доступность для широкой аудитории.
                        </p>
                    </div>

                    <Catalog products={products} />
                </div>
            </div>
        </main>
    );
}
