"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Checkup from "../public/medical-checkup.svg";
import microScope from "../public/trustedexp.svg";
import Team from "../public/medical-team_4939486.svg";
import OnlineBooking from "../public/calendar_4180346.svg";
import DNA from "../public/dna.svg";
import styles from "@/styles/components/_home.module.scss";

const steps = [
  {
    icon: <Image src={Checkup} alt="Pill icon" width={60} height={60} />,
    title: "Comprehensive Care",
    desc: "We provide integrated medical services to ensure your health and comfort.",
  },
  {
    icon: <Image src={Team} alt="Pill icon" width={60} height={60} />,
    title: "Expert Medical Team",
    desc: "A group of highly qualified doctors across various medical fields.",
  },
  {
    icon: <Image src={DNA} alt="Pill icon" width={60} height={60} />,
    title: "Advanced Technology",
    desc: "We utilize the latest tools and equipment for accurate diagnosis and effective treatment.",
  },
  {
    icon: <Image src={OnlineBooking} alt="Pill icon" width={60} height={60} />,
    title: "Easy Online Booking",
    desc: "Book your appointments in seconds with our seamless platform.",
  },
  {
    icon: <Image src={microScope} alt="Pill icon" width={60} height={60} />,
    title: "Trusted Experience",
    desc: "Years of proven excellence in delivering quality healthcare.",
  },
];

const Home = () => {
  const infographicRef = useRef(null);
  const isInView = useInView(infographicRef, { once: true });

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <div className={styles.homeText}>
          <h1 className={styles.title}>Welcome to Treatly</h1>
          <h2 className={styles.slogan}>Where Treatment Is Easily</h2>
          <p className={styles.paragraph}>
            At Treatly, we believe healthcare begins with attention. A
            specialized medical team dedicated to your service and comfort.
          </p>
          <Link href="/booking">
            <button className={styles.btnBook}>Book Now</button>
          </Link>
          <div className={styles.container2}>
            {/* infographics with scroll-based animation */}
            <motion.div
              className={styles.infographicBox}
              ref={infographicRef}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
                hidden: {},
              }}
            >
              {steps.map((step, index) => (
                <motion.div
                  className={styles.step}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className={styles.iconCircle}>
                    <span>{step.icon}</span>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
