import songs from "../../assets/songs.json";
import styles from "./Songs.module.css";

export default function Songs() {
  return (
    <div>
      <h2>🎵 My Favorite Songs</h2>
      <div className={styles.songsGrid}>
        {songs.map((song, index) => (
          <div key={index} className={styles.songCard}>
            <h3>{song.title}</h3>
            <p><b>Author:</b> {song.author}</p>
            <p><b>Album:</b> {song.album}</p>
            <p><b>Duration:</b> {song.duration} sec</p>
            <p><b>Rating:</b> {song.rating} ⭐</p>
            <img src={song.albumCover} alt={song.title} />
          </div>
        ))}
      </div>
    </div>
  );
}