import Link from 'next/link';
import styles from './HomeIntro.module.scss';
import React, { useRef } from 'react';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HomeIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(bigTextRef.current, {
            y: -150,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, { scope: containerRef });

    return (
        <section className={styles.introSection} ref={containerRef}>
            <div className={styles.contentContainer}>
                <Reveal>
                    <h2>Мир Ароматов Vittorio</h2>
                    <div className={styles.divider}></div>
                </Reveal>

                <Reveal delay={0.2}>
                    <p>
                        Витторио — парфюмер-путешественник. Его ароматы — это истории, рассказанные не словами, а эмоциями, которые они пробуждают. Каждый флакон хранит в себе воспоминание о месте, ставшем вдохновением.
                    </p>
                </Reveal>

                <Reveal delay={0.4}>
                    <Link href="/about" className={styles.link}>
                        Узнать больше
                    </Link>
                </Reveal>
            </div>

            {/* The giant VITTORIO text (can serve as a backdrop) */}
            <div className={styles.bigTextContainer} aria-hidden="true" ref={bigTextRef}>
                <span className={styles.verticalText}>VITTORIO</span>
            </div>
        </section>
    );
}
