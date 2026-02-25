'use client';

import React, { useState, useMemo, useRef } from 'react';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import { Product } from '@/utils/data';
import styles from './Catalog.module.scss';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/dist/Flip';
import { useLanguage } from '@/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Flip);
}

interface CatalogProps {
    products: Product[];
}

export default function Catalog({ products }: CatalogProps) {
    const { language, t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);
    const flipStateRef = useRef<Flip.FlipState | null>(null);

    const getLoc = (field: any) => {
        if (typeof field === 'string') return field;
        return field?.[language] || field?.['ru'] || '';
    };

    const collections = useMemo(() => {
        const unique = new Set(products.map(p => getLoc(p.collection)));
        return ['all', ...Array.from(unique)];
    }, [products, language]);

    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (activeFilter !== 'all') {
            result = result.filter(p => getLoc(p.collection) === activeFilter);
        }
        if (sortOrder === 'price-asc') {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortOrder === 'price-desc') {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        }
        return result;
    }, [products, activeFilter, sortOrder, language]);

    const triggerFlipState = () => {
        if (!gridRef.current) return;
        const q = gsap.utils.selector(gridRef);
        flipStateRef.current = Flip.getState(q('.catalogItem'));
    };

    const changeFilter = (col: string) => {
        if (col === activeFilter) return;
        triggerFlipState();
        setActiveFilter(col);
    };

    const changeSort = (val: string) => {
        if (val === sortOrder) return;
        triggerFlipState();
        setSortOrder(val);
        setIsSortOpen(false);
    };

    useGSAP(() => {
        if (!gridRef.current) return;
        const q = gsap.utils.selector(gridRef);
        const items = q('.catalogItem');

        if (flipStateRef.current && items.length > 0) {
            Flip.from(flipStateRef.current, {
                targets: items,
                duration: 0.8,
                ease: 'power3.inOut',
                absolute: true,
                stagger: 0.03,
                onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 }),
                onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 })
            });
            flipStateRef.current = null;
        } else if (!flipStateRef.current && items.length > 0) {
            gsap.fromTo(items,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power4.out', clearProps: 'all' }
            );
        }
    }, { dependencies: [filteredProducts], scope: gridRef });

    const sortOptions = [
        { value: 'default', label: t('catalog.sortDefault') },
        { value: 'price-asc', label: t('catalog.sortPriceAsc') },
        { value: 'price-desc', label: t('catalog.sortPriceDesc') }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortOrder)?.label || t('catalog.sortDefault');

    return (
        <div className={styles.catalogLayout}>
            <div className={styles.filterBar}>
                <div className={styles.filters}>
                    {collections.map(col => (
                        <button
                            key={col}
                            className={clsx(styles.filterBtn, { [styles.active]: activeFilter === col })}
                            onClick={() => changeFilter(col)}
                        >
                            {col === 'all' ? t('catalog.filterAll') : col}
                        </button>
                    ))}
                </div>

                <div className={styles.sort} ref={sortRef}>
                    <div
                        className={clsx(styles.customSelect, { [styles.open]: isSortOpen })}
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <span>{currentSortLabel}</span>
                        <span className={styles.arrow}></span>
                    </div>
                    {isSortOpen && (
                        <div className={styles.optionsList}>
                            {sortOptions.map(option => (
                                <div
                                    key={option.value}
                                    className={clsx(styles.optionItem, { [styles.selected]: sortOrder === option.value })}
                                    onClick={() => changeSort(option.value)}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.gridContainer}>
                {filteredProducts.length > 0 ? (
                    <div className={styles.grid} ref={gridRef}>
                        {filteredProducts.map((product, index) => (
                            <div key={product.id} className="catalogItem" data-flip-id={product.id}>
                                <ProductCard
                                    product={product}
                                    priority={index < 3}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        {t('catalog.noResults')}
                    </div>
                )}
            </div>
        </div>
    );
}
