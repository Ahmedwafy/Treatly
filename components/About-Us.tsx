"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, Users, HeartPulse, ThumbsUp } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import styles from "@/styles/components/_about-us.module.scss";

export const aboutData = {
  title: "About Us",
  description:
    "Welcome to Treatly – your go-to platform for booking clinic appointments with ease.",
  mission: {
    title: "Our Mission",
    content:
      "At Treatly, we believe healthcare should be accessible, organized, and stress-free.",
    icon: <Stethoscope size={50} color="#f5deb3" />,
  },
  vision: {
    title: "Our Vision",
    content:
      "We envision a world where healthcare access is simplified, and every patient can book and manage their appointments effortlessly.",
    icon: <HeartPulse size={50} color="#f5deb3" />,
  },
  values: {
    title: "Our Values",
    content:
      "Compassion, innovation, integrity, and commitment to patient-centered care are the pillars that guide everything we do at Treatly.",
    icon: <ThumbsUp size={50} color="#f5deb3" />,
  },
  team: {
    title: "Our Team",
    content:
      "We're a small, passionate team focused on making healthcare management easier for both patients and clinics.",
    icon: <Users size={50} color="#f5deb3" />,
  },
  testimonials: {
    title: "What Our Users Say",
    list: [
      {
        name: "Sarah M.",
        feedback:
          "Treatly made booking appointments so easy! I love the smooth experience and the support team is amazing.",
      },
      {
        name: "Dr. Hassan A.",
        feedback:
          "Managing my clinic appointments has never been this organized. Treatly is a game-changer!",
      },
    ],
  },
};

const AboutUsPage = () => {
  const { title, description, mission, vision, values, team } = aboutData;

  const sections = [mission, vision, values, team];

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.paragraph}>{description}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className={styles.cardsWrapper}>
        {sections.map((section, index) => (
          <motion.section
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.cardIcon}>{section.icon}</div>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </motion.section>
        ))}
      </div>
      <div className={styles.testimonialsWrapper}>
        <Link href="/about-us/testimonials">
          <button className={styles.showTestimonials}>Show Testimonials</button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUsPage;
