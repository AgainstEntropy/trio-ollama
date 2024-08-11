"use client";

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { pageType } from '@/types/pages';

export default function TextScroll() {

    const scrollRegion = useRef(null);

    useGSAP(() => {

        const titles: gsap.TweenTarget[] = gsap.utils.toArray('span');
        const mainTimeline = gsap.timeline();

        const opacity = 0;
        const rotation = false;
        const yTranslation = rotation ? 25 : 50;
        const translationDuration = 0.5;
        const pauseDuration = 1.5;
        const overlapDuration = translationDuration;

        titles.forEach((title, index) => {
            const itemTimeline = gsap.timeline({
                repeat: -1,
                repeatDelay: (titles.length - 1) * (pauseDuration + 2 * translationDuration - overlapDuration) - overlapDuration,
                defaults: {
                    // duration: 1,
                    // ease: "power1.inOut"
                }
            });
            itemTimeline
                .from(title, {
                    duration: translationDuration,
                    opacity: opacity,
                    y: yTranslation,
                    rotateX: (rotation ? 90 : 0),
                })
                .to(title, {
                    duration: pauseDuration,
                })
                .to(title, {
                    duration: translationDuration,
                    opacity: opacity,
                    y: -yTranslation,
                    rotateX: -(rotation ? 90 : 0),
                })

            mainTimeline.add(itemTimeline, `>-${overlapDuration}`);
        })
    }, {scope: scrollRegion})

    const router = useRouter();

    const pages: pageType[] = [
        { label: "Trio", path: "/", color: "default"},
        { label: "Todo", path: "/todo", color: "primary" },
        { label: "Note", path: "/note", color: "warning" },
        { label: "Chat", path: "/chat", color: "danger" }
    ]

    return (
        <div className='relative w-24' ref={scrollRegion}>
            {pages.map((page, index) => (
                <span key={index}
                className={cn(
                    "absolute items-center cursor-pointer",
                    `text-${page.color}`,
                )}
                    onClick={() => router.push(page.path)}
                >
                    {page.label}
                </span>
            ))}
        </div>
    )
}