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
                        <h2 className={styles.title}>МАСТЕРСТВО<br/>И ФИЛОСОФИЯ</h2>
                    </Reveal>
                </div>

                <div className={styles.grid}>
                    {pillars.map((pillar) => (
                        <div key={pillar.id} className={styles.card}>
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
