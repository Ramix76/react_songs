import { useState } from "react";
import Card from "../../common/Card";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) {
      e.email = "Please enter your email.";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) e.message = "Please write a message.";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSent(false);
      return;
    }

    console.log("Form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className={styles.page}>
      <h2>✉️ Contact Me</h2>
      <Card className={styles.card}>
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && <div className={styles.error}>{errors.message}</div>}

          <button type="submit" className={styles.btn}>Send Message</button>
          {sent && <div className={styles.success}>Thanks! Your message has been sent.</div>}
        </form>
      </Card>
    </div>
  );
}