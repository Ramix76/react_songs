export default function Hobbies() {
  const hobbies = [
    {
      name: "Coding",
      description: "I love building web apps and learning new technologies.",
      experience: "Intermediate",
      years: 3.5
    },
    {
      name: "Music",
      description: "I play guitar and enjoy listening to rock and classical music.",
      experience: "User level",
      years: 40
    },
    {
      name: "Sports",
      description: "I enjoy playing soccer and going for runs on weekends.",
      experience: "Advanced",
      years: 25
    },
    {
      name: "Traveling",
      description: "I like discovering new cultures and trying different cuisines.",
      experience: "Intermediate",
      years: 20
    }
  ];

  return (
    <div>
      <h2>🎯 My Hobbies</h2>
      <div className="hobbies-grid">
        {hobbies.map((hobby, index) => (
          <div key={index} className="hobby-card">
            <h3>{hobby.name}</h3>
            <p><strong>Description:</strong> {hobby.description}</p>
            <p><strong>Experience:</strong> {hobby.experience}</p>
            <p><strong>Years practicing:</strong> {hobby.years}</p>
          </div>
        ))}
      </div>
    </div>
  );
}