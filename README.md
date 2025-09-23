# My React Favorites Project 🎵🎯

This is my React project where I display my favorite songs, hobbies, a contact form, and posts fetched from an API.  
It uses **React**, **Vite**, **React Router**, a **dark mode theme**, and **grid layouts**.

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

### Contact Form
- Simple **contact form** with:
  - Name
  - Email
  - Message
- Form styled with **CSS modules** in dark mode.

### Posts — CRUD
- Connects to [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts)
- Full CRUD functionality:
  - **Read** posts on load
  - **Create** new posts
  - **Update** existing posts
  - **Delete** posts with confirmation
- Posts displayed in **cards grid** with dark theme
- Uses **`useMemo`** for filtered and sorted views

### Dark Mode
- Dark background with bright text for better readability.
- Different colors for `<h1>`, `<h2>`, and `<h3>` to highlight hierarchy.
- Cards have subtle shadows and elevation on hover.

---

## Project Structure
```
├── .env
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── common
│   │   │   ├── Card.jsx
│   │   │   └── Card.module.css
│   │   ├── Errors
│   │   │   └── NotFound.jsx
│   │   └── features
│   │       ├── Contact
│   │       │   ├── Contact.jsx
│   │       │   ├── Contact.module.css
│   │       │   └── index.js
│   │       ├── Hobbies
│   │       │   ├── Hobbies.jsx
│   │       │   ├── Hobbies.module.css
│   │       │   ├── hobbiesData.js
│   │       │   └── index.js
│   │       ├── Home
│   │       │   └── Home.jsx
│   │       ├── Post
│   │       │   ├── ApiPostCRUD.jsx
│   │       │   ├── ApiPostCRUD.module.css
│   │       │   └── index.js
│   │       └── Songs
│   │           ├── index.js
│   │           ├── Songs.jsx
│   │           ├── Songs.module.css
│   │           └── songsData.js
│   ├── index.css
│   ├── main.jsx
│   └── routes
│       └── AppRouter.jsx
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

3. **Set your environment variables:**

  Create a .env at the root:
  You can skip this step!
  For this exercise, we have uploaded the .env file because it does not contain any sensitive information, but this file should never be uploaded.
  ```bash
  REACT_VITE_API_URL=https://jsonplaceholder.typicode.com/posts
  ```
4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Go to http://localhost:5173 (or the port Vite provides) to view the project.

---

## Usage

- Homepage displays your name, hobbies, and songs.
- Hover over the cards to see the elevation effect.
- All album covers have the same size for a consistent layout.
- Add new songs by editing `src/assets/songs.json`.
- Contact form lets users send messages.
- **Posts section:**
  - Fetches posts on load
  - Allows creation, updating, and deleting posts
  - Use search and sorting filters

---

## Routes

- `/` or `/home` → Home component
- `/canciones` → Songs component
- `/hobbies` → Hobbies component
- `/contact` → Contact form component
- Any other route → 404 Not Found component

---

## Made with

- ❤️ React
- ⚡ Vite
- 🛠 React Router
- 🎨 CSS Modules & Dark Mode styling
- 🌐 JSONPlaceholder API (for CRUD posts)