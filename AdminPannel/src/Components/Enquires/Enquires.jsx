import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Users,
  FileText,
  Clock3,
  MessageCircle,
  CheckCircle2,
  Hourglass,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  Eye,
  X,
  Phone,
  Mail,
  CalendarDays,
  Package,
  Check,
  ListChecks,
  UserRound,
  Minus,
} from "lucide-react";

import "./Enquires.css";

/* =========================================================
   PRODUCT / ENQUIRY TYPES
   (same options as the website enquiry popup)
========================================================= */

const PRODUCT_OPTIONS = [
  "Besan",
  "Sattu",
  "Sabudana",
  "Sooji & Daliya",
  "Rice Flour",
  "Corn Flour",
  "Dal & Pulses",
  "Wholesale / Bulk Order",
  "Dealership / Distributor",
  "General Enquiry",
];

/* =========================================================
   STATUS CONFIG
========================================================= */

const STATUS_LIST = ["New", "Pending", "In Progress", "Replied", "Closed"];

const STATUS_CLASS = {
  New: "Enquires-status-new",
  Pending: "Enquires-status-pending",
  "In Progress": "Enquires-status-progress",
  Replied: "Enquires-status-replied",
  Closed: "Enquires-status-closed",
};

/* =========================================================
   DUMMY DATA
========================================================= */

const INITIAL_ENQUIRIES = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    product: "Besan",
    message: "Need 500 kg chana besan monthly for my sweet shop. Please share best price.",
    status: "New",
    date: "2026-10-02",
  },
  {
    id: 2,
    name: "Maa Tara Traders",
    email: "",
    phone: "+91 91234 56789",
    product: "Dealership / Distributor",
    message: "Interested in becoming a distributor for Siliguri and Jalpaiguri area.",
    status: "Pending",
    date: "2026-10-01",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    phone: "+91 99887 66554",
    product: "Sattu",
    message: "Please send sample and wholesale rate for 200g and 500g packs.",
    status: "Replied",
    date: "2026-09-30",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    phone: "+91 90123 45678",
    product: "Sabudana",
    message: "Looking for sabudana for festival season, around 100 kg.",
    status: "Closed",
    date: "2026-09-29",
  },
  {
    id: 5,
    name: "Singh General Store",
    email: "singhstore@gmail.com",
    phone: "+91 93456 78123",
    product: "Wholesale / Bulk Order",
    message: "Need regular supply of sooji, besan and rice flour for my store.",
    status: "New",
    date: "2026-09-28",
  },
  {
    id: 6,
    name: "Neha Mohanty",
    email: "",
    phone: "+91 87654 32109",
    product: "Rice Flour",
    message: "Do you have 1 kg rice flour packs? Need delivery in Gangtok.",
    status: "In Progress",
    date: "2026-09-27",
  },
  {
    id: 7,
    name: "Rakesh Verma",
    email: "rakesh.verma@gmail.com",
    phone: "+91 88990 11223",
    product: "Sooji & Daliya",
    message: "Need quotation for sooji and daliya, 50 kg bags.",
    status: "Replied",
    date: "2026-09-26",
  },
  {
    id: 8,
    name: "Ananya Roy",
    email: "ananya.roy@gmail.com",
    phone: "+91 76543 21098",
    product: "Dal & Pulses",
    message: "Interested in moong and masoor dal for a restaurant.",
    status: "New",
    date: "2026-09-25",
  },
  {
    id: 9,
    name: "Sourav Bakery & Sweets",
    email: "sourav.sweets@gmail.com",
    phone: "+91 98712 34567",
    product: "Besan",
    message: "Monthly besan requirement for laddoo production. Please call.",
    status: "Pending",
    date: "2026-09-24",
  },
  {
    id: 10,
    name: "Pooja Nair",
    email: "",
    phone: "+91 92345 67890",
    product: "Corn Flour",
    message: "Need corn flour for a small food business. Please share price list.",
    status: "New",
    date: "2026-09-23",
  },
  {
    id: 11,
    name: "Manish Gupta",
    email: "manish.gupta@gmail.com",
    phone: "+91 95678 12345",
    product: "General Enquiry",
    message: "Please send your full product catalogue and trade margins.",
    status: "In Progress",
    date: "2026-09-22",
  },
  {
    id: 12,
    name: "Kavita Rout",
    email: "kavita.rout@gmail.com",
    phone: "+91 88991 23456",
    product: "Sattu",
    message: "Want to buy sattu for home use. How can I order online?",
    status: "Replied",
    date: "2026-09-21",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  product: "",
  status: "New",
  message: "",
};

