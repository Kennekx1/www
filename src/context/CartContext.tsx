'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/utils/data';

interface CartItem extends Product {
    quantity: number;
    volume: '3ml' | '100ml';
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, volume: '3ml' | '100ml') => void;
    removeFromCart: (productId: string, volume: '3ml' | '100ml') => void;
    updateQuantity: (productId: string, volume: '3ml' | '100ml', quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('vittorio_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart data:', error);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('vittorio_cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addToCart = (product: Product, volume: '3ml' | '100ml') => {
        setItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === product.id && item.volume === volume
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.volume === volume
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { ...product, quantity: 1, volume }];
        });
    };

    const removeFromCart = (productId: string, volume: '3ml' | '100ml') => {
        setItems(prevItems => prevItems.filter(
            item => !(item.id === productId && item.volume === volume)
        ));
    };

    const updateQuantity = (productId: string, volume: '3ml' | '100ml', quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId, volume);
            return;
        }

        setItems(prevItems => prevItems.map(item =>
            item.id === productId && item.volume === volume
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const parsePrice = (priceStr?: string) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.replace(/\D/g, '')) || 0;
    };

    const totalPrice = items.reduce((total, item) => {
        const itemPrice = item.volume === '3ml' ? parsePrice(item.price_3ml) : parsePrice(item.price_100ml);
        return total + (itemPrice * item.quantity);
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
