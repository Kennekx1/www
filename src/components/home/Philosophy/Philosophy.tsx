'use client';

import React, { useRef } from 'react';
import styles from './Philosophy.module.scss';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const pillars = [
    {
        id: '01',
        title: 'ЭКСКЛЮЗИВНОСТЬ',
        description: 'Каждое парфюмерное творение — результат долгих поисков и путешествий. Мы работаем исключительно с редкими компонентами, привезенными из самых отдаленных уголков мира.'
    },
    {
        id: '02',
        title: 'АВТОРСТВО',
        description: 'Отражение личного опыта и вдохновения. Ароматы полностью создаются парфюмером Витторио, запечатлевая дух экспедиций и красоту подлинного мастерства.'
    },
    {
        id: '03',
        title: 'ИСТОРИИ',
        description: 'Вы приглашены стать частью сюжета. Каждый аромат сопровождается увлекательным рассказом о его создании, добавляя интригу и неповторимость в каждый вдох.'
    }
];

const Philosophy: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.card}`);
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            }
        });

        // Philosophy Cards 3D Tilt
        const philosophyCards = document.querySelectorAll(`.${styles.card}`);
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
    }, { scope: sectionRef });

    return (
        <section className={styles.philosophy} ref={sectionRef}>
            <div className={styles.decoratorCircle} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Reveal>
                        <span className={styles.subtitle}>Эстетика Совершенства</span>
                    </Reveal>
                    <Reveal>
                        <h2 className={styles.title}>МАСТЕРСТВО<br />И ФИЛОСОФИЯ</h2>
                    </Reveal>
                </div>

                <div className={styles.grid}>
                    {pillars.map((pillar) => (
                        <div key={pillar.id} className={styles.card} data-cursor-text="ИЗУЧИТЬ">
                            <div className={styles.number}>{pillar.id}</div>
                            <h3 className={styles.cardTitle}>{pillar.title}</h3>
                            <p className={styles.description}>{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
