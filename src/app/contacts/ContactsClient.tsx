'use client';

import React from 'react';
import styles from './ContactsClient.module.scss';
import Image from 'next/image';
import Reveal from '@/components/common/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactsClient({ product }: { product?: string }) {
    const { t } = useLanguage();

    return (
        <main className={styles.splitLayout}>
            {/* Left Side: Parallax Image */}
            <div className={styles.imagePanel}>
                <Image
                    src="/assets/original/images/products/essay.jpg"
                    alt="Vittorio Parfum Environment"
                    fill
                    priority
                    className={styles.bgImage}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                    <Reveal direction="up">
                        <h1 className={styles.mainTitle}>{t('nav.contacts')}</h1>
                        <p className={styles.subtitle}>{t('footer.contactUs')}</p>
                    </Reveal>
                </div>
            </div>

            {/* Right Side: Content & Form */}
            <div className={styles.contentPanel}>
                <div className={styles.innerContent}>
                    <div className={styles.header}>
                        <Reveal>
                            <h2>{t('nav.connect')}</h2>
                            <div className={styles.divider}></div>
                            <p className={styles.description}>
                                {t('footer.subscribeConsent')}
                            </p>
                        </Reveal>
                    </div>

                    <div className={styles.mainArea}>
                        {/* Contact Details */}
                        <div className={styles.contactDetails}>
                            <Reveal direction="up" delay={0.1}>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>{t('common.phone')}</span>
                                    <a href="tel:+77051234567">+7 (705) 123-45-67</a>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Email</span>
                                    <a href="mailto:info@vittorio-parfum.ru">info@vittorio-parfum.ru</a>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>{t('nav.shops')}</span>
                                    <div className={styles.addresses}>
                                        <div className={styles.city}>
                                            <strong>АЛМАТЫ</strong>
                                            <span>ТРЦ MEGA Center Alma-Ata</span>
                                        </div>
                                        <div className={styles.city}>
                                            <strong>АСТАНА</strong>
                                            <span>ТЦ Ханшатыр</span>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <Reveal direction="up" delay={0.2}>
                                <h3>{product ? `${t('common.order')}: ${product}` : t('common.send')}</h3>
                                <form className={styles.form} action="/thanks" method="GET">
                                    <div className={styles.inputGroup}>
                                        <input type="text" placeholder={t('common.name')} required name="name" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input type="tel" placeholder={t('common.phone')} required name="phone" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <textarea placeholder={t('common.message')} name="message"></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitBtn}>
                                        {t('common.send')} <span>→</span>
                                    </button>
                                </form>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal direction="up" delay={0.4}>
                        <div className={styles.concierge}>
                            <p className={styles.conciergeText}>Или свяжитесь с нами напрямую:</p>
                            <a href="https://wa.me/77051234567" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                                WHATSAPP КОНСЬЕРЖ
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}
