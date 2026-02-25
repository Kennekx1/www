'use client';

import React from 'react';
import Catalog from '@/components/catalog/Catalog';
import CatalogHeroClient from '@/components/catalog/CatalogHeroClient';
import { getAllProducts } from '@/utils/data';
import styles from './catalog.module.scss';
import { useLanguage } from '@/context/LanguageContext';

export default function CatalogPage() {
    const { t } = useLanguage();
    const products = getAllProducts();

    return (
        <main className={styles.catalogWrapper}>
            <CatalogHeroClient />

            <div className={styles.catalogContainer}>
                <div className={styles.innerContent}>
                    <div className={styles.header}>
                        <div className={styles.divider}></div>
                        <p className={styles.description}>
                            {t('catalog.intro')}
                        </p>
                    </div>

                    <Catalog products={products} />
                </div>
            </div>
        </main>
    );
}
