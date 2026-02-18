import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, formatPrice } from '@/utils/data';
import styles from './page.module.scss';
import Link from 'next/link';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found | Vittorio Parfum',
        };
    }

    return {
        title: `${product.name} | Vittorio Parfum`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main style={{ '--theme-color': product.themeColor } as React.CSSProperties}>
            <div className={styles.orb}></div>
            <div className={styles.orb}></div>

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        className={styles.image}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                <div className={styles.infoSection}>
                    <Link href="/catalog" className={styles.backLink}>
                        НАЗАД
                    </Link>

                    <div>
                        <h1 className={styles.title}>{product.name}</h1>
                    </div>

                    <div className={styles.volumeSelector}>
                        <button className={`${styles.volumeOption} ${styles.active}`}>3 мл</button>
                        <button className={`${styles.volumeOption} ${styles.inactive}`}>100 мл</button>
                    </div>

                    <div className={styles.notes}>
                        <div className={styles.tableRow}>
                            <span className={styles.label}>группа аромата</span>
                            <span className={styles.value}>{product.group}</span>
                        </div>
                        {typeof product.notes === 'object' && !Array.isArray(product.notes) ? (
                            <>
                                <div className={styles.tableRow}>
                                    <span className={styles.label}>верхние ноты</span>
                                    <span className={styles.value}>{product.notes.upper.join(' и ')}</span>
                                </div>
                                <div className={styles.tableRow}>
                                    <span className={styles.label}>ноты сердца</span>
                                    <span className={styles.value}>{product.notes.heart.join(', ')}</span>
                                </div>
                                <div className={styles.tableRow}>
                                    <span className={styles.label}>базовые ноты</span>
                                    <span className={styles.value}>{product.notes.base.join(', ')}</span>
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className={styles.price}>
                        {product.price_3ml || formatPrice(product.price || 0, product.currency)}
                    </div>

                    <div className={styles.actions}>
                        <Link href="/contacts">
                            <button className={styles.buyButton}>
                                КУПИТЬ НА САЙТЕ
                            </button>
                        </Link>
                        <button className={styles.rivGoshButton}>
                            РИВ ГОШ
                        </button>
                    </div>
                </div>
            </div>

            <section className={styles.historySection}>
                <h2>История создания аромата</h2>
                <div className={styles.historyContent}>
                    <p>Италия — страна, где я родился и где мое сердце находит покой.</p>
                    <p>С ранних лет я был очарован морем — его бескрайними просторами, свежим бризом и мощью волн, разбивающихся о скалистые берега. Это было место, где я проводил часы, наблюдая за бесконечным горизонтом и вдыхая соленый воздух.</p>
                    <p>{product.description}</p>
                    <p>"{product.name}" — это аромат, который отражает мое глубокое чувство к родной Италии, ее морским берегам и незабываемым моментам. Этот аромат — это голос моря, который зовет меня домой.</p>
                    <p style={{ fontWeight: 600, marginTop: '20px' }}>Духи для мужчин и женщин.</p>
                </div>
            </section>
        </main>
    );
}
