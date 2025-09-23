import styles from "./Hobbies.module.css";

export default function Hobbies() {
  const hobbies = [
    { name: "Coding", description: "Building apps and websites", level: "Junior level", years: 3.5 },
    { name: "Music", description: "Like to listen all kinds of music", level: "User level", years: 40 },
    { name: "Sports", description: "Love all types of sports,watching it and practice them", level: "Advanced", years: 40 },
    { name: "Traveling", description: "Exploring new countries and cultures", level: "Intermediate", years: 20 },
  ];

  return (
    <div>
      <h2>🎯 My Hobbies</h2>
      <div className={styles.hobbiesGrid}>
        {hobbies.map((hobby, index) => (
          <div key={index} className={styles.hobbyCard}>
            <h3>{hobby.name}</h3>
            <p><b>Description:</b> {hobby.description}</p>
            <p><b>Experience Level:</b> {hobby.level}</p>
            <p><b>Years:</b> {hobby.years}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
