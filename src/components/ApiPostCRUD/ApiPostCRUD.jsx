import { useEffect, useState, useMemo } from "react";
import styles from "./ApiPostCRUD.module.css";

const API = process.env.REACT_APP_API_URL;

// Helper to format posts
function toPost(p) {
  return {
    id: Number(p.id),
    title: p.title || "Untitled",
    body: p.body || "",
  };
}

export default function ApiPostCRUD() {
  // ---- Base states ----
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Form states ----
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });

  // ---- Filters & search ----
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState("desc"); // asc | desc

  // ---- READ: fetch posts on load ----
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch(`${API}?_limit=12`);
        if (!res.ok) throw new Error("Error loading posts");
        const data = await res.json();
        if (!cancel) setPosts(data.map(toPost));
      } catch (e) {
        if (!cancel) setError(e.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  // ---- CREATE / UPDATE ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title: form.title.trim(), body: form.body.trim() };
    try {
      if (!payload.title || !payload.body) return;

      if (editingId == null) {
        // CREATE
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error creating post");
        const created = await res.json();
        setPosts((prev) => [toPost({ ...payload, id: created.id }), ...prev]);
      } else {
        // UPDATE
        const res = await fetch(`${API}/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error updating post");
        const updated = await res.json();
        setPosts((prev) =>
          prev.map((p) => (p.id === editingId ? toPost({ ...p, ...updated }) : p))
        );
      }

      setForm({ title: "", body: "" });
      setEditingId(null);
    } catch (e2) {
      setError(e2.message);
    }
  };

  // ---- DELETE ----
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting post");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e2) {
      setError(e2.message);
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({ title: post.title, body: post.body });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Filtered & sorted posts with useMemo ----
  const filteredSortedPosts = useMemo(() => {
    let filtered = posts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.sort((a, b) =>
      sortDir === "asc" ? a.id - b.id : b.id - a.id
    );
  }, [posts, query, sortDir]);

  if (loading) return <p className={styles.status}>Loading…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <h2>Posts — CRUD</h2>

      {/* Create/Update Form */}
      <form className={styles.controls} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className={styles.input}
          name="body"
          placeholder="Content"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          required
        />
        <button type="submit">
          {editingId == null ? "Create" : "Save changes"}
        </button>
        {editingId != null && (
          <button
            type="button"
            onClick={() => {
              setForm({ title: "", body: "" });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Filters */}
      <div className={styles.controls} style={{ marginTop: "10px" }}>
        <input
          className={styles.input}
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className={styles.select}
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
        >
          <option value="desc">Descending order</option>
          <option value="asc">Ascending order</option>
        </select>
      </div>

      {/* Posts grid */}
      <ul className={styles.grid}>
        {filteredSortedPosts.map((p) => (
          <li key={p.id} className={styles.card}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className={styles.cardButtons}>
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ background: "#fee2e2", color: "#b91c1c" }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}