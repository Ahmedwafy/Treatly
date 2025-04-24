"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/components/_profile.module.scss";

type User = {
  name: string;
  email: string;
  phone: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token validity and get user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (!data.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProfile();
    }, 100); // Delay for 100ms to simulate loading

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleEditProfile = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleSaveProfile = () => {
    if (editedUser) {
      if (!editedUser.name || !editedUser.email || !editedUser.phone) {
        alert("All fields are required.");
        return;
      }

      setUser(editedUser);
      setIsEditing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  if (!user) return null; // Redirected to login if user is null

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <h2>Welcome, {user.name}</h2>

        <div className={styles.card}>
          {isEditing && editedUser ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </label>

              <label>
                Phone:
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                />
              </label>
            </>
          ) : (
            <>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </>
          )}
        </div>

        <div className={styles.actions}>
          <Link href="/bookings">
            <button className={styles.linkBtn}>View My Bookings</button>
          </Link>

          {isEditing ? (
            <div className={styles.editActions}>
              <button onClick={handleSaveProfile} className={styles.saveBtn}>
                Save Changes
              </button>
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEditProfile} className={styles.editBtn}>
              Edit Profile
            </button>
          )}
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>

        {showToast && (
          <div className={styles.toast}>Profile updated successfully!</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
