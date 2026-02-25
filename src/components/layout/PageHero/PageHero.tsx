'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PageHero.module.scss';
import { useLanguage } from '@/context/LanguageContext';

interface PageHeroProps {
    title: string;
    image?: string;
}

export default function PageHero({ title, image }: PageHeroProps) {
    const { t } = useLanguage();
    return (
        <section className={`${styles.hero} ${!image ? styles.typographic : ''}`}>
            {image && (
                <Image
                    src={image}
                    alt={title}
                    fill
                    className={styles.image}
                    priority
                />
            )}

            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">{t('nav.home')}</Link> / <span>{title}</span>
                </div>
            </div>
        </section>
    );
}
