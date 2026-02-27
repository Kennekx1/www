'use client';

import React, { useRef } from 'react';
import styles from './AboutClient.module.scss';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/common/Reveal';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutClient() {
    const { language, t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    const timeline = [
        {
            year: "2011",
            title: { ru: "Первая экспедиция", kk: "Алғашқы экспедиция" },
            text: {
                ru: "Витторио отправляется в свое первое путешествие в поисках уникальных ингредиентов для будущих ароматов.",
                kk: "Витторио болашақ хош иістерге арналған бірегей ингредиенттерді іздеп, өзінің алғашқы саяхатына шығады."
            }
        },
        {
            year: "2015",
            title: { ru: "Личный дневник", kk: "Жеке күнделік" },
            text: {
                ru: "Собрана коллекция из более чем 100 ольфакторных воспоминаний со всего мира.",
                kk: "Әлемнің түкпір-түкпірінен 100-ден астам ольфакторлық естеліктер жинақталды."
            }
        },
        {
            year: "2018",
            title: { ru: "Рождение бренда", kk: "Брендтің дүниеге келуі" },
            text: {
                ru: "Запуск первых пяти ароматов, ставших бестселлерами. Открытие первого концепт-стора.",
                kk: "Бестселлерге айналған алғашқы бес хош иістің таныстырылымы. Алғашқы концепт-стордың ашылуы."
            }
        },
        {
            year: "2024",
            title: { ru: "Мировое признание", kk: "Әлемдік танымалдылық" },
            text: {
                ru: "Vittorio Parfum представлен в крупнейших городах мира. Более 20 уникальных композиций.",
                kk: "Vittorio Parfum әлемнің ірі қалаларында ұсынылған. 20-дан астам бірегей композициялар."
            }
        }
    ];

    useGSAP(() => {
        gsap.to(heroImageRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        const stops = gsap.utils.toArray(`.${styles.stop}`);
        stops.forEach((stop: any) => {
            gsap.from(stop, {
                opacity: 0,
                x: -30,
                duration: 1,
                scrollTrigger: {
                    trigger: stop,
                    start: "top 80%",
                }
            });
        });
    }, { scope: containerRef });

    return (
        <div className={styles.aboutPage} ref={containerRef}>
            <section className={styles.hero}>
                <div className={styles.heroBg} ref={heroImageRef}>
                    <Image
                        src="/assets/images/about/hero_about.png"
                        alt="About Vittorio"
                        fill
                        priority
                        className={styles.heroImg}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <Reveal direction="up">
                        <span className={styles.sinceLabel}>{t('common.since')}</span>
                        <h1 className={styles.title}>{t('history.title')}</h1>
                    </Reveal>
                </div>
            </section>

            {/* Section 1: Introduction */}
            <section className={styles.philosophy}>
                <div className={styles.container}>
                    <div className={styles.flexLayout}>
                        <div className={styles.textSide}>
                            <Reveal direction="up">
                                <span className={styles.label}>{t('nav.about')}</span>
                                <h2 className={styles.heading}>{t('home.introTitle')}</h2>
                                <p className={styles.para}>
                                    {t('history.intro')}
                                </p>
                                <p className={styles.para} style={{ marginTop: '20px' }}>
                                    {t('history.passion')}
                                </p>
                            </Reveal>
                        </div>
                        <div className={styles.visualSide}>
                            <Reveal direction="right">
                                <Image
                                    src="/assets/images/about/ingredients.png"
                                    alt="Philosophy"
                                    width={500}
                                    height={600}
                                    className={styles.sideImg}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Art of Travel */}
            <section className={styles.travelSection}>
                <div className={styles.container}>
                    <div className={`${styles.flexLayout} ${styles.reversed}`}>
                        <div className={styles.textSide}>
                            <Reveal direction="up">
                                <span className={styles.label}>{t('home.journalLabel')}</span>
                                <h2 className={styles.heading}>{t('home.journalTitle')}</h2>
                                <p className={styles.para}>
                                    {t('history.travel')}
                                </p>
                            </Reveal>
                        </div>
                        <div className={styles.visualSide}>
                            <Reveal direction="left">
                                <Image
                                    src="/assets/images/about/journal.png"
                                    alt="Travel"
                                    width={500}
                                    height={600}
                                    className={styles.sideImg}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Mission & Laboratory */}
            <section className={styles.philosophy}>
                <div className={styles.container}>
                    <div className={styles.flexLayout}>
                        <div className={styles.textSide}>
                            <Reveal direction="up">
                                <span className={styles.label}>{t('home.philosophyTitle')}</span>
                                <h2 className={styles.heading}>{t('home.transitionBanner')}</h2>
                                <p className={styles.para}>
                                    {t('history.mission')}
                                </p>
                            </Reveal>
                        </div>
                        <div className={styles.visualSide}>
                            <Reveal direction="right">
                                <Image
                                    src="/assets/images/about/lab.png"
                                    alt="Mission"
                                    width={500}
                                    height={600}
                                    className={styles.sideImg}
                                />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.history}>
                <div className={styles.container}>
                    <Reveal direction="up">
                        <span className={styles.historyLabel}>{t('common.since')}</span>
                        <h2 className={styles.sectionTitle}>{t('home.journalTitle')}</h2>
                    </Reveal>

                    <div className={styles.modernTimeline}>
                        <div className={styles.timelineLine}></div>

                        {timeline.map((item, i) => (
                            <div key={i} className={`${styles.timelineNode} ${i % 2 === 0 ? styles.left : styles.right}`}>
                                <div className={styles.nodeYear}>
                                    <div className={styles.yearCircle}></div>
                                    <span>{item.year}</span>
                                </div>
                                <div className={styles.nodeContent}>
                                    <h3 className={styles.itemTitle}>{item.title[language as 'ru' | 'kk']}</h3>
                                    <p className={styles.itemText}>{item.text[language as 'ru' | 'kk']}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
