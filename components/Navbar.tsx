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
        >
          <Menu />
        </button>

        <ul className={`${styles.list} ${menuOpen ? styles.open : ""}`}>
          <Link href="/about-us">About Us</Link>
          <Link href="/servicess">Services</Link>
          <Link href="/contact-us">Contact Us</Link>
          {user ? (
            <Link href="/profile">Profile</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
