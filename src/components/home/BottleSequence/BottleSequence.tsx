// src/components/home/BottleSequence/BottleSequence.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './BottleSequence.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BottleSequence() {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loadedImages, setLoadedImages] = useState(0);

    // --- КОНФИГУРАЦИЯ СЕКВЕНЦИИ ---
    const frameCount = 60; // Общее количество кадров (замените на реальное)
    const currentFrame = (index: number) =>
        `/assets/images/home-sequence/bottle_${index.toString().padStart(4, '0')}.jpg`; // Формат имени файла

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        // Устанавливаем размер canvas (можете изменить под пропорции ваших фото)
        canvas.width = 1920;
        canvas.height = 1080;

        const images: HTMLImageElement[] = [];
        const airpods = {
            frame: 0
        };

        // Предзагрузка всех изображений
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);

            img.onload = () => {
                setLoadedImages(prev => prev + 1);
            };
        }

        // Отрисовка первого кадра (или резервного, если еще грузится)
        // ВАЖНО: Мы рисуем заглушку, пока вы не положите реальные кадры
        const drawInitialState = () => {
            context.fillStyle = '#0a0a0a';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#C8A97E';
            context.font = '40px "Cormorant", serif';
            context.textAlign = 'center';

            if (loadedImages < frameCount) {
                context.fillText(`ЗАГРУЗКА 3D ОПЫТА: ${Math.round((loadedImages / frameCount) * 100)}%`, canvas.width / 2, canvas.height / 2);
            } else {
                // Рендер реального первого кадра
                render();
            }
        };

        drawInitialState();

        // Функция рендера текущего кадра
        function render() {
            if (!context || !canvas || images.length === 0) return;

            // Очищаем canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            const img = images[airpods.frame];
            if (img && img.complete) {
                // Масштабирование изображения, чтобы оно покрывало весь canvas (как background-size: cover)
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            } else {
                context.fillStyle = '#0a0a0a';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = '#C8A97E';
                context.font = '40px "Cormorant", serif';
                context.textAlign = 'center';
                context.fillText('ОЖИДАНИЕ СЕКВЕНЦИИ КАДРОВ...', canvas.width / 2, canvas.height / 2);
            }
        }

        // Анимация GSAP ScrollTrigger
        const scrollTrigger = gsap.to(airpods, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                // pin блокирует скролл, пока анимация не закончится
                pin: true,
                scrub: 0.5, // плавность привязки к скроллу
                start: "top top",
                end: "+=3000", // высота прокрутки, в течение которой происходит вращение
            },
            onUpdate: () => render(), // Вызываем render при каждом изменении фрейма
        });

        return () => {
            scrollTrigger.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [loadedImages]);

    return (
        <section className={styles.sequenceSection} ref={containerRef}>
            <div className={styles.stickyContainer}>
                <canvas ref={canvasRef} className={styles.canvas} />

                {/* Текстовые оверлеи, которые будут появляться поверх 3D */}
                <div className={styles.overlayText}>
                    <h2>АРХИТЕКТУРА ФЛАКОНА</h2>
                    <p>Исследуйте совершенство формы в 360 градусах.</p>
                </div>
            </div>
        </section>
    );
}
