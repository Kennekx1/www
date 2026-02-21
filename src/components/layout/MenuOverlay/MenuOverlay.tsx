'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './MenuOverlay.module.scss';
import gsap from 'gsap';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let tl: gsap.core.Timeline | null = null;

        if (isOpen) {
            gsap.set(overlayRef.current, { visibility: 'visible' });
            tl = gsap.timeline();

            tl.fromTo(overlayRef.current,
                { y: '-100%' },
                { y: '0%', duration: 1, ease: 'power4.inOut' }
            );

            tl.fromTo(videoRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
                '-=0.5'
            );

            const links = linksRef.current?.querySelectorAll(`.${styles.navItem}`);
            if (links) {
                tl.fromTo(links,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                    '-=1'
                );
            }
        } else {
            tl = gsap.timeline({
                onComplete: () => { gsap.set(overlayRef.current, { visibility: 'hidden' }); }
            });

            tl.to(overlayRef.current, {
                y: '-100%',
                duration: 0.8,
                ease: 'power4.inOut'
            });
        }

        // Magnetic effect for close button
        const createMagneticSetup = (element: HTMLElement | null) => {
            if (!element) return;

            const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            const mouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { height, width, left, top } = element.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.4);
                yTo(y * 0.4);
            };

            const mouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            element.addEventListener("mousemove", mouseMove);
            element.addEventListener("mouseleave", mouseLeave);

            return () => {
                element.removeEventListener("mousemove", mouseMove);
                element.removeEventListener("mouseleave", mouseLeave);
            };
        };

        const cleanupClose = createMagneticSetup(closeBtnRef.current);

        return () => {
            if (tl) tl.kill();
            if (cleanupClose) cleanupClose();
        };
    }, [isOpen]);

    const navItems = [
        { name: 'ГЛАВНАЯ', path: '/' },
        { name: 'КАТАЛОГ', path: '/catalog' },
        { name: 'ИСТОРИЯ', path: '/about' },
        { name: 'МАГАЗИНЫ', path: '/shops' },
        { name: 'КОНТАКТЫ', path: '/contacts' },
    ];

    return (
        <div className={styles.overlay} ref={overlayRef}>
            <div className={styles.videoSection} ref={videoRef}>
                <video autoPlay muted loop playsInline>
                    <source src="/assets/original/videos/video17sec.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoOverlay}></div>
            </div>

            <div className={styles.menuSection}>
                <button className={styles.closeButton} onClick={onClose} ref={closeBtnRef}>
                    <span className={styles.closeText}>ЗАКРЫТЬ</span>
                    <div className={styles.closeIcon}></div>
                </button>

                <nav className={styles.nav} ref={linksRef}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={styles.navItem}
                            onClick={onClose}
                        >
                            <span className={styles.itemText}>{item.name}</span>
                            <span className={styles.itemHoverText}>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.footer}>
                    <div className={styles.socials}>
                        <a href="https://vk.com/vittoriocouture" target="_blank" rel="noopener noreferrer">Vk</a>
                        <a href="https://t.me/VittorioParfum" target="_blank" rel="noopener noreferrer">Telegram</a>
                    </div>
                    <div className={styles.policy}>
                        <Link href="/policy" onClick={onClose}>Privacy Policy</Link>
                    </div>
                </div>

                <div className={styles.brandName}>VITTORIO</div>
            </div>
        </div>
    );
}
