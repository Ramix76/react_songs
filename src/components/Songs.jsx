import songs from "../assets/songs.json";

export default function Songs() {
  return (
    <div>
      <h2>🎵 My Favorite Songs</h2>
      <div className="songs-grid">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <h3>{song.title}</h3>
            <p><strong>Author:</strong> {song.author}</p>
            <p><strong>Album:</strong> {song.album}</p>
            <p><strong>Duration:</strong> {song.duration} seconds</p>
            <p><strong>Rating:</strong> {song.rating}/5</p>
            <img
              src={song.albumCover}
              alt={`${song.album} cover`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}