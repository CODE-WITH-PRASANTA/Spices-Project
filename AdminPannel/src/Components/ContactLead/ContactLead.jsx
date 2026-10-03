import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import API from "../../api/axios";
import "./ContactLead.css";

const ContactLead = () => {
  // ======================================================
  // STATES
  // ======================================================

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [deleteLead, setDeleteLead] = useState(null);

  const [showBulkDelete, setShowBulkDelete] =
    useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    status: "New",
  });

  const ITEMS_PER_PAGE = 6;

  // ======================================================
  // FETCH LEADS
  // ======================================================

  const fetchLeads = async (showLoader = true, showError = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await API.get("/cold-leads");

      if (response.data?.success) {
        setLeads(response.data.data || []);
      } else {
        throw new Error(
          response.data?.message ||
            "Failed to fetch leads."
        );
      }
    } catch (error) {
      console.error("Fetch leads error:", error);

      if (showError) {
        Swal.fire({
          icon: "error",
          title: "Unable to Load Leads",
          text:
            error?.response?.data?.message ||
            "Please check your backend server.",
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

 useEffect(() => {
  fetchLeads(true, true);
}, []);

  // ======================================================
  // STATISTICS
  // ======================================================

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const repliedLeads = leads.filter(
    (lead) => lead.status === "Replied"
  ).length;

  const pendingLeads = leads.filter(
    (lead) => lead.status === "Pending"
  ).length;

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDateOnly = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toISOString().split("T")[0];
  };

  // ======================================================
  // FILTER
  // ======================================================

  const filteredLeads = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSearch =
        !searchText ||
        lead.name
          ?.toLowerCase()
          .includes(searchText) ||
        lead.email
          ?.toLowerCase()
          .includes(searchText) ||
        lead.phone
          ?.toLowerCase()
          .includes(searchText) ||
        lead.address
          ?.toLowerCase()
          .includes(searchText) ||
        lead.message
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        lead.status === statusFilter;

      const leadDate = getDateOnly(lead.createdAt);

      const matchesFrom =
        !fromDate || leadDate >= fromDate;

      const matchesTo =
        !toDate || leadDate <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    leads,
    search,
    statusFilter,
    fromDate,
    toDate,
  ]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredLeads.length / ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // ======================================================
  // SELECT
  // ======================================================

  const currentIds = currentLeads.map(
    (lead) => lead._id
  );

  const allCurrentSelected =
    currentIds.length > 0 &&
    currentIds.every((id) =>
      selectedIds.includes(id)
    );

  const handleSelectAll = () => {
    if (allCurrentSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !currentIds.includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...currentIds]),
      ]);
    }
  };

  const handleSelectSingle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ======================================================
  // RESET
  // ======================================================

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All Status");
    setFromDate("");
    setToDate("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh = async () => {
    setSelectedIds([]);
    setCurrentPage(1);

    await fetchLeads(false, true);
  };

  // ======================================================
  // VIEW
  // ======================================================

  const handleView = (lead) => {
    setViewLead(lead);
  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

  const openEdit = (lead) => {
    setEditLead(lead);

    setEditForm({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      address: lead.address || "",
      message: lead.message || "",
      status: lead.status || "New",
    });
  };

  // ======================================================
  // EDIT CHANGE
  // ======================================================

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ======================================================
  // SAVE EDIT
  // ======================================================

  const handleSaveEdit = async () => {
    if (!editLead) return;

    try {
      const response = await API.put(
        `/cold-leads/${editLead._id}`,
        editForm
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to update lead."
        );
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === editLead._id
            ? response.data.data
            : lead
        )
      );

      setEditLead(null);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Lead updated successfully.",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          error.message,
      });
    }
  };

  // ======================================================
  // DELETE SINGLE
  // ======================================================

  const confirmDelete = async () => {
    if (!deleteLead) return;

    try {
      const response = await API.delete(
        `/cold-leads/${deleteLead._id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Delete failed."
        );
      }

      setLeads((prev) =>
        prev.filter(
          (lead) => lead._id !== deleteLead._id
        )
      );

      setSelectedIds((prev) =>
        prev.filter(
          (id) => id !== deleteLead._id
        )
      );

      setDeleteLead(null);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Lead deleted successfully.",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error.message,
      });
    }
  };

  // ======================================================
  // BULK DELETE
  // ======================================================

  const confirmBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      const response = await API.delete(
        "/cold-leads/bulk",
        {
          data: {
            ids: selectedIds,
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Bulk delete failed."
        );
      }

      setLeads((prev) =>
        prev.filter(
          (lead) =>
            !selectedIds.includes(lead._id)
        )
      );

      setSelectedIds([]);
      setShowBulkDelete(false);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error.message,
      });
    }
  };

  // ======================================================
  // EXPORT CSV
  // ======================================================

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data",
        text: "There are no leads to export.",
      });

      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Address",
      "Message",
      "Date",
      "Status",
    ];

    const escapeCSV = (value) => {
      return `"${String(value ?? "").replace(
        /"/g,
        '""'
      )}"`;
    };

    const rows = filteredLeads.map((lead) => [
      escapeCSV(lead.name),
      escapeCSV(lead.email),
      escapeCSV(lead.phone),
      escapeCSV(lead.address),
      escapeCSV(lead.message),
      escapeCSV(formatDate(lead.createdAt)),
      escapeCSV(lead.status),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `cold-leads-${new Date()
      .toISOString()
      .split("T")[0]}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ======================================================
  // PAGE NUMBERS
  // ======================================================

  const getPageNumbers = () => {
    if (totalPages <= 6) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // ======================================================
  // ICON
  // ======================================================

  const Icon = ({ type, size = 20 }) => {
    const common = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    const icons = {
      mail: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      ),

      users: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),

      check: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </>
      ),

      clock: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      ),

      search: (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </>
      ),

      filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,

      refresh: (
        <>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </>
      ),

      download: (
        <>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 21h16" />
        </>
      ),

      eye: (
        <>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      ),

      edit: (
        <>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </>
      ),

      delete: (
        <>
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </>
      ),

      close: (
        <>
          <path d="M18 6 6 18M6 6l12 12" />
        </>
      ),

      arrowLeft: <path d="m15 18-6-6 6-6" />,

      arrowRight: <path d="m9 18 6-6-6-6" />,

      home: (
        <>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </>
      ),
    };

    return (
      <svg {...common}>
        {icons[type]}
      </svg>
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="ContactLead">
      {/* HEADER */}

      <div className="ContactLead__header">
        <div className="ContactLead__header-left">
          <div className="ContactLead__header-icon">
            <Icon type="mail" size={31} />
          </div>

          <div>
            <h1>Contact Leads</h1>
            <p>
              Manage and view all contact form inquiries
            </p>
          </div>
        </div>

        <div className="ContactLead__breadcrumb">
          <span>
            <Icon type="home" size={17} />
            Dashboard
          </span>

          <Icon type="arrowRight" size={16} />

          <strong>Contact Leads</strong>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="ContactLead__stats">
        <div className="ContactLead__stat-card">
          <div className="ContactLead__stat-icon ContactLead__stat-icon--blue">
            <Icon type="users" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Total Leads</span>
            <div className="ContactLead__stat-value-row">
              <strong>{totalLeads}</strong>
            </div>
            <p>All time inquiries</p>
          </div>
        </div>

        <div className="ContactLead__stat-card">
          <div className="ContactLead__stat-icon ContactLead__stat-icon--green">
            <Icon type="mail" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>New Leads</span>
            <div className="ContactLead__stat-value-row">
              <strong>{newLeads}</strong>
            </div>
            <p>Awaiting response</p>
          </div>
        </div>

        <div className="ContactLead__stat-card">
          <div className="ContactLead__stat-icon ContactLead__stat-icon--orange">
            <Icon type="check" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Replied</span>
            <div className="ContactLead__stat-value-row">
              <strong>{repliedLeads}</strong>
            </div>
            <p>Total responded</p>
          </div>
        </div>

        <div className="ContactLead__stat-card">
          <div className="ContactLead__stat-icon ContactLead__stat-icon--red">
            <Icon type="clock" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Pending</span>
            <div className="ContactLead__stat-value-row">
              <strong>{pendingLeads}</strong>
            </div>
            <p>Awaiting response</p>
          </div>
        </div>
      </div>

      {/* FILTER */}

      <div className="ContactLead__filter-card">
        <div className="ContactLead__filter-field ContactLead__search-field">
          <label>Search</label>

          <div className="ContactLead__input-wrapper">
            <Icon type="search" size={19} />

            <input
              type="text"
              placeholder="Search by name, email, phone or address..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search contact leads"
            />
            {search && (
              <button
                type="button"
                className="ContactLead__search-clear"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                title="Clear search"
                aria-label="Clear search"
              >
                <Icon type="close" size={15} />
              </button>
            )}
          </div>
        </div>

        <div className="ContactLead__filter-field">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Status</option>
            <option>New</option>
            <option>Pending</option>
            <option>Replied</option>
          </select>
        </div>

        <div className="ContactLead__filter-field">
          <label>From Date</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="ContactLead__filter-field">
          <label>To Date</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="ContactLead__filter-buttons">
          <button
            type="button"
            className="ContactLead__filter-button"
            onClick={() => setCurrentPage(1)}
          >
            <Icon type="filter" size={18} />
            Filter
          </button>

          <button
            type="button"
            className="ContactLead__reset-button"
            onClick={handleReset}
          >
            <Icon type="refresh" size={17} />
            Reset
          </button>
        </div>
      </div>

      {/* LIST */}

      <div className="ContactLead__list-card">
        <div className="ContactLead__list-header">
          <div className="ContactLead__list-title">
            <div className="ContactLead__list-title-icon">
              <Icon type="users" size={25} />
            </div>

            <div>
              <h2>Cold Leads List</h2>
              <span className="ContactLead__live-indicator">
                <span className="ContactLead__live-dot" />
                Live sync
              </span>
            </div>
          </div>

          <div className="ContactLead__list-actions">
            <button
              type="button"
              className="ContactLead__export-button"
              onClick={handleExportCSV}
            >
              <Icon type="download" size={18} />
              Export CSV
            </button>

            <button
              type="button"
              className="ContactLead__delete-selected-button"
              disabled={selectedIds.length === 0}
              onClick={() =>
                setShowBulkDelete(true)
              }
            >
              <Icon type="delete" size={18} />
              Delete Selected
            </button>

            <button
              type="button"
              className={`ContactLead__refresh-button ${
                refreshing ? "ContactLead__refresh-button--loading" : ""
              }`}
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh"
            >
              <Icon type="refresh" size={19} />
            </button>
          </div>
        </div>

        {/* TABLE */}

        <div className="ContactLead__table-wrapper">
          {loading ? (
            <div className="ContactLead__empty">
              <div className="ContactLead__empty-content">
                <div className="ContactLead__empty-icon">
                  <Icon type="refresh" size={30} />
                </div>

                <h3>Loading Leads...</h3>

                <p>
                  Fetching the latest cold leads.
                </p>
              </div>
            </div>
          ) : (
            <table className="ContactLead__table">
              <thead>
                <tr>
                  <th className="ContactLead__checkbox-column">
                    <label className="ContactLead__checkbox">
                      <input
                        type="checkbox"
                        checked={allCurrentSelected}
                        onChange={handleSelectAll}
                      />
                      <span />
                    </label>
                  </th>

                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.length > 0 ? (
                  currentLeads.map((lead, index) => (
                    <tr key={lead._id}>
                      <td>
                        <label className="ContactLead__checkbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              lead._id
                            )}
                            onChange={() =>
                              handleSelectSingle(
                                lead._id
                              )
                            }
                          />
                          <span />
                        </label>
                      </td>

                      <td>
                        {startIndex + index + 1}
                      </td>

                      <td>
                        <div className="ContactLead__name">
                          {lead.name}
                        </div>
                      </td>

                      <td>
                        <span className="ContactLead__email">
                          {lead.email}
                        </span>
                      </td>

                      <td>
                        <span className="ContactLead__phone">
                          {lead.phone}
                        </span>
                      </td>

                      <td>
                        <span className="ContactLead__city">
                          {lead.address}
                        </span>
                      </td>

                      <td>
                        <div
                          className="ContactLead__message"
                          title={
                            lead.message || "No message"
                          }
                        >
                          {lead.message || "—"}
                        </div>
                      </td>

                      <td>
                        <span className="ContactLead__date">
                          {formatDate(
                            lead.createdAt
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`ContactLead__status ContactLead__status--${String(lead.status || "New").toLowerCase()}`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      <td>
                        <div className="ContactLead__row-actions">
                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--view"
                            title="View"
                             aria-label={`View ${lead.name || "lead"}`}
                             onClick={() =>
                              handleView(lead)
                            }
                          >
                            <Icon
                              type="eye"
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--edit"
                            title="Edit"
                             aria-label={`Edit ${lead.name || "lead"}`}
                             onClick={() =>
                              openEdit(lead)
                            }
                          >
                            <Icon
                              type="edit"
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--delete"
                            title="Delete"
                             aria-label={`Delete ${lead.name || "lead"}`}
                             onClick={() =>
                              setDeleteLead(lead)
                            }
                          >
                            <Icon
                              type="delete"
                              size={17}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="ContactLead__empty"
                    >
                      <div className="ContactLead__empty-content">
                        <div className="ContactLead__empty-icon">
                          <Icon
                            type="mail"
                            size={30}
                          />
                        </div>

                        <h3>
                          No contact leads found
                        </h3>

                        <p>
                          Submit a form or change your
                          filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}

        {!loading && (
          <div className="ContactLead__pagination-wrapper">
            <div className="ContactLead__pagination-info">
              Showing{" "}
              <strong>
                {filteredLeads.length === 0
                  ? 0
                  : startIndex + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredLeads.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredLeads.length}
              </strong>{" "}
              entries
            </div>

            {totalPages > 1 && (
              <div className="ContactLead__pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  className="ContactLead__page-button ContactLead__page-button--arrow"
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev - 1
                    )
                  }
                >
                  <Icon
                    type="arrowLeft"
                    size={17}
                  />
                </button>

                {getPageNumbers().map(
                  (page, index) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="ContactLead__pagination-dots"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={page}
                        className={`ContactLead__page-button ${
                          currentPage === page
                            ? "ContactLead__page-button--active"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>
                    );
                  }
                )}

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  className="ContactLead__page-button ContactLead__page-button--arrow"
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev + 1
                    )
                  }
                >
                  <Icon
                    type="arrowRight"
                    size={17}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====================================================
          VIEW MODAL
      ==================================================== */}

      {viewLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setViewLead(null)}
        >
          <div
            className="ContactLead__view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setViewLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__modal-heading">
              <div className="ContactLead__modal-icon ContactLead__modal-icon--blue">
                <Icon type="eye" size={25} />
              </div>

              <div>
                <h3>Lead Details</h3>
                <p>
                  Complete contact inquiry
                  information
                </p>
              </div>
            </div>

            <div className="ContactLead__view-grid">
              <div className="ContactLead__view-item">
                <span>Name</span>
                <strong>
                  {viewLead.name}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Email</span>
                <strong>
                  {viewLead.email}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Phone</span>
                <strong>
                  {viewLead.phone}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Address</span>
                <strong>
                  {viewLead.address}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Date</span>
                <strong>
                  {formatDate(
                    viewLead.createdAt
                  )}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Status</span>

                <span
                  className={`ContactLead__status ContactLead__status--${String(viewLead.status || "New").toLowerCase()}`}
                >
                  {viewLead.status}
                </span>
              </div>
            </div>

            <div className="ContactLead__message-box">
              <span>Message</span>

              <p>
                {viewLead.message ||
                  "No message provided."}
              </p>
            </div>

            <div className="ContactLead__view-footer">
              <button
                type="button"
                className="ContactLead__modal-secondary"
                onClick={() =>
                  setViewLead(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="ContactLead__modal-primary"
                onClick={() => {
                  setViewLead(null);
                  openEdit(viewLead);
                }}
              >
                <Icon type="edit" size={17} />
                Edit Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          EDIT MODAL
      ==================================================== */}

      {editLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setEditLead(null)}
        >
          <div
            className="ContactLead__edit-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setEditLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__modal-heading">
              <div className="ContactLead__modal-icon ContactLead__modal-icon--green">
                <Icon type="edit" size={25} />
              </div>

              <div>
                <h3>Edit Contact Lead</h3>
                <p>
                  Update the lead information
                </p>
              </div>
            </div>

            <div className="ContactLead__edit-grid">
              <div className="ContactLead__edit-field">
                <label>Name</label>

                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    handleEditChange(
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="ContactLead__edit-field">
                <label>Email</label>

                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    handleEditChange(
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="ContactLead__edit-field">
                <label>Phone</label>

                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    handleEditChange(
                      "phone",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="ContactLead__edit-field">
                <label>Address</label>

                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) =>
                    handleEditChange(
                      "address",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="ContactLead__edit-field ContactLead__edit-field--full">
                <label>Status</label>

                <select
                  value={editForm.status}
                  onChange={(e) =>
                    handleEditChange(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option>New</option>
                  <option>Pending</option>
                  <option>Replied</option>
                </select>
              </div>

              <div className="ContactLead__edit-field ContactLead__edit-field--full">
                <label>Message</label>

                <textarea
                  rows="5"
                  value={editForm.message}
                  onChange={(e) =>
                    handleEditChange(
                      "message",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="ContactLead__view-footer">
              <button
                type="button"
                className="ContactLead__modal-secondary"
                onClick={() =>
                  setEditLead(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__modal-primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          DELETE MODAL
      ==================================================== */}

      {deleteLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setDeleteLead(null)}
        >
          <div
            className="ContactLead__delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setDeleteLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__delete-icon">
              <Icon type="delete" size={31} />
            </div>

            <h3>Delete Contact Lead?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteLead.name}</strong>'s
              contact inquiry?
            </p>

            <div className="ContactLead__delete-actions">
              <button
                type="button"
                className="ContactLead__cancel-delete"
                onClick={() =>
                  setDeleteLead(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__confirm-delete"
                onClick={confirmDelete}
              >
                <Icon
                  type="delete"
                  size={17}
                />
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          BULK DELETE
      ==================================================== */}

      {showBulkDelete && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() =>
            setShowBulkDelete(false)
          }
        >
          <div
            className="ContactLead__delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setShowBulkDelete(false)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__delete-icon">
              <Icon type="delete" size={31} />
            </div>

            <h3>Delete Selected Leads?</h3>

            <p>
              You have selected{" "}
              <strong>
                {selectedIds.length}
              </strong>{" "}
              contact leads.
            </p>

            <div className="ContactLead__delete-actions">
              <button
                type="button"
                className="ContactLead__cancel-delete"
                onClick={() =>
                  setShowBulkDelete(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__confirm-delete"
                onClick={confirmBulkDelete}
              >
                <Icon
                  type="delete"
                  size={17}
                />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactLead;