import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './PremiumQuality.css';

const PremiumQuality = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: null, imageUrl: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { ...formData, id: Date.now() }]);
    setFormData({ title: '', description: '', image: null, imageUrl: '' });
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="pq-container">
      <div className="pq-section">
        <h2>Add Premium Quality Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="pq-form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="pq-form-group">
            <label>Title</label>
            <input placeholder="Enter title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="pq-form-group">
            <label>Description</label>
            <Editor
              apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
              value={formData.description}
              onEditorChange={(content) => setFormData({...formData, description: content})}
              init={{ height: 200, menubar: false }}
            />
          </div>
          <button type="submit" className="pq-submit-btn">Submit</button>
        </form>
      </div>

      <div className="pq-section">
        <h2>Quality List</h2>
        <table className="pq-table">
          <thead>
            <tr><th>Image</th><th>Title</th><th>Action</th></tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.id}>
                <td>{item.imageUrl && <img src={item.imageUrl} alt="img" className="pq-table-img" />}</td>
                <td>{item.title}</td>
                <td className="pq-action">⋮
                  <div className="pq-dropdown">
                    <button className="btn-edit" onClick={() => alert("Edit: " + item.title)}>
                      ✎ Edit
                    </button>
                    <button className="btn-delete" onClick={() => deleteItem(item.id)}>
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pq-pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumQuality;