import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaCloudUploadAlt, FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';
import './Blog.css';
import axiosInstance, { BACKEND_URL } from '../../api/axiosInstance';

const Blog = () => {
  const fileInputRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({
    imageName: '',
    imagePreview: null,
    title: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blog/all');
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, description: content });
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          image: file, 
          imageName: file.name, 
          imagePreview: reader.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("date", formData.date);
      fd.append("description", formData.description);

      if (formData.image) {
        fd.append("images", formData.image);
      }

      let response;
      if (currentEditId) {
        response = await axiosInstance.put(`/blog/update/${currentEditId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs((prev) => prev.map((item) => item._id === currentEditId ? response.data.blog : item));
      } else {
        response = await axiosInstance.post('/blog/create', fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs((prev) => [response.data.blog, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const resetForm = () => {
    setFormData({ imageName: '', imagePreview: null, title: '', date: '', description: '' });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setCurrentEditId(null);
  };

const handleEdit = (id) => {
  const blogToEdit = blogs.find(blog => blog._id === id);
  if (blogToEdit) {
    setCurrentEditId(id);
    setFormData({
      ...blogToEdit,
      date: blogToEdit.date ? blogToEdit.date.split('T')[0] : '',
      imagePreview: blogToEdit.images && blogToEdit.images.length > 0 
        ? `${BACKEND_URL}/uploads/blogs/${blogToEdit.images[0]}` 
        : null
    });
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axiosInstance.delete(`/blog/delete/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        alert("Error deleting blog");
      }
    }
  };

  return (
    <div className="Blog">
      <div className="Blog__container">
        <div className="Blog__form-section">
          <form className="Blog__form" onSubmit={handleSubmit}>
            <h2 className="Blog__heading">Blog Posting</h2>
            
            <div className="Blog__field Blog__field--upload">
              <label className="Blog__label">UPLOAD IMAGE</label>
              <div className="Blog__upload-box" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }} onClick={() => fileInputRef.current.click()}>
                {formData.imagePreview ? <img src={formData.imagePreview} alt="Preview" className="Blog__upload-preview" /> : 
                <><FaCloudUploadAlt className="Blog__upload-icon" /><span className="Blog__upload-text">Drag & drop or click</span></>}
                <input type="file" ref={fileInputRef} onChange={(e) => handleFile(e.target.files[0])} style={{ display: 'none' }} accept="image/*" />
              </div>
            </div>

            <div className="Blog__field">
              <label className="Blog__label">TITLE</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="Blog__input" required />
            </div>

            <div className="Blog__field">
              <label className="Blog__label">DATE</label>
              <div className="Blog__input-wrapper">
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="Blog__input Blog__input--date" required />
                <FaCalendarAlt className="Blog__date-icon" />
              </div>
            </div>

            <div className="Blog__field Blog__field--description">
              <label className="Blog__label">DESCRIPTION</label>
              <Editor apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu" value={formData.description} onEditorChange={handleEditorChange} init={{ height: 250, menubar: false }} />
            </div>

            <button type="submit" className="Blog__submit-btn">{currentEditId ? 'UPDATE POST' : 'SUBMIT'}</button>
            {currentEditId && <button type="button" className="Blog__cancel-btn" onClick={resetForm}>CANCEL EDIT</button>}
          </form>
        </div>

        <div className="Blog__table-section">
          <div className="Blog__table-wrapper">
            <h3 className="Blog__sub-heading">Generated Blog Table</h3>
            <table className="Blog__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td className="Blog__td--image">
            {blog.images && blog.images.length > 0 ? (
              <img 
                src={`${BACKEND_URL}/uploads/blogs/${blog.images[0]}`} 
                alt="Blog" 
                className="Blog__table-preview" 
              />
            ) : (
              "No Image"
            )}
          </td>
                    <td className="Blog__td--title">{blog.title}</td>
                    <td>{new Date(blog.date).toLocaleDateString()}</td>
                    <td className="Blog__td--actions">
                      <button className="Blog__action-btn Blog__action-btn--edit" onClick={() => handleEdit(blog._id)}><FaEdit /></button>
                      <button className="Blog__action-btn Blog__action-btn--delete" onClick={() => handleDelete(blog._id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;