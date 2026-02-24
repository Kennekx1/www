import React from 'react';
import ContactsClient from './ContactsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты | Vittorio Parfum',
    description: 'Свяжитесь с командой Vittorio Parfum для консультации и заказов.',
};

export default function ContactsPage() {
    return <ContactsClient />;
}
