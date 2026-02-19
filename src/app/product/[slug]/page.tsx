import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/utils/data';
import ProductDetailsClient from '@/components/product/ProductDetailsClient';

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

    return <ProductDetailsClient product={product} />;
}

