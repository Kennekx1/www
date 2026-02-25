'use client';

import React from 'react';
import PageHero from '@/components/layout/PageHero/PageHero';
import styles from '@/styles/pages/info-page.module.scss';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ThanksPage() {
    const { t } = useLanguage();

    return (
        <main>
            <PageHero title={t('thanks.title')} />
            <div className={styles.container}>
                <div className={styles.content} style={{ textAlign: 'center' }}>
                    <p>{t('thanks.message')}</p>
                    <div style={{ marginTop: '40px' }}>
                        <Link href="/" className={styles.highlight} style={{ textDecoration: 'underline' }}>
                            {t('thanks.button')}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
