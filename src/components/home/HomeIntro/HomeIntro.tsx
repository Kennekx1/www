import Link from 'next/link';
import Image from 'next/image';
import styles from './HomeIntro.module.scss';
import React, { useRef } from 'react';
import Reveal from '@/components/common/Reveal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HomeIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        // Parallax for the new image wrapper
        gsap.to(imageRef.current, {
            y: 100, // moves down while scrolling down
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
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

            {/* Image panel instead of just empty space */}
            <div className={styles.imagePanel} data-cursor-text="ИСТИНА">
                <div className={styles.imageWrapper}>
                    <Image
                        ref={imageRef}
                        src="/assets/images/banners/page-11.jpg"
                        alt="Vittorio Perfume Texture"
                        fill
                        className={styles.parallaxImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                </div>
            </div>
        </section>
    );
}
