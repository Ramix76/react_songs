import { useEffect, useState, useMemo } from "react";
import Card from "../../common/Card";
import styles from "./ApiPostCRUD.module.css";

const API = import.meta.env.VITE_API_URL;

function normalizePost(post) {
  return { id: Number(post.id), title: post.title || "Untitled", body: post.body || "" };
}

export default function ApiPostCRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [query, setQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  // Fetch posts
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${API}?_limit=12`);
        if (!response.ok) throw new Error(`Failed to load posts: ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          setPosts(data.map(normalizePost));
          setApiError(null);
        }
      } catch (err) {
        if (!cancelled) setApiError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Create or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title: form.title.trim(), body: form.body.trim() };
    if (!payload.title || !payload.body) return;

    try {
      let response, data;
      if (editingId == null) {
        response = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error("Failed to create post");
        data = await response.json();
        setPosts(prev => [normalizePost({ ...payload, id: data.id }), ...prev]);
      } else {
        response = await fetch(`${API}/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error("Failed to update post");
        data = await response.json();
        setPosts(prev => prev.map(p => (p.id === editingId ? normalizePost({ ...p, ...data }) : p)));
      }
      setForm({ title: "", body: "" });
      setEditingId(null);
      setApiError(null);
    } catch (err) {
      setApiError(err.message);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete post");
      setPosts(prev => prev.filter(p => p.id !== id));
      setApiError(null);
    } catch (err) {
      setApiError(err.message);
    }
  };

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    return filtered.sort((a, b) => sortDirection === "asc" ? a.id - b.id : b.id - a.id);
  }, [posts, query, sortDirection]);

  return (
    <section className={styles.wrapper}>
      <h2>Posts — CRUD</h2>

      {/* Status messages */}
      {loading && <p className={styles.status}>Loading…</p>}
      {apiError && <p className={styles.error}>{apiError}</p>}

      {/* Form */}
      <form className={styles.controls} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className={styles.input}
          placeholder="Content"
          value={form.body}
          onChange={e => setForm({ ...form, body: e.target.value })}
          required
        />
        <button type="submit">{editingId == null ? "Create" : "Save changes"}</button>
        {editingId && (
          <button type="button" onClick={() => { setForm({ title: "", body: "" }); setEditingId(null); }}>
            Cancel
          </button>
        )}
      </form>

      {/* Filters */}
      <div className={styles.controls}>
        <input
          className={styles.input}
          placeholder="Search by title…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className={styles.select}
          value={sortDirection}
          onChange={e => setSortDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Post grid */}
      <div className={styles.grid}>
        {filteredAndSortedPosts.map(p => (
          <Card key={p.id} className={styles.card}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className={styles.cardButtons}>
              <button onClick={() => { setEditingId(p.id); setForm({ title: p.title, body: p.body }); }}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ background: "#fee2e2", color: "#b91c1c" }}>Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}