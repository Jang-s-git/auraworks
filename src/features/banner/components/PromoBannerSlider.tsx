"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { PromoBanner } from "../data";
import styles from "./PromoBannerSlider.module.css";

interface PromoBannerSliderProps {
  banners: PromoBanner[];
  intervalMs?: number;
}

export default function PromoBannerSlider({ banners, intervalMs = 5000 }: PromoBannerSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % total), intervalMs);
    return () => clearInterval(timer);
  }, [paused, total, intervalMs]);

  if (total === 0) return null;

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="프로모션 배너"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.viewport}>
        <ul className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
          {banners.map((banner, index) => (
            <li
              key={banner.id}
              className={styles.slide}
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${total}`}
              aria-hidden={index !== current}
            >
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                fill
                sizes="100vw"
                className={styles.image}
                preload={index === 0}
              />
            </li>
          ))}
        </ul>

        <p className={styles.counter} aria-live="polite">
          <span className={styles.counterCurrent}>{current + 1}</span>
          <span>/{total}</span>
        </p>
      </div>
    </section>
  );
}
