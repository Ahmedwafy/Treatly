// app/(routes)/about-us/(.)testimonials/page.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKeenSlider } from "keen-slider/react";
import { aboutData } from "@/components/About-Us";
import "keen-slider/keen-slider.min.css";
import styles from "@/styles/components/_about-us.module.scss";

const TestimonialsModal = () => {
  const router = useRouter();
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: 1, spacing: 15 },
  });

  const goToPrevious = () => {
    instanceRef.current?.prev();
  };

  const goToNext = () => {
    instanceRef.current?.next();
  };

  return (
    <div className={styles.modalOverlay}>
      <motion.div
        className={styles.modalContent}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <button onClick={() => router.back()} className={styles.closeBtn}>
          ✕
        </button>

        <h2>{aboutData.testimonials.title}</h2>

        <div className={styles.carouselWrapper}>
          <div ref={sliderRef} className="keen-slider">
            {aboutData.testimonials.list.map((t, i) => (
              <div
                key={i}
                className={`keen-slider__slide ${styles.testimonial}`}
              >
                <p className={styles.feedback}>{t.feedback}</p>
                <p className={styles.name}>— {t.name}</p>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button onClick={goToPrevious} className={styles.arrow}>
              ←
            </button>
            <button onClick={goToNext} className={styles.arrow}>
              →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsModal;
