'use client';

import React from 'react';
import ScrollIndicator from '../components/common/ScrollIndicator/ScrollIndicator';
import { getAllProducts } from '@/utils/data';
import styles from './page.module.scss';
import HomeIntro from '@/components/home/HomeIntro/HomeIntro';
import FragranceShowcase from '@/components/home/FragranceShowcase/FragranceShowcase';
import dynamic from 'next/dynamic';

const Philosophy = dynamic(() => import('@/components/home/Philosophy/Philosophy'), {
  ssr: false,
  loading: () => <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Загрузка...</div>
});

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Home() {
  const products = getAllProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Parallax video
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Reveal title
    const titleLines = titleRef.current?.querySelectorAll(`.${styles.line}`);
    if (titleLines) {
      gsap.from(titleLines, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });
    }

    // Transition Banner Animation
    const banner = document.querySelector(`.${styles.transitionBanner}`);
    const bannerTitles = banner?.querySelectorAll('span');
    if (bannerTitles) {
      gsap.from(bannerTitles, {
        x: (i) => i % 2 === 0 ? -200 : 200,
        opacity: 0,
        scrollTrigger: {
          trigger: banner,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      });
    }
  }, { scope: heroRef });

  return (
    <main className={styles.main}>

      <section className={styles.hero} ref={heroRef}>
        <div className={styles.overlay} />
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoBackground}
          ref={videoRef}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle} ref={titleRef}>
            <div className={styles.line}>ИСТОРИИ,</div>
            <div className={styles.line}>РАССКАЗАННЫЕ</div>
            <div className={styles.line}>
              <span className={styles.highlight}>АРОМАТАМИ</span>
            </div>
          </h1>
        </div>

        <ScrollIndicator />
      </section>

      {/* Intro Section - World of Vittorio */}
      <HomeIntro />

      {/* Atmospheric Transition Banner */}
      <section className={styles.transitionBanner}>
        <div className={styles.bannerContent}>
          <span className={styles.label}>Эстетика Совершенства</span>
          <h2 className={styles.bannerTitle}>
            <span>ИСКУССТВО</span>
            <span>БЫТЬ</span>
            <span>СОБОЙ</span>
          </h2>
        </div>
        <div className={styles.bannerBg}></div>
      </section>

      {/* Fragrance Showcase - Stories Layout */}
      <FragranceShowcase products={products} />

      {/* Philosophy Section */}
      <Philosophy />

    </main>
  );
}
