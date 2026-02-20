import React from 'react';
import Image from 'next/image';
import styles from './contacts.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты | Vittorio Parfum',
    description: 'Свяжитесь с командой Vittorio Parfum для консультации и заказов.',
};

export default function ContactsPage() {
    return (
        <main className={styles.splitLayout}>
            {/* Left Side: High-res Brand Image */}
            <div className={styles.imagePanel}>
                <Image
                    src="/assets/images/banners/page-19.jpg"
                    alt="Vittorio Boutique Atmosphere"
                    fill
                    priority
                    className={styles.bgImage}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                    <h1 className={styles.mainTitle}>ВИТТОРИО</h1>
                    <p className={styles.subtitle}>ПЕРСОНАЛЬНЫЙ СЕРВИС</p>
                </div>
            </div>

            {/* Right Side: Contact Form & Details */}
            <div className={styles.contentPanel}>
                <div className={styles.innerContent}>
                    <div className={styles.header}>
                        <h2>Свяжитесь с нами</h2>
                        <div className={styles.divider}></div>
                        <p className={styles.description}>
                            Наша команда консьержей готова помочь вам в погружении в мир Vittorio.
                            Оставьте заявку, и мы свяжемся с вами для проведения персональной консультации
                            и помощи в подборе вашего идеального аромата.
                        </p>
                    </div>

                    <div className={styles.contactDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Email:</span>
                            <a href="mailto:info@vittorio-parfum.ru">info@vittorio-parfum.ru</a>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Телефон:</span>
                            <a href="tel:+77051234567">+7 (705) 123-45-67</a>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Бутик:</span>
                            <span>Алматы, пр. Достык 12</span>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h3>Оставить заявку</h3>
                        <form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <input type="text" id="name" placeholder="ВАШЕ ИМЯ" required />
                            </div>
                            <div className={styles.inputGroup}>
                                <input type="tel" id="phone" placeholder="ТЕЛЕФОН" required />
                            </div>
                            <div className={styles.inputGroup}>
                                <textarea id="message" placeholder="КОММЕНТАРИЙ (ОПЦИОНАЛЬНО)"></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn}>ОТПРАВИТЬ ЗАПРОС</button>
                        </form>
                    </div>

                    <div className={styles.concierge}>
                        <p className={styles.conciergeText}>Или свяжитесь с нами напрямую:</p>
                        <a href="https://wa.me/77051234567" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                            WHATSAPP КОНСЬЕРЖ
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
