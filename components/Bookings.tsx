"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/_bookings.module.scss";

type Booking = {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: string;
};

const BookingsPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "upcoming" | "past" | "cancelled"
  >("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleCancelBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/cancel/${id}`, {
        method: "POST",
      });

      if (res.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "cancelled" } : booking
          )
        );
        alert("Booking cancelled successfully");
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const now = new Date();
    const bookingDate = new Date(booking.date); // without time
    const [hours, minutes] = booking.time.split(":").map(Number);
    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(hours, minutes, 0, 0); // add time

    console.log("booking:", booking.date, booking.time);
    console.log("bookingDateTime:", bookingDateTime, "| now:", now);

    if (selectedFilter === "cancelled") return booking.status === "cancelled";
    if (selectedFilter === "past")
      return bookingDateTime < now && booking.status !== "cancelled";
    if (selectedFilter === "upcoming")
      return bookingDateTime >= now && booking.status !== "cancelled";
    return true;
  });

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.bookings}>
      <h2>Your Bookings</h2>

      <div className={styles.filters}>
        {["all", "upcoming", "past", "cancelled"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as typeof selectedFilter)}
            className={selectedFilter === filter ? styles.active : undefined}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {filteredBookings.map((booking) => (
            <li key={booking._id} className={styles.bookingItem}>
              <p>{booking.service}</p>
              <p>
                {booking.date} at {booking.time}
              </p>
              <p>Status: {booking.status}</p>
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className={styles.cancelBtn}
                >
                  Cancel Booking
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsPage;
