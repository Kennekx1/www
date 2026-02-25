'use client';

import React from 'react';
import PageHero from '@/components/layout/PageHero/PageHero';
import styles from '@/styles/pages/info-page.module.scss';
import { useLanguage } from '@/context/LanguageContext';

export default function DeliveryPage() {
    const { t } = useLanguage();

    return (
        <main>
            <PageHero title={t('delivery.title')} />

            <div className={styles.container}>
                <article className={styles.content}>
                    <section>
                        <h2>{t('delivery.deliveryTitle')}</h2>
                        <p>{t('delivery.deliveryText')}</p>
                        <ul>
                            <li><span className={styles.highlight}>{t('delivery.courier')}</span> {t('delivery.courierText')}</li>
                            <li><span className={styles.highlight}>{t('delivery.kazakhstan')}</span> {t('delivery.kazakhstanText')}</li>
                            <li><span className={styles.highlight}>{t('delivery.international')}</span> {t('delivery.internationalText')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2>{t('delivery.paymentTitle')}</h2>
                        <p>{t('delivery.paymentText')}</p>
                        <ul>
                            <li><span className={styles.highlight}>{t('delivery.online')}</span> {t('delivery.onlineText')}</li>
                            <li><span className={styles.highlight}>{t('delivery.onReceipt')}</span> {t('delivery.onReceiptText')}</li>
                            <li><span className={styles.highlight}>{t('delivery.bank')}</span> {t('delivery.bankText')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2>{t('delivery.serviceTitle')}</h2>
                        <p>{t('delivery.serviceText')}</p>
                    </section>
                </article>
            </div>
        </main>
    );
}
