import React, { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  // Fetch members from backend
  useEffect(() => {
    fetch(`${apiUrl}/members`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(() => setMembers([]));
  }, []);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${apiUrl}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newMember = await res.json();
      setMembers([...members, newMember]);
      setForm({ name: '', email: '', phone: '' });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Church Members</h2>
      <ul>
        {members.map((m, i) => (
          <li key={i}>{m.name} ({m.email}, {m.phone})</li>
        ))}
      </ul>
      <h3>Add Member</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default Members;