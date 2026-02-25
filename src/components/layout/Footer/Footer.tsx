'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { language, t } = useLanguage();
    return (
        <footer className={styles.footer}>
            <div className={styles.mainContent}>
                {/* Left: Subscription */}
                <div className={styles.column}>
                    <h3 className={styles.title}>{t('footer.subscribeTitle')}</h3>
                    <p className={styles.subtitle}>{t('footer.subscribeSubtitle')}</p>
                    <div className={styles.subscribeForm}>
                        <form action="/thanks" method="GET" className={styles.subscribeForm}>
                            <input type="email" placeholder={t('common.email')} aria-label={t('common.email')} required />
                            <button type="submit" aria-label={t('common.subscribe')}>→</button>
                        </form>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '0.7em', opacity: 0.5, lineHeight: 1.5 }}>
                        {t('footer.subscribeConsent')}
                    </p>
                </div>

                {/* Center: Brand & Socials */}
                <div className={styles.column} style={{ alignItems: 'center' }}>
                    <div className={styles.logo}>
                        VITTORIO
                    </div>
                    <div className={styles.socials}>
                        <a href="https://vk.com/vittoriocouture" target="_blank" rel="noopener noreferrer">Vk</a>
                        <a href="https://t.me/VittorioParfum" target="_blank" rel="noopener noreferrer">Tg</a>
                    </div>
                </div>

                {/* Right: Contacts */}
                <div className={styles.column}>
                    <h3 className={styles.title}>{t('footer.contactUs')}</h3>
                    <a href="tel:+77051234567" className={styles.contactLink}>+7 (705) 123-45-67</a>
                    <a href="mailto:info@vittorio-parfum.ru" className={styles.contactLink}>info@vittorio-parfum.ru</a>

                    <div style={{ marginTop: '20px', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.7 }}>
                        {t('footer.presentedIn')}
                    </div>
                    <div className={styles.partnerLogo}>
                        BEAUTYMANIA
                    </div>
                    <div className={styles.locations}>
                        <div className={styles.locItem}>
                            <strong>{language === 'ru' ? 'АЛМАТЫ:' : 'АЛМАТЫ:'}</strong> ТРЦ MEGA Center Alma-Ata
                        </div>
                        <div className={styles.locItem}>
                            <strong>{language === 'ru' ? 'АСТАНА:' : 'АСТАНА:'}</strong> ТЦ Ханшатыр
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div>© 2026. Vittorio</div>
                <div className={styles.linksGroup}>
                    <Link href="/delivery" className={styles.link}>{t('footer.delivery')}</Link>
                    <Link href="/policy" className={styles.link}>{t('footer.policy')}</Link>
                </div>
                <div className={styles.legalGroup}>
                    <span>{t('footer.requisites')}</span>
                    <span>{t('footer.ogrn')}</span>
                    <span>{t('footer.inn')}</span>
                    <span style={{ marginTop: '10px' }}>{t('footer.addressLabel')}</span>
                    <span style={{ textAlign: 'right' }}>{t('footer.addressValue')}</span>
                </div>
            </div>
        </footer>
    );
}
