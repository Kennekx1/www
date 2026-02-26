'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import MenuOverlay from '../MenuOverlay/MenuOverlay';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const cartBtnRef = useRef<HTMLAnchorElement>(null);

    // Pages that have a dark hero section or split layout and need transparent header at the top
    const isDarkHeroPage = pathname === '/' || pathname === '/about' || pathname === '/catalog' || pathname === '/contacts' || pathname === '/shops';
    const isContacts = pathname === '/contacts';

    useGSAP(() => {
        // Entrance animation
        const tl = gsap.timeline();
        tl.fromTo('.anim-item',
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        );

        // Premium Magnetic effect for buttons
        const createMagneticSetup = (element: HTMLElement | null) => {
            if (!element) return;

            const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            const mouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { height, width, left, top } = element.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                xTo(x * 0.3);
                yTo(y * 0.3);
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

        const cleanupMenu = createMagneticSetup(menuBtnRef.current);
        const cleanupCart = createMagneticSetup(cartBtnRef.current);

        return () => {
            if (cleanupMenu) cleanupMenu();
            if (cleanupCart) cleanupCart();
        }
    }, { scope: headerRef });

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 50);

            // Calculate scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = clsx(
        styles.header,
        isScrolled && styles.scrolled,
        !isDarkHeroPage && !isScrolled && styles.darkTheme,
        isContacts && styles.contactsHeader
    );

    return (
        <>
            <header className={headerClasses} ref={headerRef}>
                <div className={clsx(styles.leftSection, 'anim-item')}>
                    <button className={styles.menuBtn} onClick={() => setIsMenuOpen(true)} ref={menuBtnRef}>
                        {t('nav.menu')}
                    </button>
                </div>

                <div className={clsx(styles.logoContainer, 'anim-item')}>
                    <Link href="/" className={styles.logo}>
                        <svg className={styles.featherIcon} viewBox="55 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M73.9674 33.2564C74.8778 33.6466 75.5282 34.0368 76.1785 34.557C75.3981 33.6466 74.6177 32.8662 74.2275 32.476C64.3425 24.1517 60.5706 21.2903 58.6196 17.2582C56.6686 11.9255 57.7091 6.46277 61.7412 1C61.6111 6.7229 63.1719 11.4053 65.383 15.9576C67.0739 18.819 72.9268 26.623 75.1379 28.8341C78.7798 32.606 79.4301 35.4675 79.3001 38.5891C78.2595 37.2884 75.5282 36.2479 74.2275 35.8577C65.5131 32.9962 62.2614 32.0858 59.7902 30.0047C57.0588 27.0132 56.2784 23.1112 57.579 18.4288C59.0098 22.3308 61.351 24.9321 63.9523 27.4034C65.9033 28.8341 71.8863 32.3459 73.9674 33.2564Z" fill="currentColor" />
                        </svg>
                        <span className={styles.logoText}>VITTORIO</span>
                    </Link>
                </div>

                <div className={clsx(styles.rightSection, 'anim-item')}>
                    <div className={styles.langSwitcher}>
                        <button
                            className={clsx(language === 'ru' && styles.activeLang)}
                            onClick={() => setLanguage('ru')}
                        >
                            RU
                        </button>
                        <button
                            className={clsx(language === 'kk' && styles.activeLang)}
                            onClick={() => setLanguage('kk')}
                        >
                            KK
                        </button>
                    </div>
                    <Link href="/contacts" className={styles.cartLink} ref={cartBtnRef}>
                        {t('nav.connect')}
                    </Link>
                </div>

                <div
                    className={styles.scrollProgress}
                    style={{ width: `${scrollProgress}%` }}
                />
            </header>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
