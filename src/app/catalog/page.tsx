import React from 'react';
import Catalog from '@/components/catalog/Catalog';
import CatalogHeroClient from '@/components/catalog/CatalogHeroClient';
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
            <CatalogHeroClient />

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
