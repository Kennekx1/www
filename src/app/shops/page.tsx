'use client';

import React from 'react';
import styles from './shops.module.scss';
import Image from 'next/image';
import Reveal from '@/components/common/Reveal';
import PageHero from '@/components/layout/PageHero/PageHero';
import { useLanguage } from '@/context/LanguageContext';

export default function ShopsPage() {
    const { language, t } = useLanguage();

    const shops = [
        {
            city: { ru: "АЛМАТЫ", kk: "АЛМАТЫ" },
            name: "BEAUTYMANIA",
            location: "ТРЦ MEGA Center Alma-Ata",
            address: {
                ru: "ул. Розыбакиева, 247А",
                kk: "Розыбакиев көшесі, 247А"
            },
            hours: "10:00 – 22:00",
            phone: "+7 (727) 232-25-01"
        },
        {
            city: { ru: "АСТАНА", kk: "АСТАНА" },
            name: "BEAUTYMANIA",
            location: "ТЦ Ханшатыр",
            address: {
                ru: "пр. Туран, 37",
                kk: "Тұран даңғылы, 37"
            },
            hours: "10:00 – 22:00",
            phone: "+7 (7172) 57-02-10"
        }
    ];

    return (
        <main className={styles.shopsPage}>
            <PageHero
                title={t('nav.shops')}
                image="/assets/images/banners/page-04.jpg"
            />

            <section className={styles.intro}>
                <div className={styles.container}>
                    <Reveal direction="up">
                        <span className={styles.label}>{t('shops.heroLabel')}</span>
                        <h2 className={styles.title}>{t('shops.heroTitle')}</h2>
                        <p className={styles.description}>
                            {t('footer.presentedIn')} BEAUTYMANIA.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className={styles.shopsList}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {shops.map((shop, index) => (
                            <div key={index} className={styles.shopCard}>
                                <Reveal direction="up" delay={index * 0.1}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.city}>{shop.city[language as 'ru' | 'kk']}</span>
                                        <h3 className={styles.shopName}>{shop.name}</h3>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.infoRow}>
                                            <strong>{shop.location}</strong>
                                            <p>{shop.address[language as 'ru' | 'kk']}</p>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span>{t('shops.hours')} {shop.hours}</span>
                                            <span>{shop.phone}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardActions}>
                                        <button
                                            className={styles.mapBtn}
                                            data-cursor-text="КАРТА"
                                            onClick={() => document.getElementById('map-teaser')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            {t('shops.showMap')}
                                        </button>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className={styles.mapTeaser} id="map-teaser">
                <div className={styles.mapBg} style={{ backgroundImage: 'url("/assets/original/images/new-map.svg")' }} />
                <div className={styles.teaserContent}>
                    <Reveal>
                        <span className={styles.teaserLabel}>{t('shops.teaserTitle')}</span>
                        <h2 className={styles.teaserHeading}>{t('shops.teaserTitle')}</h2>
                        <p>{t('shops.teaserText')}</p>
                        <a href="mailto:partner@vittorio-parfum.ru" className={styles.partnerLink}>
                            {t('shops.partner')} →
                        </a>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
