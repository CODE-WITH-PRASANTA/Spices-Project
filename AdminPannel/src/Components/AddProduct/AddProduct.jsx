import React, { useState, useRef } from 'react';
import './AddProduct.css';
import { 
  FiUpload, 
  FiX, 
  FiPlus, 
  FiBold, 
  FiItalic, 
  FiUnderline, 
  FiList, 
  FiLink, 
  FiCheck,
  FiChevronDown
} from 'react-icons/fi';
import { MdFormatListNumbered, MdCleaningServices } from 'react-icons/md';

const AddProduct = () => {
  // State variables for form fields
  const [formData, setFormData] = useState({
    productName: 'Black Cardamom Powder',
    shortDescription: 'Premium quality black cardamom powder with rich aroma and strong flavor.',
    fullDescription: 'Our black cardamom powder is made from the finest quality black cardamom seeds. It is widely used in Indian cuisine for enhancing the flavor of biryani, curries, and many other dishes. 100% natural, no additives, no preservatives.',
    category: 'Masala',
    subCategory: 'Whole Spices',
    brand: 'SpiceMart',
    tags: ['Premium', 'Organic', 'Bestseller'],
    mrp: '650',
    sellingPrice: '569',
    purchasePrice: '420',
    discountType: 'Percentage',
    discountVal: '12',
    gst: '18%',
    currentStock: '245',
    lowStockAlert: '20',
    stockStatus: 'In Stock',
    allowBackorders: false,
    sku: 'SPM-BLKCRD-500',
    barcode: '879845621478',
    weight: '500',
    weightUnit: 'gm',
    hsnCode: '0910',
    sizeOptions: ['50 gm', '100 gm', '250 gm', '500 gm', '1 Kg'],
    colors: ['#8B4513', '#6B8E23', '#CD853F', '#1A1A1A'],
    featuredProduct: true,
    bestseller: true,
    newArrival: false,
    showOnHomepage: true,
    allowCustomerReviews: true,
    active: true,
    seoTitle: 'Buy Black Cardamom Powder Online | Premium Quality',
    metaDescription: 'Buy premium quality black cardamom powder online at best prices.',
    notifyCustomers: true,
    setThumbnail: true
  });

  // State for image handling
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200'
  ]);

  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Rich Text Formatting logic
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  // Image Upload logic
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Tags & Options Management
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const removeSizeOption = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizeOptions: prev.sizeOptions.filter((size) => size !== sizeToRemove)
    }));
  };

  // Action Button Handlers
  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
    console.log('Saved Draft Data:', formData);
  };

  const handlePreview = () => {
    alert(`Previewing Product: ${formData.productName}`);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    alert(`Product "${formData.productName}" published successfully!`);
    console.log('Published Product Data:', { ...formData, images });
  };

  const wordCount = formData.fullDescription.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="AddProduct-container">
      {/* Top Header */}
      <div className="AddProduct-header">
        <div className="AddProduct-header-left">
          <div className="AddProduct-icon-badge">📦</div>
          <div>
            <h2 className="AddProduct-title">Add New Product</h2>
            <p className="AddProduct-subtitle">Fill in the product details below to add a new product to your store.</p>
          </div>
        </div>
        <div className="AddProduct-header-actions">
          <button type="button" className="AddProduct-btn AddProduct-btn-outline" onClick={handleSaveDraft}>Save Draft</button>
          <button type="button" className="AddProduct-btn AddProduct-btn-outline" onClick={handlePreview}>Preview</button>
          <button type="button" className="AddProduct-btn AddProduct-btn-primary" onClick={handlePublish}>Publish Product</button>
          <button type="button" className="AddProduct-close-btn"><FiX /></button>
        </div>
      </div>

      <form onSubmit={handlePublish} className="AddProduct-form">
        <div className="AddProduct-grid-main">
          
          {/* Left Column - Product Images */}
          <div className="AddProduct-card AddProduct-images-card">
            <h3 className="AddProduct-card-title">Product Images <span className="AddProduct-required">*</span></h3>
            
            <div className="AddProduct-dropzone" onClick={handleBrowseClick}>
              <FiUpload className="AddProduct-upload-icon" />
              <p className="AddProduct-dropzone-text">
                Drag & drop images here <br />
                or <span className="AddProduct-link">click to browse</span>
              </p>
              <span className="AddProduct-dropzone-hint">JPG, PNG, WEBP (Max 5MB each)</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                multiple 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            <div className="AddProduct-image-gallery">
              {images.map((imgSrc, idx) => (
                <div key={idx} className="AddProduct-image-item">
                  <img src={imgSrc} alt={`Product thumbnail ${idx + 1}`} />
                  <button type="button" className="AddProduct-remove-img" onClick={() => handleRemoveImage(idx)}>
                    <FiX />
                  </button>
                </div>
              ))}
              <div className="AddProduct-add-more-img" onClick={handleBrowseClick}>
                <FiPlus />
              </div>
            </div>

            <label className="AddProduct-checkbox-label AddProduct-mt-3">
              <input 
                type="checkbox" 
                name="setThumbnail" 
                checked={formData.setThumbnail} 
                onChange={handleChange} 
              />
              <span>Set first image as thumbnail</span>
            </label>
          </div>

          {/* Right Column - Basic Information */}
          <div className="AddProduct-card AddProduct-basic-info-card">
            <h3 className="AddProduct-card-title">Basic Information</h3>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Product Name <span className="AddProduct-required">*</span></label>
              <input 
                type="text" 
                name="productName" 
                value={formData.productName} 
                onChange={handleChange} 
                className="AddProduct-input" 
                required 
              />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Short Description</label>
              <input 
                type="text" 
                name="shortDescription" 
                value={formData.shortDescription} 
                onChange={handleChange} 
                className="AddProduct-input" 
              />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Full Description</label>
              <div className="AddProduct-editor">
                <div className="AddProduct-editor-toolbar">
                  <select className="AddProduct-select-sm">
                    <option>Paragraph</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                  <div className="AddProduct-toolbar-divider" />
                  <button type="button" onClick={() => handleFormat('bold')} title="Bold"><FiBold /></button>
                  <button type="button" onClick={() => handleFormat('italic')} title="Italic"><FiItalic /></button>
                  <button type="button" onClick={() => handleFormat('underline')} title="Underline"><FiUnderline /></button>
                  <div className="AddProduct-toolbar-divider" />
                  <button type="button" onClick={() => handleFormat('insertUnorderedList')} title="Bullet List"><FiList /></button>
                  <button type="button" onClick={() => handleFormat('insertOrderedList')} title="Numbered List"><MdFormatListNumbered /></button>
                  <div className="AddProduct-toolbar-divider" />
                  <button type="button" onClick={() => {
                    const url = prompt('Enter link URL:');
                    if (url) document.execCommand('createLink', false, url);
                  }} title="Link"><FiLink /></button>
                  <button type="button" onClick={() => handleFormat('removeFormat')} title="Clear Formatting"><MdCleaningServices /></button>
                </div>

                <div 
                  className="AddProduct-editor-content" 
                  contentEditable 
                  ref={editorRef}
                  onInput={(e) => setFormData({ ...formData, fullDescription: e.currentTarget.innerText })}
                  suppressContentEditableWarning={true}
                >
                  {formData.fullDescription}
                </div>
                <div className="AddProduct-editor-footer">
                  {wordCount} words
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row - Category, Pricing, Inventory, Details */}
        <div className="AddProduct-grid-four">
          
          {/* Category & Brand */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Category & Brand</h3>
            
            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Category <span className="AddProduct-required">*</span></label>
              <div className="AddProduct-select-wrapper">
                <select name="category" value={formData.category} onChange={handleChange} className="AddProduct-select">
                  <option value="Masala">Masala</option>
                  <option value="Grains">Grains</option>
                  <option value="Oils">Oils</option>
                </select>
                <FiChevronDown className="AddProduct-select-icon" />
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Sub Category</label>
              <div className="AddProduct-select-wrapper">
                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="AddProduct-select">
                  <option value="Whole Spices">Whole Spices</option>
                  <option value="Powdered Spices">Powdered Spices</option>
                </select>
                <FiChevronDown className="AddProduct-select-icon" />
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Brand</label>
              <div className="AddProduct-select-wrapper">
                <select name="brand" value={formData.brand} onChange={handleChange} className="AddProduct-select">
                  <option value="SpiceMart">SpiceMart</option>
                  <option value="Organica">Organica</option>
                </select>
                <FiChevronDown className="AddProduct-select-icon" />
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Tags</label>
              <div className="AddProduct-tags-container">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="AddProduct-chip">
                    {tag} <FiX onClick={() => removeTag(tag)} className="AddProduct-chip-remove" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Pricing</h3>

            <div className="AddProduct-row-2col">
              <div className="AddProduct-form-group">
                <label className="AddProduct-label">MRP (₹) <span className="AddProduct-required">*</span></label>
                <input type="text" name="mrp" value={formData.mrp} onChange={handleChange} className="AddProduct-input" />
              </div>
              <div className="AddProduct-form-group">
                <label className="AddProduct-label">Selling Price (₹) <span className="AddProduct-required">*</span></label>
                <input type="text" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="AddProduct-input" />
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Purchase Price (₹)</label>
              <input type="text" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className="AddProduct-input" />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Discount</label>
              <div className="AddProduct-input-group">
                <div className="AddProduct-select-wrapper" style={{ flex: '1.2' }}>
                  <select name="discountType" value={formData.discountType} onChange={handleChange} className="AddProduct-select">
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat</option>
                  </select>
                  <FiChevronDown className="AddProduct-select-icon" />
                </div>
                <input type="text" name="discountVal" value={formData.discountVal} onChange={handleChange} className="AddProduct-input" style={{ flex: '0.8' }} />
                <span className="AddProduct-input-addon">%</span>
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">GST</label>
              <div className="AddProduct-select-wrapper">
                <select name="gst" value={formData.gst} onChange={handleChange} className="AddProduct-select">
                  <option value="5%">5%</option>
                  <option value="12%">12%</option>
                  <option value="18%">18%</option>
                  <option value="28%">28%</option>
                </select>
                <FiChevronDown className="AddProduct-select-icon" />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Inventory</h3>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Current Stock <span className="AddProduct-required">*</span></label>
              <div className="AddProduct-input-group">
                <input type="text" name="currentStock" value={formData.currentStock} onChange={handleChange} className="AddProduct-input" />
                <span className="AddProduct-input-addon-bg">Units</span>
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Low Stock Alert</label>
              <div className="AddProduct-input-group">
                <input type="text" name="lowStockAlert" value={formData.lowStockAlert} onChange={handleChange} className="AddProduct-input" />
                <span className="AddProduct-input-addon-bg">Units</span>
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Stock Status</label>
              <div className="AddProduct-select-wrapper">
                <select name="stockStatus" value={formData.stockStatus} onChange={handleChange} className="AddProduct-select AddProduct-select-status">
                  <option value="In Stock">🟢 In Stock</option>
                  <option value="Out of Stock">🔴 Out of Stock</option>
                </select>
                <FiChevronDown className="AddProduct-select-icon" />
              </div>
            </div>

            <label className="AddProduct-checkbox-label AddProduct-mt-4">
              <input type="checkbox" name="allowBackorders" checked={formData.allowBackorders} onChange={handleChange} />
              <span>Allow Backorders</span>
            </label>
          </div>

          {/* Product Details */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Product Details</h3>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">SKU <span className="AddProduct-required">*</span></label>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="AddProduct-input" />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Barcode</label>
              <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} className="AddProduct-input" />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Weight</label>
              <div className="AddProduct-input-group">
                <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="AddProduct-input" />
                <div className="AddProduct-select-wrapper" style={{ width: '80px' }}>
                  <select name="weightUnit" value={formData.weightUnit} onChange={handleChange} className="AddProduct-select">
                    <option value="gm">gm</option>
                    <option value="kg">kg</option>
                  </select>
                  <FiChevronDown className="AddProduct-select-icon" />
                </div>
              </div>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">HSN Code</label>
              <input type="text" name="hsnCode" value={formData.hsnCode} onChange={handleChange} className="AddProduct-input" />
            </div>
          </div>
        </div>

        {/* Bottom Row - Attributes, Visibility, SEO */}
        <div className="AddProduct-grid-three">
          
          {/* Product Attributes */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Product Attributes</h3>
            
            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Size / Weight Options</label>
              <div className="AddProduct-tags-container">
                {formData.sizeOptions.map((size, idx) => (
                  <span key={idx} className="AddProduct-chip">
                    {size} <FiX onClick={() => removeSizeOption(size)} className="AddProduct-chip-remove" />
                  </span>
                ))}
              </div>
              <button type="button" className="AddProduct-add-opt-btn">+ Add Option</button>
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Color (if applicable)</label>
              <div className="AddProduct-color-swatches">
                {formData.colors.map((color, i) => (
                  <span key={i} className="AddProduct-swatch" style={{ backgroundColor: color }} />
                ))}
                <button type="button" className="AddProduct-swatch-add"><FiPlus /></button>
              </div>
            </div>
          </div>

          {/* Product Visibility */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">Product Visibility</h3>
            
            <div className="AddProduct-visibility-grid">
              <label className="AddProduct-checkbox-label">
                <input type="checkbox" name="featuredProduct" checked={formData.featuredProduct} onChange={handleChange} />
                <span>Featured Product</span>
              </label>

              <label className="AddProduct-checkbox-label">
                <input type="checkbox" name="showOnHomepage" checked={formData.showOnHomepage} onChange={handleChange} />
                <span>Show on Homepage</span>
              </label>

              <label className="AddProduct-checkbox-label">
                <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
                <span>Bestseller</span>
              </label>

              <label className="AddProduct-checkbox-label">
                <input type="checkbox" name="allowCustomerReviews" checked={formData.allowCustomerReviews} onChange={handleChange} />
                <span>Allow Customer Reviews</span>
              </label>

              <label className="AddProduct-checkbox-label">
                <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} />
                <span>New Arrival</span>
              </label>

              <div className="AddProduct-toggle-row">
                <span>Active</span>
                <label className="AddProduct-toggle-switch">
                  <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
                  <span className="AddProduct-toggle-slider" />
                </label>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="AddProduct-card">
            <h3 className="AddProduct-card-title">SEO Settings</h3>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">SEO Title</label>
              <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="AddProduct-input" />
            </div>

            <div className="AddProduct-form-group">
              <label className="AddProduct-label">Meta Description</label>
              <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} className="AddProduct-textarea" rows="2" />
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="AddProduct-footer-bar">
          <label className="AddProduct-checkbox-label">
            <input type="checkbox" name="notifyCustomers" checked={formData.notifyCustomers} onChange={handleChange} />
            <span>Notify customers about this product</span>
          </label>

          <div className="AddProduct-footer-actions">
            <button type="button" className="AddProduct-btn AddProduct-btn-outline">Cancel</button>
            <button type="submit" className="AddProduct-btn AddProduct-btn-primary">Save & Publish Product</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;