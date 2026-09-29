import React, { useState } from 'react';
import './Lead.css';

const Lead = () => {
  // Sample dummy data simulating 25 leads to demonstrate pagination (20 per page)
  const [leads, setLeads] = useState([
    { id: 1, name: 'Ananya Das', email: 'ananya@example.com', phone: '+91 9876543210', message: 'Interested in your web development services.', date: '2026-07-15' },
    { id: 2, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 8765432109', message: 'Looking for a custom e-commerce solution.', date: '2026-07-14' },
    ...Array.from({ length: 23 }, (_, i) => ({
      id: i + 3,
      name: `User ${i + 3}`,
      email: `user${i + 3}@example.com', phone: '+91 70000000${i + 3}`,
      message: 'Automated test message for pagination scaling testing.',
      date: '2026-07-12'
    }))
  ]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = leads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leads.length / itemsPerPage);

  // Handlers
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== id);
      setLeads(updatedLeads);
      
      // Adjust current page if the last item on the current page is deleted
      const newTotalPages = Math.ceil(updatedLeads.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="Lead-container">
      <div className="Lead-header">
        <h2 className="Lead-title">Form Submissions (Leads)</h2>
        <span className="Lead-count">Total: {leads.length}</span>
      </div>

      <div className="Lead-table-wrapper">
        <table className="Lead-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th className="Lead-text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.length > 0 ? (
              currentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td className="Lead-font-semibold">{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td className="Lead-cell-message" title={lead.message}>
                    {lead.message}
                  </td>
                  <td>{lead.date}</td>
                  <td className="Lead-text-center">
                    <button 
                      className="Lead-delete-btn" 
                      onClick={() => handleDelete(lead.id)}
                      aria-label="Delete lead"
                    >
                      {/* Modern SVG Trash Icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="Lead-no-data">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="Lead-pagination">
          <button 
            className="Lead-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="Lead-page-numbers">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`Lead-page-number ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button 
            className="Lead-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Lead;