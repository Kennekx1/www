'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import MenuOverlay from '../MenuOverlay/MenuOverlay';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const cartBtnRef = useRef<HTMLAnchorElement>(null);

    // Pages that have a dark hero section or split layout and need transparent header at the top
    const isDarkHeroPage = pathname === '/' || pathname === '/about' || pathname === '/catalog' || pathname === '/contacts';
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
                        МЕНЮ
                    </button>
                </div>

                <div className={clsx(styles.logoContainer, 'anim-item')}>
                    <Link href="/" className={styles.logo}>
                        VITTORIO
                    </Link>
                </div>

                <div className={clsx(styles.rightSection, 'anim-item')}>
                    <Link href="/contacts" className={styles.cartLink} ref={cartBtnRef}>
                        СВЯЗАТЬСЯ
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
