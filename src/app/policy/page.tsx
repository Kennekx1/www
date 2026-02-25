'use client';

import React from 'react';
import PageHero from '@/components/layout/PageHero/PageHero';
import styles from '@/styles/pages/info-page.module.scss';
import { useLanguage } from '@/context/LanguageContext';

export default function PolicyPage() {
    const { t } = useLanguage();

    return (
        <main>
            <PageHero title={t('policy.heroTitle')} />

            <div className={styles.container}>
                <article className={styles.content}>
                    <section>
                        <h2>{t('policy.general')}</h2>
                        <p>{t('policy.generalText')}</p>
                        <p>{t('footer.subscribeConsent')}.</p>
                    </section>

                    <section>
                        <h2>{t('policy.data')}</h2>
                        <p>{t('policy.dataText')}</p>
                        <ul>
                            {t('policy.dataList').split(';').map((item, i) => (
                                <li key={i}>{item.trim()}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('policy.purpose')}</h2>
                        <p>{t('policy.purposeText')}</p>
                    </section>
                </article>
            </div>
        </main>
    );
}
