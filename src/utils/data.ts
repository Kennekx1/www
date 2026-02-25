import productsData from '../data/products.json';
import navigationData from '../data/navigation.json';

// --- Types ---

export type LocalizedString = string | { ru: string, kk: string };
export type LocalizedArray = string[] | { ru: string[], kk: string[] };

export interface Product {
    id: string;
    slug: string;
    name: string;
    collection: LocalizedString;
    description: LocalizedString;
    price?: number;
    price_3ml?: string;
    price_100ml?: string;
    group?: LocalizedString;
    notes: {
        upper: LocalizedArray;
        heart: LocalizedArray;
        base: LocalizedArray;
    } | string[];
    image: string;
    image_hover: string;
    themeColor?: string;
    currency?: string;
    in_stock?: boolean;
    is_new?: boolean;
    discount_percent?: number;
}


export interface NavItem {
    label: string;
    path: string;
}

// --- Utilities ---

export function getAllProducts(): Product[] {
    return (productsData as unknown as Product[]).map(product => {
        // Parse price string "80 000 ₸" to number 80000 for sorting
        const priceStr = product.price_100ml || product.price_3ml || "0";
        const priceNum = parseInt(priceStr.replace(/\s/g, '').replace(/\D/g, '')) || 0;

        return {
            ...product, // Spread original properties
            price: priceNum, // For sorting logic
            notes: product.notes // Keep as is
        } as Product;
    });
}



export function getProductBySlug(slug: string): Product | undefined {
    const products = getAllProducts();
    return products.find(product => product.slug === slug);
}

/**
 * Get navigation links
 */
export function getNavigation(): NavItem[] {
    return navigationData;
}

/**
 * Format price helper
 */

export function formatPrice(price: number, currency: string = 'KZT'): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(price);
}
