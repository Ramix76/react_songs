import React from "react";
import styles from "./Card.module.css"; // IMPORTANTE: CSS MODULE

export default function Card({ children }) {
  return <div className={styles.card}>{children}</div>;
}