const ITEMS_PER_PAGE = 6;

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// 9876543210 -> +91 98765 43210
const formatPhone = (digits) =>
  `+91 ${digits.slice(0, 5)} ${digits.slice(5, 10)}`;

/* =========================================================
   CHECKBOX (custom, supports "some selected" state)
========================================================= */

const CheckBox = ({ checked, indeterminate = false, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    aria-label={label}
    className={`Enquires-checkbox ${checked ? "is-checked" : ""} ${
      indeterminate ? "is-mixed" : ""
    }`}
    onClick={onChange}
  >
    {indeterminate ? (
      <Minus size={14} strokeWidth={3.2} />
    ) : checked ? (
      <Check size={14} strokeWidth={3.2} />
    ) : null}
  </button>
);

/* =========================================================
   COMPONENT
========================================================= */

const Enquires = () => {
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newEnquiry, setNewEnquiry] = useState(EMPTY_FORM);
  const [statusMenu, setStatusMenu] = useState(null);
  const [toast, setToast] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  const toastTimer = useRef(null);

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  /* ---------------------------------------------------------
     FILTER
  --------------------------------------------------------- */

  const filteredEnquiries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return enquiries.filter((item) => {
      const matchesSearch =
        !search ||
        [item.name, item.email, item.phone, item.product, item.message]
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  /* ---------------------------------------------------------
     PAGINATION
  --------------------------------------------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredEnquiries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    setStatusMenu(null);
  };

  /* ---------------------------------------------------------
     SELECTION
  --------------------------------------------------------- */

  const currentPageIds = currentItems.map((item) => item.id);

  const selectedOnPage = currentPageIds.filter((id) =>
    selectedIds.includes(id)
  ).length;

  const allCurrentSelected =
    currentPageIds.length > 0 && selectedOnPage === currentPageIds.length;

  const someCurrentSelected = selectedOnPage > 0 && !allCurrentSelected;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allCurrentSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const clearSelection = () => setSelectedIds([]);

  /* ---------------------------------------------------------
     STATS
  --------------------------------------------------------- */

  const countBy = (status) =>
    enquiries.filter((item) => item.status === status).length;

  const stats = [
    {
      label: "TOTAL ENQUIRIES",
      value: enquiries.length,
      text: "All customer requests",
      icon: Users,
      tone: "blue",
    },
    {
      label: "NEW",
      value: countBy("New"),
      text: "Needs attention",
      icon: FileText,
      tone: "purple",
    },
    {
      label: "PENDING",
      value: countBy("Pending"),
      text: "Waiting for action",
      icon: Hourglass,
      tone: "rose",
    },
    {
      label: "IN PROGRESS",
      value: countBy("In Progress"),
      text: "Currently processing",
      icon: Clock3,
      tone: "orange",
    },
    {
      label: "REPLIED",
      value: countBy("Replied"),
      text: "Customer contacted",
      icon: MessageCircle,
      tone: "green",
    },
    {
      label: "CLOSED",
      value: countBy("Closed"),
      text: "Completed enquiries",
      icon: CheckCircle2,
      tone: "gray",
    },
  ];

  /* ---------------------------------------------------------
     SEARCH / FILTER
  --------------------------------------------------------- */

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  /* ---------------------------------------------------------
     STATUS MENU (per row, opens next to the button)
  --------------------------------------------------------- */

  const openStatusMenu = (event, id) => {
    event.stopPropagation();

    if (statusMenu?.id === id) {
      setStatusMenu(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 212;
    const menuHeight = 290;

    const left = Math.min(
      Math.max(8, rect.right - menuWidth),
      window.innerWidth - menuWidth - 8
    );

    const openUp =
      window.innerHeight - rect.bottom < menuHeight && rect.top > menuHeight;

    setStatusMenu({
      id,
      left,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 8 }
        : { top: rect.bottom + 8 }),
    });
  };

  // close menu on outside click, scroll, resize, Escape
  useEffect(() => {
    if (!statusMenu) return undefined;

    const close = () => setStatusMenu(null);

    const handleMouseDown = (event) => {
      if (
        !event.target.closest(".Enquires-status-menu") &&
        !event.target.closest(".Enquires-status-trigger")
      ) {
        close();
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [statusMenu]);

  const changeStatus = (id, status) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );

    setViewEnquiry((prev) => (prev && prev.id === id ? { ...prev, status } : prev));

    setStatusMenu(null);

    showToast(`Status changed to ${status}`);
  };

  const menuEnquiry = statusMenu
    ? enquiries.find((item) => item.id === statusMenu.id)
    : null;

  /* ---------------------------------------------------------
     DELETE
  --------------------------------------------------------- */

  const confirmDelete = () => {
    if (!deleteId) return;

    setEnquiries((prev) => prev.filter((item) => item.id !== deleteId));

    setSelectedIds((prev) => prev.filter((id) => id !== deleteId));

    setDeleteId(null);

    if (currentItems.length === 1 && safeCurrentPage > 1) {
      setCurrentPage(safeCurrentPage - 1);
    }

    showToast("Enquiry deleted");
  };

  /* ---------------------------------------------------------
     BULK DELETE
  --------------------------------------------------------- */

  const confirmBulkDelete = () => {
    const count = selectedIds.length;

    setEnquiries((prev) => prev.filter((item) => !selectedIds.includes(item.id)));

    setSelectedIds([]);
    setShowBulkDelete(false);
    setCurrentPage(1);

    showToast(`${count} enquir${count === 1 ? "y" : "ies"} deleted`);
  };

  /* ---------------------------------------------------------
     EXPORT CSV
  --------------------------------------------------------- */

  const exportData = () => {
    // export selected rows if any, otherwise everything in the current filter
    const exportItems =
      selectedIds.length > 0
        ? enquiries.filter((item) => selectedIds.includes(item.id))
        : filteredEnquiries;

    if (!exportItems.length) {
      showToast("No enquiries available to export");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Product",
      "Requirement",
      "Status",
      "Date",
    ];

    const rows = exportItems.map((item) => [
      item.name,
      item.email,
      item.phone,
      item.product,
      item.message,
      item.status,
      item.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "foodigo-enquiries.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ---------------------------------------------------------
     NEW ENQUIRY
  --------------------------------------------------------- */

  const handleNewInput = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setNewEnquiry((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));

      return;
    }

    setNewEnquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEnquiry = (event) => {
    event.preventDefault();

    if (newEnquiry.phone.length !== 10) {
      showToast("Please enter a valid 10 digit mobile number");
      return;
    }

    const newItem = {
      id: enquiries.length ? Math.max(...enquiries.map((i) => i.id)) + 1 : 1,
      name: newEnquiry.name.trim(),
      email: newEnquiry.email.trim(),
      phone: formatPhone(newEnquiry.phone),
      product: newEnquiry.product,
      message: newEnquiry.message.trim(),
      status: newEnquiry.status,
      date: new Date().toISOString().split("T")[0],
    };

    setEnquiries((prev) => [newItem, ...prev]);
    setNewEnquiry(EMPTY_FORM);
    setShowNewModal(false);
    setCurrentPage(1);

    showToast("Enquiry created successfully");
  };

  /* ---------------------------------------------------------
     JSX
  --------------------------------------------------------- */

  return (
    <div className="Enquires-page">
      {/* STATISTICS */}

      <div className="Enquires-stats-grid">
        {stats.map(({ label, value, text, icon: Icon, tone }) => (
          <div className="Enquires-stat-card" key={label}>
            <div className={`Enquires-stat-icon Enquires-stat-icon-${tone}`}>
              <Icon size={22} />
            </div>

            <div className="Enquires-stat-content">
              <span className="Enquires-stat-label">{label}</span>
              <strong className="Enquires-stat-number">{value}</strong>
              <span className="Enquires-stat-description">{text}</span>
            </div>

            <span className="Enquires-stat-glow" />
          </div>
        ))}
      </div>

      {/* MAIN TABLE CARD */}

      <section className="Enquires-table-card">
        <div className="Enquires-table-header">
          <div className="Enquires-heading-left">
            <div className="Enquires-heading-icon">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="Enquires-section-title">Enquiries List</h2>

              <p className="Enquires-section-subtitle">
                View and manage all incoming product enquiries
              </p>
            </div>
          </div>

          <div className="Enquires-heading-actions">
            <button
              type="button"
              className="Enquires-export-button"
              onClick={exportData}
            >
              <Download size={17} />
              <span>Export</span>
            </button>

            <button
              type="button"
              className="Enquires-new-button"
              onClick={() => setShowNewModal(true)}
            >
              <Plus size={18} />
              <span>New Enquiry</span>
            </button>
          </div>
        </div>

        {/* FILTER BAR */}

        <div className="Enquires-filter-bar">
          <div className="Enquires-filter-left">
            <div className="Enquires-status-filter">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option>All Status</option>

                {STATUS_LIST.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <ChevronDown size={17} className="Enquires-select-arrow" />
            </div>

            <div className="Enquires-search">
              <Search size={19} />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search name, phone, product..."
              />

              {searchTerm && (
                <button
                  type="button"
                  className="Enquires-search-clear"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="Enquires-result-count">
            Showing <strong>{filteredEnquiries.length}</strong> results
          </div>
        </div>

        {/* BULK ACTION BAR */}

        {selectedIds.length > 0 && (
          <div className="Enquires-bulk-bar" role="region" aria-label="Selected enquiries">
            <div className="Enquires-bulk-info">
              <span className="Enquires-bulk-count">{selectedIds.length}</span>

              <span>
                {selectedIds.length === 1 ? "enquiry" : "enquiries"} selected
              </span>
            </div>

            <div className="Enquires-bulk-actions">
              <button
                type="button"
                className="Enquires-bulk-button"
                onClick={exportData}
              >
                <Download size={16} />
                <span>Export Selected</span>
              </button>

              <button
                type="button"
                className="Enquires-bulk-button Enquires-bulk-danger"
                onClick={() => setShowBulkDelete(true)}
              >
                <Trash2 size={16} />
                <span>Delete Selected</span>
              </button>

              <button
                type="button"
                className="Enquires-bulk-clear"
                onClick={clearSelection}
              >
                <X size={15} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}

        <div className="Enquires-table-wrapper">
          <table className="Enquires-table">
            <thead>
              <tr>
                <th className="Enquires-check-column">
                  <CheckBox
                    checked={allCurrentSelected}
                    indeterminate={someCurrentSelected}
                    onChange={toggleSelectAll}
                    label="Select all enquiries on this page"
                  />
                </th>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>PRODUCT</th>
                <th>REQUIREMENT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={selectedIds.includes(item.id) ? "Enquires-row-selected" : ""}
                  >
                    <td className="Enquires-check-column">
                      <CheckBox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        label={`Select ${item.name}`}
                      />
                    </td>

                    <td className="Enquires-number">{startIndex + index + 1}</td>

                    {/* NAME */}

                    <td>
                      <div className="Enquires-customer">
                        <div className="Enquires-customer-avatar">
                          {item.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{item.name}</strong>
                          <span>ENQ-{String(item.id).padStart(3, "0")}</span>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td>
                      {item.email ? (
                        <span className="Enquires-email">
                          <Mail size={15} />
                          {item.email}
                        </span>
                      ) : (
                        <span className="Enquires-muted">Not provided</span>
                      )}
                    </td>

                    {/* PHONE */}

                    <td>
                      <span className="Enquires-phone">
                        <Phone size={15} />
                        {item.phone}
                      </span>
                    </td>

                    {/* PRODUCT */}

                    <td>
                      <span className="Enquires-product">
                        <Package size={14} />
                        {item.product}
                      </span>
                    </td>

                    {/* REQUIREMENT */}

                    <td>
                      <span className="Enquires-requirement">
                        {item.message || "-"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span className={`Enquires-status ${STATUS_CLASS[item.status] || ""}`}>
                        <span className="Enquires-status-dot" />
                        {item.status}
                      </span>
                    </td>

                    {/* DATE */}

                    <td>
                      <span className="Enquires-created-date">
                        {formatDate(item.date)}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td>
                      <div className="Enquires-actions">
                        <button
                          type="button"
                          className={`Enquires-status-trigger ${
                            statusMenu?.id === item.id ? "is-open" : ""
                          }`}
                          onClick={(e) => openStatusMenu(e, item.id)}
                          aria-haspopup="menu"
                          aria-expanded={statusMenu?.id === item.id}
                          title="Change status"
                        >
                          <ListChecks size={16} />
                          <span>Status</span>
                          <ChevronDown size={14} />
                        </button>

                        <button
                          type="button"
                          className="Enquires-view-button"
                          title="View enquiry"
                          aria-label="View enquiry"
                          onClick={() => setViewEnquiry(item)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className="Enquires-delete-button"
                          title="Delete enquiry"
                          aria-label="Delete enquiry"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="Enquires-empty-cell">
                    <div className="Enquires-empty">
                      <div className="Enquires-empty-icon">
                        <FileText size={30} />
                      </div>

                      <h3>No enquiries found</h3>
                      <p>Try changing your search or filter criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}

        <div className="Enquires-table-footer">
          <div className="Enquires-showing">
            Showing{" "}
            <strong>{filteredEnquiries.length === 0 ? 0 : startIndex + 1}</strong>{" "}
            to{" "}
            <strong>
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredEnquiries.length)}
            </strong>{" "}
            of <strong>{filteredEnquiries.length}</strong> entries
          </div>

          <div className="Enquires-pagination">
            <button
              type="button"
              className="Enquires-pagination-button"
              disabled={safeCurrentPage === 1}
              onClick={() => changePage(safeCurrentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {pageNumbers.map((page) => (
              <button
                type="button"
                key={page}
                className={`Enquires-pagination-number ${
                  safeCurrentPage === page ? "Enquires-pagination-active" : ""
                }`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="Enquires-pagination-button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => changePage(safeCurrentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* STATUS MENU (fixed, so the table never clips it) */}

      {statusMenu && menuEnquiry && (
        <div
          className="Enquires-status-menu"
          role="menu"
          style={{
            left: statusMenu.left,
            top: statusMenu.top,
            bottom: statusMenu.bottom,
          }}
        >
          <div className="Enquires-status-menu-title">Change status</div>

          {STATUS_LIST.map((status) => {
            const active = menuEnquiry.status === status;

            return (
              <button
                type="button"
                role="menuitem"
                key={status}
                className={`Enquires-status-option ${active ? "is-active" : ""}`}
                onClick={() => changeStatus(menuEnquiry.id, status)}
              >
                <span
                  className={`Enquires-status-option-dot ${STATUS_CLASS[status]}`}
                />

                <span className="Enquires-status-option-label">{status}</span>

                {active && <Check size={16} />}
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW MODAL */}

      {viewEnquiry && (
        <div
          className="Enquires-modal-overlay"
          onMouseDown={() => setViewEnquiry(null)}
        >
          <div
            className="Enquires-view-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="Enquires-modal-header">
              <div>
                <span className="Enquires-modal-eyebrow">
                  ENQ-{String(viewEnquiry.id).padStart(3, "0")} · PRODUCT ENQUIRY
                </span>

                <h2>{viewEnquiry.name}</h2>
              </div>

              <button
                type="button"
                className="Enquires-modal-close"
                onClick={() => setViewEnquiry(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="Enquires-modal-body">
              <div className="Enquires-detail-grid">
                <div className="Enquires-detail-item">
                  <UserRound size={19} />
                  <div>
                    <span>Name / Firm</span>
                    <strong>{viewEnquiry.name}</strong>
                  </div>
                </div>

                <div className="Enquires-detail-item">
                  <Phone size={19} />
                  <div>
                    <span>Mobile</span>
                    <strong>{viewEnquiry.phone}</strong>
                  </div>
                </div>

                <div className="Enquires-detail-item">
                  <Mail size={19} />
                  <div>
                    <span>Email</span>
                    <strong>{viewEnquiry.email || "Not provided"}</strong>
                  </div>
                </div>

                <div className="Enquires-detail-item">
                  <Package size={19} />
                  <div>
                    <span>Product / Enquiry Type</span>
                    <strong>{viewEnquiry.product}</strong>
                  </div>
                </div>

                <div className="Enquires-detail-item">
                  <CalendarDays size={19} />
                  <div>
                    <span>Enquiry Date</span>
                    <strong>{formatDate(viewEnquiry.date)}</strong>
                  </div>
                </div>
              </div>

              <div className="Enquires-detail-message">
                <span>Specific Requirement</span>
                <p>{viewEnquiry.message || "No requirement mentioned."}</p>
              </div>
            </div>

            <div className="Enquires-modal-footer">
              <span
                className={`Enquires-status ${STATUS_CLASS[viewEnquiry.status] || ""}`}
              >
                <span className="Enquires-status-dot" />
                {viewEnquiry.status}
              </span>

              <button
                type="button"
                className="Enquires-modal-done"
                onClick={() => setViewEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteId && (
        <div
          className="Enquires-modal-overlay"
          onMouseDown={() => setDeleteId(null)}
        >
          <div
            className="Enquires-delete-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="Enquires-delete-icon">
              <Trash2 size={25} />
            </div>

            <h2>Delete Enquiry?</h2>

            <p>
              Are you sure you want to delete this enquiry? This action cannot
              be undone.
            </p>

            <div className="Enquires-delete-actions">
              <button
                type="button"
                className="Enquires-cancel-button"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Enquires-confirm-delete"
                onClick={confirmDelete}
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK DELETE MODAL */}

      {showBulkDelete && (
        <div
          className="Enquires-modal-overlay"
          onMouseDown={() => setShowBulkDelete(false)}
        >
          <div
            className="Enquires-delete-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="Enquires-delete-icon">
              <Trash2 size={25} />
            </div>

            <h2>
              Delete {selectedIds.length} Enquir
              {selectedIds.length === 1 ? "y" : "ies"}?
            </h2>

            <p>
              The selected enquiries will be permanently deleted. This action
              cannot be undone.
            </p>

            <div className="Enquires-delete-actions">
              <button
                type="button"
                className="Enquires-cancel-button"
                onClick={() => setShowBulkDelete(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Enquires-confirm-delete"
                onClick={confirmBulkDelete}
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW ENQUIRY MODAL */}

      {showNewModal && (
        <div
          className="Enquires-modal-overlay"
          onMouseDown={() => setShowNewModal(false)}
        >
          <div
            className="Enquires-new-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="Enquires-modal-header">
              <div>
                <span className="Enquires-modal-eyebrow">
                  QUICK PRODUCT ENQUIRY
                </span>

                <h2>New Enquiry</h2>
              </div>

              <button
                type="button"
                className="Enquires-modal-close"
                onClick={() => setShowNewModal(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form className="Enquires-new-form" onSubmit={handleAddEnquiry}>
              <div className="Enquires-form-grid">
                <div className="Enquires-form-group">
                  <label>Full Name / Firm Name</label>

                  <input
                    name="name"
                    value={newEnquiry.name}
                    onChange={handleNewInput}
                    placeholder="Enter name or business name"
                    required
                  />
                </div>

                <div className="Enquires-form-group">
                  <label>Mobile Number</label>

                  <div className="Enquires-phone-input">
                    <span>+91</span>

                    <input
                      name="phone"
                      value={newEnquiry.phone}
                      onChange={handleNewInput}
                      placeholder="10 digit mobile number"
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>

                <div className="Enquires-form-group">
                  <label>Email Address (Optional)</label>

                  <input
                    type="email"
                    name="email"
                    value={newEnquiry.email}
                    onChange={handleNewInput}
                    placeholder="e.g. name@example.com"
                  />
                </div>

                <div className="Enquires-form-group">
                  <label>Product Category / Enquiry Type</label>

                  <select
                    name="product"
                    value={newEnquiry.product}
                    onChange={handleNewInput}
                    required
                  >
                    <option value="">Select your interest</option>

                    {PRODUCT_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="Enquires-form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={newEnquiry.status}
                    onChange={handleNewInput}
                  >
                    {STATUS_LIST.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="Enquires-form-group Enquires-message-group">
                <label>Specific Requirement (Optional)</label>

                <textarea
                  name="message"
                  rows="4"
                  value={newEnquiry.message}
                  onChange={handleNewInput}
                  placeholder="Quantity, location, or remarks"
                />
              </div>

              <div className="Enquires-form-actions">
                <button
                  type="button"
                  className="Enquires-cancel-button"
                  onClick={() => setShowNewModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="Enquires-submit-button">
                  <Check size={18} />
                  Create Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="Enquires-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default Enquires;