'use client';

import React from 'react';
import styles from './about.module.scss';
import { useRef } from 'react';
import Image from 'next/image';
import Reveal from '@/components/common/Reveal';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function AboutClient() {
    const heroRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroRef.current || !bgRef.current) return;

        // Parallax background
        gsap.to(bgRef.current, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Title Reveal Animation
        const titleRows = titleRef.current?.querySelectorAll(`.${styles.titleText}`);
        if (titleRows) {
            gsap.fromTo(titleRows,
                { y: '120%', rotateX: -30, opacity: 0 },
                {
                    y: '0%',
                    rotateX: 0,
                    opacity: 1,
                    duration: 1.8,
                    stagger: 0.2,
                    ease: 'power4.out',
                    delay: 0.8
                }
            );
        }

        // Timeline Animation
        const timelineLineFill = timelineRef.current?.querySelector(`.${styles.timelineLineFill}`);
        const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');

        if (timelineLineFill && timelineItems) {
            // Set initial state
            gsap.set(timelineItems, { opacity: 0.2, x: -20 });
            gsap.set(timelineLineFill, { scaleY: 0, transformOrigin: "top center" });

            // Animate line filling up
            gsap.to(timelineLineFill, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    scrub: true,
                }
            });

            // Animate each timeline group as the line passes it
            timelineItems.forEach((item) => {
                const innerPoint = item.querySelector(`.${styles.pinInner}`);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 50%', // Trigger when the item reaches 50% of viewport
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    }
                });

                tl.to(item, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
                    .to(innerPoint, { scale: 1, backgroundColor: 'var(--color-santal)', duration: 0.4, ease: "back.out(2)" }, "<");
            });
        }

        // Image Parallax (Alchemy of Memory / Craftsmanship)
        const visualImages = document.querySelectorAll(`.${styles.visualImage}`);
        visualImages.forEach((img) => {
            gsap.to(img, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Philosophy Cards 3D Tilt
        const philosophyCards = document.querySelectorAll(`.${styles.valueCard}`);
        philosophyCards.forEach((card) => {
            const el = card as HTMLElement;

            const onMouseMove = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(el, {
                    rotateX,
                    rotateY,
                    duration: 0.4,
                    ease: 'power2.out',
                    transformPerspective: 1000,
                });
            };

            const onMouseLeave = () => {
                gsap.to(el, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            };

            el.addEventListener('mousemove', onMouseMove);
            el.addEventListener('mouseleave', onMouseLeave);
        });

    }, { scope: containerRef });

    return (
        <main className={styles.aboutContainer} ref={containerRef}>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>

            {/* Hero Section */}
            <header ref={heroRef} className={styles.hero}>
                <div ref={bgRef} className={styles.heroBackground}></div>
                <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                    <div className={styles.heroOverlay}>
                        <Reveal direction="down" delay={0.2}>
                            <span className={styles.since}>PHILOSOPHY & HERITAGE</span>
                        </Reveal>

                        <h1 ref={titleRef}>
                            <span className={styles.titleRow}>
                                <span className={styles.titleText}>Искусство</span>
                            </span>
                            <span className={styles.titleRow}>
                                <span className={styles.titleText}>Путешествий</span>
                            </span>
                        </h1>

                        <Reveal delay={1.2}>
                            <div className={styles.heroDivider}></div>
                        </Reveal>
                    </div>
                </div>
            </header>

            <div className={styles.contentWrapper}>
                {/* The Perfumer Section */}
                <section className={styles.splitSection}>
                    <div className={styles.visualWrapper}>
                        <Reveal direction="right" duration={1.2}>
                            <div className={styles.premiumPlaceholder} data-cursor-text="ИЗУЧИТЬ">
                                <Image
                                    src="/assets/original/images/about/perfumer_new.png"
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
                            <div className={styles.premiumPlaceholder} data-cursor-text="ИЗУЧИТЬ">
                                <Image
                                    src="/assets/original/images/about/craftmanship_detail.png"
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

                    <div className={styles.timeline} ref={timelineRef}>
                        <div className={styles.timelineLine}>
                            <div className={styles.timelineLineFill} />
                        </div>

                        <div className={`${styles.timelineItem} timeline-item`}>
                            <div className={styles.year}>2011</div>
                            <div className={styles.log}>
                                <div className={styles.pin}>
                                    <div className={styles.pinInner} />
                                </div>
                                <h3>Северная Италия</h3>
                                <p>Первые записи в дневнике. Обучение в Грасе и возвращение к истокам — в аптеку деда. Поиск того самого «запаха дождя над виноградниками».</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} timeline-item`}>
                            <div className={styles.year}>2014</div>
                            <div className={styles.log}>
                                <div className={styles.pin}>
                                    <div className={styles.pinInner} />
                                </div>
                                <h3>Марокко, Фес</h3>
                                <p>Запах кожи, обожженной солнцем, и прохладного атласского кедра. Здесь родился прототип «Santal & Leather».</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} timeline-item`}>
                            <div className={styles.year}>2018</div>
                            <div className={styles.log}>
                                <div className={styles.pin}>
                                    <div className={styles.pinInner} />
                                </div>
                                <h3>Основание Vittorio</h3>
                                <p>Открытие первой мастерской. Релиз легендарной коллекции ароматов, которые навсегда изменили представление о нишевой парфюмерии.</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} timeline-item`}>
                            <div className={styles.year}>2021</div>
                            <div className={styles.log}>
                                <div className={styles.pin}>
                                    <div className={styles.pinInner} />
                                </div>
                                <h3>Япония, Киото</h3>
                                <p>Медитация под цветущей сакурой. Тонкие грани мускуса и пудровых нот — рождение нежной мелодии «Musk Melody».</p>
                            </div>
                        </div>
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
