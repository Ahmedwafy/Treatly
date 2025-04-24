"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/components/_bookingForm.module.scss";

export default function BookingForm() {
  const router = useRouter();

  const specialityDoctors: Record<string, string[]> = {
    Dermatology: ["Dr. Amina", "Dr. Hossam"],
    Cardiology: ["Dr. Omar", "Dr. Samia"],
    Dentistry: ["Dr. Nour", "Dr. Tarek"],
    Neurology: ["Dr. Yasmine", "Dr. Mahmoud"],
    Pediatrics: ["Dr. Salma", "Dr. Khaled"],
  };

  const specialities = Object.keys(specialityDoctors);

  const [speciality, setSpeciality] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!speciality || !doctor || !date || !time) {
      alert("Please complete all fields.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: `${speciality} - ${doctor}`,
          date: date.toISOString(),
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Booking confirmed ✅");

      const queryParams = new URLSearchParams({
        speciality,
        doctor,
        date: date.toLocaleDateString(),
        time,
      });

      router.push(`/booking/confirmation?${queryParams.toString()}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Error submitting booking");
        console.error("Booking Error:", error);
      } else {
        alert("Unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleBooking} className={styles.bookingForm}>
      {/* Speciality */}
      <div className={styles.formGroup}>
        <label htmlFor="speciality">Speciality:</label>
        <select
          id="speciality"
          value={speciality}
          onChange={(e) => {
            setSpeciality(e.target.value);
            setDoctor(""); // Reset doctor if speciality changes
          }}
          className={styles.formInput}
        >
          <option value="">-- Select Speciality --</option>
          {specialities.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor */}
      <div className={styles.formGroup}>
        <label htmlFor="doctor">Doctor:</label>
        <select
          id="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className={styles.formInput}
          disabled={!speciality}
        >
          <option value="">-- Select Doctor --</option>
          {speciality &&
            specialityDoctors[speciality].map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
        </select>
      </div>

      {/* Date */}
      <div className={styles.formGroup}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          className={styles.formInput}
        />
      </div>

      {/* Time */}
      <div className={styles.formGroup}>
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={styles.formInput}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Confirm Booking
      </button>
    </form>
  );
}
