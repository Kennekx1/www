import styles from './about.module.scss';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'История Бренда | Vittorio Parfum',
    description: 'Витторио — парфюмер-путешественник, создающее ароматы-эмоции.',
};

import Reveal from '@/components/common/Reveal';
import dynamic from 'next/dynamic';

const AromaMap = dynamic(() => import('@/components/home/AromaMap/AromaMap'), {
    ssr: false,
    loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>Загрузка карты...</div>
});

export default function AboutPage() {
    return (
        <main className={styles.aboutContainer}>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>

            {/* Hero Section */}
            <header className={styles.hero}>
                <Reveal direction="down">
                    <div className={styles.heroOverlay}>
                        <span className={styles.since}>PHILOSOPHY & HERITAGE</span>
                        <h1>Искусство Путешествий</h1>
                        <div className={styles.heroDivider}></div>
                    </div>
                </Reveal>
            </header>

            <div className={styles.contentWrapper}>
                {/* The Perfumer Section */}
                <section className={styles.splitSection}>
                    <div className={styles.visualWrapper}>
                        <Reveal direction="right" duration={1.2}>
                            <div className={styles.premiumPlaceholder}>
                                <Image
                                    src="/assets/original/images/welcome/perfumer_premium.png"
                                    alt="Парфюмер Витторио"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className={styles.visualImage}
                                />
                                <span className={styles.vLabel}>VITTORIO</span>
                            </div>
                        </Reveal>
                    </div>
                    <div className={styles.textWrapper}>
                        <Reveal direction="up" delay={0.4}>
                            <h2 className={styles.sectionTitle}>01. Алхимия Памяти</h2>
                            <p>
                                Витторио — не просто парфюмер, он коллекционер моментов.
                                Каждое его создание начинается не в лаборатории, а в пути.
                                От утреннего тумана над тосканскими холмами до соленого бриза
                                амальфитанского побережья — всё становится частью ольфакторной летописи.
                            </p>
                            <p>
                                Мы верим, что аромат — единственная машина времени,
                                доступная человеку. Он способен мгновенно вернуть нас
                                в забытый полдень детства или на залитую солнцем площадь заброшенного города.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* The Journey Section */}
                <section className={`${styles.splitSection} ${styles.reversed}`}>
                    <div className={styles.visualWrapper}>
                        <Reveal direction="left" duration={1.2}>
                            <div className={styles.premiumPlaceholder}>
                                <Image
                                    src="/assets/original/images/welcome/detail_premium.png"
                                    alt="Детали мастерства"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className={styles.visualImage}
                                />
                                <span className={styles.vLabel}>EST. 2018</span>
                            </div>
                        </Reveal>
                    </div>
                    <div className={styles.textWrapper}>
                        <Reveal direction="up" delay={0.4}>
                            <h2 className={styles.sectionTitle}>02. Культура Материи</h2>
                            <p>
                                Мы фанатично преданы качеству ингредиентов. Если это сандал —
                                то только из экологически чистых лесов, если кожа — то с характером
                                старой флорентийской мастерской.
                            </p>
                            <p>
                                Каждый флакон Vittorio — это баланс между грубой силой природы
                                и изысканностью ручной работы. Мы создаем ароматы, которые
                                живут на коже, меняются вместе с вами и рассказывают вашу собственную историю.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* Traveler's Journal Timeline */}
                <section className={styles.journalSection}>
                    <Reveal>
                        <span className={styles.sectionLabel}>Ольфакторный Дневник</span>
                        <h2 className={styles.philosophyTitle}>Хронология Путешествий</h2>
                    </Reveal>

                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.year}>2011</div>
                            <div className={styles.log}>
                                <div className={styles.pin}></div>
                                <h3>Северная Италия</h3>
                                <p>Первые записи в дневнике. Обучение в Грасе и возвращение к истокам — в аптеку деда. Поиск того самого «запаха дождя над виноградниками».</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.year}>2014</div>
                            <div className={styles.log}>
                                <div className={styles.pin}></div>
                                <h3>Марокко, Фес</h3>
                                <p>Запах кожи, обожженной солнцем, и прохладного атласского кедра. Здесь родился прототип «Santal & Leather».</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.year}>2018</div>
                            <div className={styles.log}>
                                <div className={styles.pin}></div>
                                <h3>Основание Vittorio</h3>
                                <p>Открытие первой мастерской. Релиз легендарной коллекции ароматов, которые навсегда изменили представление о нишевой парфюмерии.</p>
                            </div>
                        </div>

                        <div className={styles.timelineItem}>
                            <div className={styles.year}>2021</div>
                            <div className={styles.log}>
                                <div className={styles.pin}></div>
                                <h3>Япония, Киото</h3>
                                <p>Медитация под цветущей сакурой. Тонкие грани мускуса и пудровых нот — рождение нежной мелодии «Musk Melody».</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integration of Aroma Map into History */}
                <section className={styles.mapSection}>
                    <Reveal>
                        <h2 className={styles.sectionTitle}>География Ароматов</h2>
                        <p className={styles.mapSub}>Каждая точка на этой карте — это не просто город, это вдохновение, ставшее флаконом.</p>
                    </Reveal>
                    <div className={styles.mapContainer}>
                        <AromaMap />
                    </div>
                </section>

                {/* Philosophy & Values */}
                <section className={styles.philosophySection}>
                    <h2 className={styles.philosophyTitle}>Философия</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <h3>Уникальность</h3>
                            <p>Мы не следуем трендам. Мы создаем классику вне времени, которая подчеркивает вашу индивидуальность.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Эмоции</h3>
                            <p>Наши ароматы — это истории, рассказанные без слов. Они пробуждают воспоминания и переносят в другие миры.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Мастерство</h3>
                            <p>Используя знания старых итальянских аптекарей и современные технологии, мы добиваемся идеального баланса.</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
