"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import styles from "@/styles/components/_services.module.scss";

const services = [
  {
    name: "Medical Consultation",
    description:
      "Enjoy the best medical consultation with a specialized doctor.",
  },
  {
    name: "Routine Checkup",
    description: "Conduct routine medical checkups to ensure your health.",
  },
  {
    name: "Physical Therapy Session",
    description:
      "Physical therapy sessions to enhance movement and improve overall health.",
  },
  {
    name: "Dental Treatment",
    description:
      "Dental treatments including cleaning, fillings, and gum care.",
  },
  {
    name: "Minor Surgery Procedure",
    description:
      "Perform minor surgical procedures using the latest medical techniques.",
  },
];

const Services = () => {
  return (
    <div className={styles.card}>
      {services.map((service, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles["home-card"]}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <Link href="/booking">
              <button className={styles.btnBook}>Book Now</button>
            </Link>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default Services;
