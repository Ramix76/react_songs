import songs from "./songsData";
import Card from "../../common/Card";
import styles from "./Songs.module.css";

export default function Songs() {
  return (
    <div>
      <h2>🎵 My Favorite Songs</h2>
      <div className={styles.grid}>
        {songs.map((song, index) => (
          <Card key={index} className={styles.card}>
            <h3>{song.title}</h3>
            <p><b>Author:</b> {song.author}</p>
            <p><b>Album:</b> {song.album}</p>
            <p><b>Duration:</b> {song.duration} sec</p>
            <p><b>Rating:</b> {song.rating} ⭐</p>
            <img src={song.albumCover} alt={song.title} />
          </Card>
        ))}
      </div>
    </div>
  );
}