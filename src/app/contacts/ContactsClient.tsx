'use client';

import React from 'react';
import styles from './ContactsClient.module.scss';
import Image from 'next/image';
import Reveal from '@/components/common/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactsClient({ product }: { product?: string }) {
    const { t } = useLanguage();

    return (
        <main className={styles.contactsPage}>
            <div className={styles.hero}>
                <Image
                    src="/assets/original/images/products/essay.jpg"
                    alt="Contacts"
                    fill
                    priority
                    className={styles.heroImg}
                />
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                    <Reveal direction="up">
                        <h1 className={styles.title}>{t('nav.contacts')}</h1>
                    </Reveal>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <Reveal direction="up">
                            <h2 className={styles.heading}>{t('footer.contactUs')}</h2>
                            <div className={styles.item}>
                                <span>{t('common.phone')}</span>
                                <a href="tel:+77051234567">+7 (705) 123-45-67</a>
                            </div>
                            <div className={styles.item}>
                                <span>Email</span>
                                <a href="mailto:info@vittorio-parfum.ru">info@vittorio-parfum.ru</a>
                            </div>
                            <div className={styles.item}>
                                <span>{t('nav.shops')}</span>
                                <p>Алматы, ТРЦ MEGA Center Alma-Ata</p>
                                <p>Астана, ТЦ Ханшатыр</p>
                            </div>
                        </Reveal>
                    </div>

                    <div className={styles.formSection}>
                        <Reveal direction="up" delay={0.2}>
                            <form className={styles.form} action="/thanks" method="GET">
                                <h3 className={styles.formTitle}>
                                    {product ? `${t('common.order')}: ${product}` : t('nav.connect')}
                                </h3>
                                <div className={styles.formGroup}>
                                    <input type="text" placeholder={t('common.name')} required name="name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="tel" placeholder={t('common.phone')} required name="phone" />
                                </div>
                                <div className={styles.formGroup}>
                                    <textarea placeholder={t('common.message')} rows={4} name="message"></textarea>
                                </div>
                                <button type="submit" className={styles.submitBtn}>
                                    {t('common.send')}
                                </button>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </div>
        </main>
    );
}
