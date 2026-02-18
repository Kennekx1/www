'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import { Product } from '@/utils/data';
import styles from './Catalog.module.scss';
import clsx from 'clsx';

interface CatalogProps {
    products: Product[];
}

export default function Catalog({ products }: CatalogProps) {
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('default');

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
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, activeFilter, sortOrder]);

    return (
        <div className={styles.catalogLayout}>
            <div className={styles.filterBar}>
                <div className={styles.filters}>
                    {collections.map(col => (
                        <button
                            key={col}
                            className={clsx({ [styles.active]: activeFilter === col })}
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
                    >
                        <option value="default">Сортировка</option>
                        <option value="price-asc">Цена: По возрастанию</option>
                        <option value="price-desc">Цена: По убыванию</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
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
    );
}
