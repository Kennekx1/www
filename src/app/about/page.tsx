import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'История Бренда | Vittorio Parfum',
    description: 'Витторио — парфюмер-путешественник, создающее ароматы-эмоции.',
};

export default function AboutPage() {
    return <AboutClient />;
}
