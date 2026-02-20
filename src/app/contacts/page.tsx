import React from 'react';
import PageHero from '@/components/layout/PageHero/PageHero';
import styles from './contacts.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты | Vittorio Parfum',
    description: 'Свяжитесь с командой Vittorio Parfum для консультации и заказов.',
};

export default function ContactsPage() {
    return (
        <main>
            <PageHero title="Контакты" />

            <div className={styles.container}>
                {/* Info Section */}
                <div className={styles.infoSection}>
                    <h2>Свяжитесь с нами</h2>
                    <p>
                        У вас есть вопросы о наших ароматах или нужна помощь с заказом?
                        Наша команда консьержей всегда готова помочь вам в выборе идеального парфюма.
                    </p>

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
                            <span className={styles.label}>Адрес:</span>
                            <span>Алматы, пр. Достык 12, БЦ &quot;Казахстан&quot;</span>
                        </div>
                    </div>

                    <div className={styles.concierge}>
                        <h3>Консьерж-сервис</h3>
                        <p>Доступен с понедельника по пятницу<br />10:00 - 19:00 (GMT+5)</p>
                        <button>
                            Написать в WhatsApp
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <div className={styles.formSection}>
                    <h3>Напишите нам</h3>
                    <form>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Ваше имя</label>
                            <input type="text" id="name" placeholder="Иван Иванов" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="example@mail.com" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="message">Сообщение</label>
                            <textarea id="message" placeholder="Ваш вопрос..." required></textarea>
                        </div>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
