'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getAllProducts, Product } from '@/utils/data';
import styles from './contacts.module.scss';
import Reveal from '@/components/common/Reveal';

function ContactsContent() {
    const searchParams = useSearchParams();
    const productSlug = searchParams.get('product');
    const products = getAllProducts();

    // Find the product if slug is provided
    const product = productSlug ? products.find((p: Product) => p.slug === productSlug) : null;

    // Use product's generated image or the default clean hero
    const bgImage = product?.image || product?.image_hover || "/assets/images/banners/contacts_hero_clean.png";
    const displayName = product ? product.name : "ВИТТОРИО";
    const displaySubtitle = product ? "ОФОРМЛЕНИЕ ЗАКАЗА" : "ПЕРСОНАЛЬНЫЙ СЕРВИС";

    return (
        <main className={styles.splitLayout}>
            {/* Left Side: Dynamic Product/Brand Image */}
            <div className={styles.imagePanel}>
                <Image
                    src={bgImage}
                    alt={displayName}
                    fill
                    priority
                    className={styles.bgImage}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.imageContent}>
                    <Reveal direction="up" delay={0.5}>
                        <h1 className={styles.mainTitle}>{displayName}</h1>
                        <p className={styles.subtitle}>{displaySubtitle}</p>
                    </Reveal>
                </div>
            </div>

            {/* Right Side: Contact Form & Details */}
            <div className={styles.contentPanel}>
                <div className={styles.innerContent}>
                    <Reveal direction="down" delay={0.2}>
                        <div className={styles.header}>
                            <h2>{product ? 'Сведения о заказе' : 'Свяжитесь с нами'}</h2>
                            <div className={styles.divider}></div>
                            <p className={styles.description}>
                                {product
                                    ? `Вы выбрали аромат ${product.name}. Наша команда консьержей свяжется с вами в ближайшее время для уточнения деталей заказа и доставки.`
                                    : 'Наша команда консьержей готова помочь вам в погружении в мир Vittorio. Оставьте заявку, и мы свяжемся с вами для проведения персональной консультации и помощи в подборе вашего идеального аромата.'
                                }
                            </p>
                        </div>
                    </Reveal>

                    <div className={styles.mainArea}>
                        <Reveal direction="up" delay={0.4}>
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
                                    <span className={styles.label}>Бутики:</span>
                                    <div className={styles.addresses}>
                                        <div className={styles.city}>
                                            <strong>АЛМАТЫ</strong>
                                            <span>Beautymania в ТРЦ Mega Center Alma-Ata</span>
                                            <span>ул. Розыбакиева 247а</span>
                                        </div>
                                        <div className={styles.city}>
                                            <strong>АСТАНА</strong>
                                            <span>Beautymania в ТЦ Ханшатыр</span>
                                            <span>пр. Туран 37</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={0.6}>
                            <div className={styles.formSection}>
                                <h3>{product ? 'Подтвердить заказ' : 'Оставить заявку'}</h3>
                                <form className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <input type="text" id="name" placeholder="ВАШЕ ИМЯ" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input type="tel" id="phone" placeholder="ТЕЛЕФОН" required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <textarea
                                            id="message"
                                            placeholder="КОММЕНТАРИЙ (ОПЦИОНАЛЬНО)"
                                            rows={1}
                                            defaultValue={product ? `Заказ: ${product.name}` : ''}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitBtn} data-cursor-text="ОТПРАВИТЬ">
                                        {product ? 'ПОДТВЕРДИТЬ ЗАКАЗ' : 'ОТПРАВИТЬ ЗАЯВКУ'} <span>→</span>
                                    </button>
                                </form>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal direction="up" delay={0.8}>
                        <div className={styles.concierge}>
                            <p className={styles.conciergeText}>Или свяжитесь с нами напрямую:</p>
                            <a href="https://wa.me/77051234567" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn} data-cursor-text="WHATSAPP">
                                WHATSAPP КОНСЬЕРЖ
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </main>
    );
}

export default function ContactsClient() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }}></div>}>
            <ContactsContent />
        </Suspense>
    );
}
