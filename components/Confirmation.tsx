"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/components/_confirmation.module.scss";

export default function BookingConfirmation() {
  const searchParams = useSearchParams();

  const doctor = searchParams.get("doctor");
  const speciality = searchParams.get("speciality");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  return (
    <main className={styles.confirmation}>
      <h2 className={styles.confirmationTitle}>Reservation successful</h2>
      <p className={styles.paragraph1}>
        Thank you for using Treatly, your reservation has been confirmed.
      </p>

      <div className={styles.confirmationDetails}>
        <p className={styles.paragraph2}>
          <strong>Doctor:</strong> {doctor}
        </p>
        <p className={styles.paragraph2}>
          <strong>Speciality:</strong> {speciality}
        </p>
        <p className={styles.paragraph2}>
          <strong>Date:</strong> {date}
        </p>
        <p className={styles.paragraph2}>
          <strong>Time:</strong> {time}
        </p>
      </div>

      <div className={styles.confirmationLinks}>
        <Link href="/" className={styles.backToHome}>
          Back to Home
        </Link>
        <Link href="/bookings" className={styles.myBookings}>
          My Bookings
        </Link>
      </div>
    </main>
  );
}
