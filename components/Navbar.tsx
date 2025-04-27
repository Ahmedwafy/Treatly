"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import styles from "@/styles/components/_navbar.module.scss";

type User = {
  name: string;
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      setMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="Logo" width={110} height={110} />
          <h2 className={styles.treatly}>Treatly</h2>
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>

        <ul
          className={`${styles.list} ${menuOpen ? styles.open : ""}`}
          onClick={handleMenuClick}
        >
          <Link href="/about-us" className={styles.navLink}>
            About Us
          </Link>
          <Link href="/servicess" className={styles.navLink}>
            Services
          </Link>
          <Link href="/contact-us" className={styles.navLink}>
            Contact Us
          </Link>
          {user ? (
            <Link href="/profile" className={styles.navLink}>
              Profile
            </Link>
          ) : (
            <Link href="/login" className={styles.navLink}>
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
