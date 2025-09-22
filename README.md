# My React Favorites Project 🎵🎯

This is my first React project where I display my favorite songs and hobbies.  
It uses **React**, a **dark mode theme**, and **grid layouts** to organize the content.

---

## Features

### Songs
- Display a list of **favorite songs** with:
  - Title
  - Author
  - Album
  - Duration (seconds)
  - Rating (out of 5)
  - Album cover image
- Songs are displayed in a **grid layout** with hover effects.
- Album covers have **uniform size** for consistency.

### Hobbies
- Display a list of **my hobbies** with:
  - Name
  - Description
  - Experience level
  - Years practicing
- Hobbies are displayed as **cards in a grid** with hover effects.

### Dark Mode
- Dark background with bright text for better readability.
- Different colors for `<h1>`, `<h2>` and `<h3>` to highlight hierarchy.
- Cards have subtle shadows and elevation on hover.

---

## Project Structure
```
react_songs/
├── src/
│ ├── assets/
│ │ └── songs.json
│ ├── components/
│ │ ├── Songs.jsx
│ │ └── Hobbies.jsx
│ ├── App.jsx
│ └── index.css
├── package.json
└── README.md
```
---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone <https://github.com/Ramix76/react_songs>
cd react_songs
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Go to http://localhost:5173 (or the port Vite provides) to view the project.

---

## Usage

- The homepage displays **your name, surname, hobbies, and songs**.  
- Hover over the **cards** to see the elevation effect.  
- All album covers have the same size for a consistent layout.  
- Add new songs by editing `src/assets/songs.json`.

---

## Made with

- ❤️ React  
- ⚡ Vite  
- 🎨 CSS Grid & Dark Mode styling
