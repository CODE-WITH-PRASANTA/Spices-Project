import React, { useState } from 'react';
import './OurTeam.css';

const OurTeam = () => {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: '', designation: '', instagram: '', facebook: '', id: null });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setTeam(team.map(m => m.id === formData.id ? formData : m));
    } else {
      setTeam([...team, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', designation: '', instagram: '', facebook: '', id: null });
  };

  const deleteMember = (id) => setTeam(team.filter(m => m.id !== id));
  
  const editMember = (member) => setFormData(member);

  return (
    <div className="team-container">
      {/* Form Section */}
      <div className="team-form-section">
        <h2>{formData.id ? "Edit Member Details" : "Add Team Member"}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              id="name"
              name="name" 
              type="text"
              placeholder="e.g. John Doe" 
              onChange={handleInputChange} 
              value={formData.name} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input 
              id="designation"
              name="designation" 
              type="text"
              placeholder="e.g. Software Engineer" 
              onChange={handleInputChange} 
              value={formData.designation} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="instagram">Instagram Profile URL</label>
            <input 
              id="instagram"
              name="instagram" 
              type="url"
              placeholder="https://instagram.com/username" 
              onChange={handleInputChange} 
              value={formData.instagram} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="facebook">Facebook Profile URL</label>
            <input 
              id="facebook"
              name="facebook" 
              type="url"
              placeholder="https://facebook.com/username" 
              onChange={handleInputChange} 
              value={formData.facebook} 
            />
          </div>

          <button type="submit" className="submit-btn">
            {formData.id ? "Update Member" : "Add to Team"}
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="team-table-section">
        <h2>Our Team</h2>
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Socials</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>
                  No team members added yet.
                </td>
              </tr>
            ) : (
              team.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.designation || '—'}</td>
                  <td>
                    {m.instagram && <a href={m.instagram} target="_blank" rel="noreferrer">Instagram</a>}
                    {m.instagram && m.facebook && ' / '}
                    {m.facebook && <a href={m.facebook} target="_blank" rel="noreferrer">Facebook</a>}
                    {!m.instagram && !m.facebook && '—'}
                  </td>
                  <td className="action-container">
                    ⋮
                    <div className="dropdown-menu">
                      <button type="button" onClick={() => editMember(m)}>Edit</button>
                      <button type="button" className="text-danger" onClick={() => deleteMember(m.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurTeam;