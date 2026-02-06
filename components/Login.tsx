// Treatly Login
// app/components/LoginForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/_auth.module.scss";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", : المتصفح هيخزن الكوكي أوتوماتيك
        //  بعد كده هيبعت الكوكي ده معاه عشان السيرفر يتعرف عليك  request وبالتالى اى
        credentials: "include", //  Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setSuccess("");
        return;
      }

      setSuccess("🎉 Logged in successfully!");
      setError("");

      // Redirect to profile page after successful login
      router.push("/profile");
    } catch (err) {
      console.error("An error occurred:", err); // Log the error
      setError("Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className={styles.auth}>
      <h2>Login</h2>
      <p>Welcome back! Please enter your credentials to continue.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <p className={styles.note}>
        Do not have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
