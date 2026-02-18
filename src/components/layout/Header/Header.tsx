'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import MenuOverlay from '../MenuOverlay/MenuOverlay';
import clsx from 'clsx';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

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

    return (
        <>
            <header className={clsx(styles.header, isScrolled && styles.scrolled)}>
                <div className={styles.leftSection}>
                    <button className={styles.menuBtn} onClick={() => setIsMenuOpen(true)}>
                        МЕНЮ
                    </button>
                </div>

                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        VITTORIO
                    </Link>
                </div>

                <div className={styles.rightSection}>
                    <Link href="/cart" className={styles.cartLink}>
                        ЗАЯВКА <span className={styles.count}>(0)</span>
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
