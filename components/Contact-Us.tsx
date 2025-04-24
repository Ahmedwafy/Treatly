"use client";

import styles from "@/styles/components/_contact.module.scss";

const ContactForm = () => {
  return (
    <div className={styles.contact}>
      <h2>Contact Us</h2>
      <p>
        We would love to hear from you! Fill out the form below and we will get
        back to you shortly.
      </p>

      <p className={styles.phone}>
        Call us: <a href="tel:+201234567890">+20 123 456 7890</a>
      </p>

      <form className={styles.form}>
        <input type="text" placeholder="Your Name" required />
        <input type="tel" placeholder="Your Phone Number" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={5} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
