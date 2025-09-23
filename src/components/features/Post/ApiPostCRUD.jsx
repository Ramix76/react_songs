import { useEffect, useState, useMemo } from "react";
import Card from "../../common/Card";
import styles from "./ApiPostCRUD.module.css";

const API = import.meta.env.VITE_API_URL;

function toPost(p) {
  return { id: Number(p.id), title: p.title || "Untitled", body: p.body || "" };
}

export default function ApiPostCRUD() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const [query, setQuery] = useState("");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch(`${API}?_limit=12`);
        if (!res.ok) throw new Error("Error loading posts");
        const data = await res.json();
        if (!cancel) setPosts(data.map(toPost));
      } catch (e) { if (!cancel) setError(e.message); }
      finally { if (!cancel) setLoading(false); }
    })();
    return () => { cancel = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title: form.title.trim(), body: form.body.trim() };
    if (!payload.title || !payload.body) return;
    try {
      if (editingId == null) {
        const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Error creating post");
        const created = await res.json();
        setPosts(prev => [toPost({ ...payload, id: created.id }), ...prev]);
      } else {
        const res = await fetch(`${API}/${editingId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Error updating post");
        const updated = await res.json();
        setPosts(prev => prev.map(p => (p.id === editingId ? toPost({ ...p, ...updated }) : p)));
      }
      setForm({ title: "", body: "" });
      setEditingId(null);
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting post");
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) { setError(e.message); }
  };

  const filteredSortedPosts = useMemo(() => {
    let filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    return filtered.sort((a, b) => sortDir === "asc" ? a.id - b.id : b.id - a.id);
  }, [posts, query, sortDir]);

  if (loading) return <p className={styles.status}>Loading…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <h2>Posts — CRUD</h2>
      <form className={styles.controls} onSubmit={handleSubmit}>
        <input className={styles.input} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input className={styles.input} placeholder="Content" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} required />
        <button type="submit">{editingId == null ? "Create" : "Save changes"}</button>
        {editingId && <button type="button" onClick={() => { setForm({ title: "", body: "" }); setEditingId(null); }}>Cancel</button>}
      </form>

      <div className={styles.controls}>
        <input className={styles.input} placeholder="Search by title…" value={query} onChange={e => setQuery(e.target.value)} />
        <select className={styles.select} value={sortDir} onChange={e => setSortDir(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredSortedPosts.map(p => (
          <Card key={p.id} className={styles.card}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className={styles.cardButtons}>
              <button onClick={() => setEditingId(p.id) || setForm({ title: p.title, body: p.body })}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ background: "#fee2e2", color: "#b91c1c" }}>Delete</button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}