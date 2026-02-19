'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import { Product } from '@/utils/data';
import styles from './Catalog.module.scss';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CatalogProps {
    products: Product[];
}

export default function Catalog({ products }: CatalogProps) {
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('default');
    const gridRef = useRef<HTMLDivElement>(null);

    // Extract unique collections for filters
    const collections = useMemo(() => {
        const unique = new Set(products.map(p => p.collection));
        return ['all', ...Array.from(unique)];
    }, [products]);

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter
        if (activeFilter !== 'all') {
            result = result.filter(p => p.collection === activeFilter);
        }

        // Sort
        if (sortOrder === 'price-asc') {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortOrder === 'price-desc') {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        }

        return result;
    }, [products, activeFilter, sortOrder]);

    // Animation when data changes
    useGSAP(() => {
        const cards = gridRef.current?.children;
        if (cards && cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.out',
                    clearProps: 'all'
                }
            );
        }
    }, { dependencies: [filteredProducts], scope: gridRef });

    return (
        <div className={styles.catalogLayout}>
            <div className={styles.filterBar}>
                <div className={styles.filters}>
                    {collections.map(col => (
                        <button
                            key={col}
                            className={clsx(styles.filterBtn, { [styles.active]: activeFilter === col })}
                            onClick={() => setActiveFilter(col)}
                        >
                            {col === 'all' ? 'Все' : col}
                        </button>
                    ))}
                </div>

                <div className={styles.sort}>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="default">Сортировка</option>
                        <option value="price-asc">Цена: По возрастанию</option>
                        <option value="price-desc">Цена: По убыванию</option>
                    </select>
                </div>
            </div>

            <div className={styles.gridContainer}>
                {filteredProducts.length > 0 ? (
                    <div className={styles.grid} ref={gridRef}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        В данной категории товаров пока нет.
                    </div>
                )}
            </div>
        </div>
    );
}
