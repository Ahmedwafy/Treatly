// components/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "@/styles/components/_footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <ul className={styles.footerLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/servicess">Services</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
        </ul>

        <div className={styles.footerSocial}>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        © {new Date().getFullYear()} Treatly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
