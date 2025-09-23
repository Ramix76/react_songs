import { hobbies } from "./hobbiesData";
import Card from "../../common/Card";
import styles from "./Hobbies.module.css";

export default function Hobbies() {
  return (
    <div>
      <h2>🎯 My Hobbies</h2>
      <div className={styles.grid}>
        {hobbies.map((hobby, index) => (
          <Card key={index} className={styles.card}>
            <h3>{hobby.name}</h3>
            <p><b>Description:</b> {hobby.description}</p>
            <p><b>Experience Level:</b> {hobby.level}</p>
            <p><b>Years:</b> {hobby.years}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}