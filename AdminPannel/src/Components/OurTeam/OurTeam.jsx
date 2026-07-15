import React, { useState } from 'react';
import './OurTeam.css';

const OurTeam = () => {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: '', designation: '', instagram: '', facebook: '', image: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeam([...team, { ...formData, id: Date.now() }]);
    setFormData({ name: '', designation: '', instagram: '', facebook: '', image: '' });
  };

  const deleteMember = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  return (
    <div className="team-container">
      {/* Form Section */}
      <div className="team-form-section">
        <h2>Add Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><input name="name" placeholder="Name" onChange={handleInputChange} value={formData.name} required /></div>
          <div className="form-group"><input name="designation" placeholder="Designation" onChange={handleInputChange} value={formData.designation} /></div>
          <div className="form-group"><input name="instagram" placeholder="Instagram URL" onChange={handleInputChange} value={formData.instagram} /></div>
          <div className="form-group"><input name="facebook" placeholder="Facebook URL" onChange={handleInputChange} value={formData.facebook} /></div>
          <div className="form-group"><input type="file" name="image" onChange={(e) => console.log(e.target.files[0])} /></div>
          <button type="submit">Add Member</button>
        </form>
      </div>

      {/* Table Section */}
      <div className="team-table-section">
        <h2>Team Members</h2>
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th><th>Designation</th><th>Socials</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.designation}</td>
                <td><a href={member.instagram}>IG</a> | <a href={member.facebook}>FB</a></td>
                <td className="action-dropdown">
                  ...
                  <div className="dropdown-menu">
                    <button onClick={() => alert('Edit')}>Edit</button>
                    <button onClick={() => deleteMember(member.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OurTeam;