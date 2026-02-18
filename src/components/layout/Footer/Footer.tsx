import Link from 'next/link';
import styles from './Footer.module.scss';
import React from 'react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.mainContent}>
                {/* Left: Subscription */}
                <div className={styles.column} style={{ paddingLeft: '40px' }}>
                    <h3 className={styles.title}>ПОДПИСАТЬСЯ НА НОВОСТИ</h3>
                    <p className={styles.subtitle}>Оформите подписку, чтобы быть в курсе наших новостей</p>
                    <div className={styles.subscribeForm}>
                        <form action="#" method="POST" className={styles.subscribeForm}>
                            <input type="email" placeholder="Электронная почта" aria-label="Электронная почта" required />
                            <button type="submit" aria-label="Подписаться">→</button>
                        </form>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '0.7em', opacity: 0.5, lineHeight: 1.5 }}>
                        Оставляя свой электронный адрес, вы подтверждаете, что согласны с политикой обработки персональных данных
                    </p>
                </div>

                {/* Center: Brand & Socials */}
                <div className={styles.column} style={{ alignItems: 'center' }}>
                    <div className={styles.logo}>
                        {/* Use SVG or styled text? Text for now as it's cleaner */}
                        VITTORIO
                    </div>
                    <div className={styles.socials}>
                        <a href="https://vk.com/vittoriocouture" target="_blank" rel="noopener noreferrer">Vk</a>
                        <a href="https://t.me/VittorioParfum" target="_blank" rel="noopener noreferrer">Tg</a>
                    </div>
                </div>

                {/* Right: Contacts */}
                <div className={styles.column} style={{ paddingRight: '40px' }}>
                    <h3 className={styles.title}>СВЯЗАТЬСЯ С НАМИ</h3>
                    <a href="tel:+78002224147" className={styles.contactLink}>8 800 222-41-47</a>
                    <a href="mailto:info@vittorio-parfum.ru" className={styles.contactLink}>info@vittorio-parfum.ru</a>

                    <div style={{ marginTop: '20px', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.7 }}>
                        Ароматы Vittorio можно приобрести в магазинах
                    </div>
                    <div className={styles.partnerLogo}>
                        РИВ ГОШ
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div>© 2026. Vittorio</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link href="/delivery" className={styles.link}>Доставка и оплата</Link>
                    <Link href="/policy" className={styles.link}>Политика конфиденциальности</Link>
                    <Link href="/policy" className={styles.link}>Публичная оферта</Link>
                </div>
                <div className={styles.legalGroup}>
                    <span>Реквизиты:</span>
                    <span>ОГРН: 1195275028299</span>
                    <span>ИНН: 5259139506</span>
                    <span style={{ marginTop: '10px' }}>Юридический адрес:</span>
                    <span style={{ textAlign: 'right' }}>603035, Нижегородская область, г. Нижний Новгород, ул Чаадаева, дом 1, корпус 103, ЛИТЕР А</span>
                </div>
            </div>
        </footer>
    );
}
