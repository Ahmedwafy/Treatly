// Treatly
// RegisterForm.tsx
"use client";

import { useState } from "react";
import styles from "@/styles/components/_auth.module.scss";

type FormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      // Const data contains the response's message & error from the server
      const data = await res.json();

      if (res.ok) {
        setMessage("Registered successfully!");
        setFormData({ name: "", phone: "", email: "", password: "" });
      } else {
        setMessage(data.message || data.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      console.error("Error occurred:", err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.auth}>
      <h2>Create an Account</h2>
      <p>Join us and start booking your appointments easily!</p>

      {message && (
        <p style={{ color: "wheat", fontWeight: "bold" }}>{message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className={styles.note}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegisterForm;
