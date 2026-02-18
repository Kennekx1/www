import React from 'react';
import PageHero from '@/components/layout/PageHero/PageHero';
import styles from './shops.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Наши Бутики | Vittorio Parfum',
    description: 'Посетите наши эксклюзивные бутики и авторизованные точки продаж Vittorio Parfum.',
};

export default function ShopsPage() {
    return (
        <main>
            <PageHero
                title="Наши Бутики"
            />

            <div className={styles.container}>
                <div className={styles.textBlock}>
                    <p>Познакомьтесь с ароматами Vittorio в наших флагманских бутиках и у авторизованных партнеров.</p>
                </div>

                <div className={styles.grid}>
                    {/* Almaty Flagship */}
                    <div className={styles.shopCard}>
                        <h3>Алматы Flagship</h3>
                        <p className={styles.address}>Dostyk Plaza, 1-й этаж</p>
                        <p className={styles.city}>Алматы, Казахстан</p>
                        <div className={styles.hours}>
                            <span>Ежедневно:</span>
                            <span>10:00 - 22:00</span>
                        </div>
                        <button className={styles.mapButton}>Показать на карте</button>
                    </div>

                    {/* Astana Esentai */}
                    <div className={styles.shopCard}>
                        <h3>Астана Esentai</h3>
                        <p className={styles.address}>Esentai Mall, 2-й этаж</p>
                        <p className={styles.city}>Астана, Казахстан</p>
                        <div className={styles.hours}>
                            <span>Ежедневно:</span>
                            <span>10:00 - 22:00</span>
                        </div>
                        <button className={styles.mapButton}>Показать на карте</button>
                    </div>

                    {/* Moscow Boutique */}
                    <div className={styles.shopCard}>
                        <h3>Москва Boutique</h3>
                        <p className={styles.address}>Универмаг «Цветной»</p>
                        <p className={styles.city}>Москва, Россия</p>
                        <div className={styles.hours}>
                            <span>Ежедневно:</span>
                            <span>10:00 - 22:00</span>
                        </div>
                        <button className={styles.mapButton}>Показать на карте</button>
                    </div>
                </div>

                {/* Map Placeholder with SVG background */}
                <div className={styles.mapPlaceholder}>
                    <div className={styles.mapBg} style={{ backgroundImage: 'url("/assets/original/images/new-map.svg")' }} />
                    <div className={styles.mapContent}>
                        <span>Интерактивная карта бутиков</span>
                        <p>В разработке</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
