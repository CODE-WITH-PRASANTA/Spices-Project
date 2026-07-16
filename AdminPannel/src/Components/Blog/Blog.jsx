import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaCloudUploadAlt, FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';
import './Blog.css'; // Importing the CSS file

const Blog = () => {
  const fileInputRef = useRef(null);
  const [blogs, setBlogs] = useState([]); // State to store all blog posts
  const [currentEditId, setCurrentEditId] = useState(null); // Track which blog is being edited
  const [formData, setFormData] = useState({
    imageName: '',
    imagePreview: null,
    title: '',
    date: '',
    description: '',
  });

  // TinyMCE setup - For local development, you don't need an API key. 
  // Just use 'no-api-key' and keep 'initialValue'.
  const apiKey = 'no-api-key'; 

  // Handle regular input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle TinyMCE editor change
  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, description: content });
  };

  // Handle File Input and Drag & Drop
  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageName: file.name, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files[0]);
  };

  // Handle Form Submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description) {
      alert('Please fill in Title, Date, and Description.');
      return;
    }

    if (currentEditId) {
      // Update existing blog
      setBlogs(blogs.map(blog => blog.id === currentEditId ? { ...formData, id: currentEditId } : blog));
      setCurrentEditId(null);
    } else {
      // Add new blog
      const newBlog = { ...formData, id: Date.now() }; // Generate a unique ID
      setBlogs([...blogs, newBlog]);
    }

    // Reset form after submission
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      imageName: '',
      imagePreview: null,
      title: '',
      date: '',
      description: '',
    });
    // In React TinyMCE, you'll see a reset is often needed on the editor instance itself or the key
  };

  // Handle Edit Action
  const handleEdit = (id) => {
    const blogToEdit = blogs.find(blog => blog.id === id);
    if (blogToEdit) {
      setCurrentEditId(id);
      setFormData(blogToEdit); // Load blog data back into the form
    }
  };

  // Handle Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      if (id === currentEditId) {
        resetForm();
        setCurrentEditId(null);
      }
    }
  };

  // Clean description HTML to display plain text in table
  const renderDescription = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="Blog">
      <div className="Blog__container">
        
        {/* --- LEFT SIDE: THE FORM (Reference Image) --- */}
        <div className="Blog__form-section">
          <form className="Blog__form" onSubmit={handleSubmit}>
            <h2 className="Blog__heading">Blog Posting</h2>

            <div className="Blog__field Blog__field--upload">
              <label className="Blog__label">UPLOAD IMAGE</label>
              <div 
                className="Blog__upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                {formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="Preview" className="Blog__upload-preview" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="Blog__upload-icon" />
                    <span className="Blog__upload-text">Drag & drop or click to upload</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                />
              </div>
              {formData.imageName && <p className="Blog__image-name">{formData.imageName}</p>}
            </div>

            <div className="Blog__field">
              <label className="Blog__label" htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="Blog__input"
                placeholder="Enter file title here..."
              />
            </div>

            <div className="Blog__field">
              <label className="Blog__label" htmlFor="date">DATE</label>
              <div className="Blog__input-wrapper">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="Blog__input Blog__input--date"
                  placeholder="Select or enter date..."
                />
                <FaCalendarAlt className="Blog__date-icon" />
              </div>
            </div>

            <div className="Blog__field Blog__field--description">
              <label className="Blog__label" htmlFor="description">DESCRIPTION</label>
              <Editor
                apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                id="description-editor"
                init={{
                  height: 250,
                  menubar: false,
                  placeholder: "Type your detailed file description here...",
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif; font-size: 14px }',
                }}
                value={formData.description}
                onEditorChange={handleEditorChange}
              />
            </div>

            <button type="submit" className="Blog__submit-btn">
              {currentEditId ? 'UPDATE POST' : 'SUBMIT'}
            </button>
            {currentEditId && (
              <button type="button" className="Blog__cancel-btn" onClick={resetForm}>
                CANCEL EDIT
              </button>
            )}
          </form>
        </div>

        {/* --- RIGHT SIDE: THE TABLE (Blog List) --- */}
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
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td className="Blog__td--image">
                      {blog.imagePreview ? (
                        <img src={blog.imagePreview} alt={blog.title} className="Blog__table-preview" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="Blog__td--title">{blog.title}</td>
                    <td>{blog.date}</td>
                    <td className="Blog__td--description">
                      {/* Truncate plain text for table view */}
                      {renderDescription(blog.description).substring(0, 80)}...
                    </td>
                    <td className="Blog__td--actions">
                      <button className="Blog__action-btn Blog__action-btn--edit" onClick={() => handleEdit(blog.id)}>
                        <FaEdit />
                      </button>
                      <button className="Blog__action-btn Blog__action-btn--delete" onClick={() => handleDelete(blog.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="Blog__no-data">No blog posts yet. Fill the form to add one.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;