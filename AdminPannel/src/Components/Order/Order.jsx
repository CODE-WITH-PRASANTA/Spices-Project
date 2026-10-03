
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import API, { IMG_URL } from "../../api/axios";
import "./Order.css";

/* =========================================================
   CONSTANTS
========================================================= */

const ITEMS_PER_PAGE = 6;

const ORDER_STATUSES = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded",
];

const PAYMENT_METHODS = [
  "upi",
  "cash",
  "card",
];

/* =========================================================
   HELPERS
========================================================= */

const getImageUrl = (image) => {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const cleanImage = image.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (value) => {
  return Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const getPaymentLabel = (method) => {
  switch (method) {
    case "upi":
      return "UPI";

    case "cash":
      return "Cash on Delivery";

    case "card":
      return "Card";

    default:
      return method || "-";
  }
};

const getPaymentStatusLabel = (status) => {
  if (!status) return "-";

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "Order__status--delivered";

    case "Preparing":
      return "Order__status--preparing";

    case "Out for Delivery":
      return "Order__status--out-for-delivery";

    case "Cancelled":
      return "Order__status--cancelled";

    default:
      return "Order__status--pending";
  }
};

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);

  if (!parts.length) return "?";

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

/* =========================================================
   COMPONENT
========================================================= */

const Order = () => {
  /* =======================================================
     DATA
  ======================================================= */

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  /* =======================================================
     FILTERS
  ======================================================= */

  const [search, setSearch] = useState("");

  const [orderStatus, setOrderStatus] =
    useState("All Status");

  const [paymentStatus, setPaymentStatus] =
    useState("All Payments");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  /* =======================================================
     CALENDAR
  ======================================================= */

  const [calendarType, setCalendarType] =
    useState(null);

  const [calendarMonth, setCalendarMonth] =
    useState(new Date().getMonth());

  const [calendarYear, setCalendarYear] =
    useState(new Date().getFullYear());

  /* =======================================================
     SELECTION
  ======================================================= */

  const [selectedOrders, setSelectedOrders] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* =======================================================
     MODALS
  ======================================================= */

  const [viewOrder, setViewOrder] =
    useState(null);

  const [editOrder, setEditOrder] =
    useState(null);

  const [deleteOrder, setDeleteOrder] =
    useState(null);

  const [bulkDelete, setBulkDelete] =
    useState(false);

  /* =======================================================
     LOADING STATES
  ======================================================= */

  const [editLoading, setEditLoading] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  /* =======================================================
     EDIT FORM
  ======================================================= */

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "upi",
    paymentStatus: "pending",
    orderStatus: "Pending",
  });

  /* =========================================================
     FETCH ORDERS
  ========================================================= */

  const fetchOrders = async (
    showInitialLoader = false
  ) => {
    try {
      if (showInitialLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await API.get("/orders");

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to fetch orders."
        );
      }

      const fetchedOrders =
        Array.isArray(response.data.data)
          ? response.data.data
          : [];

      setOrders(fetchedOrders);

      setSelectedOrders([]);
    } catch (error) {
      console.error(
        "FETCH ORDERS ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Unable to Load Orders",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Please check your backend server.",
        confirmButtonColor: "#ff6b00",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders(true);
  }, []);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.orderStatus === "Delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Pending" ||
      order.orderStatus === "Preparing"
  ).length;

  const cancelledOrders = orders.filter(
    (order) =>
      order.orderStatus === "Cancelled"
  ).length;

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return orders.filter((order) => {
      const customerName =
        order.customer?.name || "";

      const customerPhone =
        order.customer?.phone || "";

      const customerAddress =
        order.customer?.address || "";

      const orderNumber =
        order.orderNumber || "";

      const items = Array.isArray(order.items)
        ? order.items
        : [];

      const itemMatch = items.some((item) =>
        String(item.name || "")
          .toLowerCase()
          .includes(searchValue)
      );

      const matchesSearch =
        !searchValue ||
        orderNumber
          .toLowerCase()
          .includes(searchValue) ||
        customerName
          .toLowerCase()
          .includes(searchValue) ||
        customerPhone
          .toLowerCase()
          .includes(searchValue) ||
        customerAddress
          .toLowerCase()
          .includes(searchValue) ||
        itemMatch;

      const matchesOrderStatus =
        orderStatus === "All Status" ||
        order.orderStatus === orderStatus;

      const matchesPayment =
        paymentStatus === "All Payments" ||
        order.paymentStatus === paymentStatus;

      const createdDate = order.createdAt
        ? new Date(order.createdAt)
        : null;

      const from = fromDate
        ? new Date(`${fromDate}T00:00:00`)
        : null;

      const to = toDate
        ? new Date(`${toDate}T23:59:59`)
        : null;

      const matchesFrom =
        !from ||
        (createdDate && createdDate >= from);

      const matchesTo =
        !to ||
        (createdDate && createdDate <= to);

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPayment &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    orders,
    search,
    orderStatus,
    paymentStatus,
    fromDate,
    toDate,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length /
        ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentOrders =
    filteredOrders.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =========================================================
     SELECT ALL
  ========================================================= */

  const currentOrderIds =
    currentOrders.map(
      (order) => order._id
    );

  const allSelected =
    currentOrderIds.length > 0 &&
    currentOrderIds.every((id) =>
      selectedOrders.includes(id)
    );

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders((previous) =>
        previous.filter(
          (id) =>
            !currentOrderIds.includes(id)
        )
      );

      return;
    }

    setSelectedOrders((previous) => [
      ...new Set([
        ...previous,
        ...currentOrderIds,
      ]),
    ]);
  };

  /* =========================================================
     SELECT SINGLE
  ========================================================= */

  const handleSelectOrder = (id) => {
    setSelectedOrders((previous) =>
      previous.includes(id)
        ? previous.filter(
            (item) => item !== id
          )
        : [...previous, id]
    );
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSearch("");
    setOrderStatus("All Status");
    setPaymentStatus("All Payments");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    setCurrentPage(1);
    setCalendarType(null);

    fetchOrders(false);
  };

  /* =========================================================
     VIEW
  ========================================================= */

  const openView = async (order) => {
    try {
      const response = await API.get(
        `/orders/${order._id}`
      );

      if (response.data?.success) {
        setViewOrder(response.data.data);
      } else {
        setViewOrder(order);
      }
    } catch (error) {
      console.error(
        "VIEW ORDER ERROR:",
        error
      );

      setViewOrder(order);
    }
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const openEdit = (order) => {
    setEditOrder(order);

    setEditForm({
      name:
        order.customer?.name || "",

      phone:
        order.customer?.phone || "",

      address:
        order.customer?.address || "",

      paymentMethod:
        order.paymentMethod || "upi",

      paymentStatus:
        order.paymentStatus || "pending",

      orderStatus:
        order.orderStatus || "Pending",
    });
  };

  const handleEditChange = (
    field,
    value
  ) => {
    setEditForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =========================================================
     SAVE EDIT TO BACKEND
  ========================================================= */

  const saveEdit = async () => {
    if (!editOrder) return;

    const name =
      editForm.name.trim();

    const phone =
      editForm.phone.trim();

    const address =
      editForm.address.trim();

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text:
          "Customer name is required.",
        confirmButtonColor: "#ff6b00",
      });

      return;
    }

    if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text:
          "Enter a valid 10-digit Indian mobile number.",
        confirmButtonColor: "#ff6b00",
      });

      return;
    }

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text:
          "Delivery address is required.",
        confirmButtonColor: "#ff6b00",
      });

      return;
    }

    try {
      setEditLoading(true);

      const response = await API.put(
        `/orders/${editOrder._id}`,
        {
          customer: {
            name,
            phone,
            address,
          },

          paymentMethod:
            editForm.paymentMethod,

          paymentStatus:
            editForm.paymentStatus,

          orderStatus:
            editForm.orderStatus,
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to update order."
        );
      }

      const updatedOrder =
        response.data.data;

      setOrders((previous) =>
        previous.map((order) =>
          order._id === updatedOrder._id
            ? updatedOrder
            : order
        )
      );

      setEditOrder(null);

      Swal.fire({
        icon: "success",
        title: "Order Updated",
        text:
          "Order information has been updated successfully.",
        timer: 1700,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "UPDATE ORDER ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to update order.",
        confirmButtonColor: "#ff6b00",
      });
    } finally {
      setEditLoading(false);
    }
  };

  /* =========================================================
     DELETE SINGLE
  ========================================================= */

  const confirmDelete = async () => {
    if (!deleteOrder) return;

    try {
      setDeleteLoading(true);

      const response = await API.delete(
        `/orders/${deleteOrder._id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to delete order."
        );
      }

      setOrders((previous) =>
        previous.filter(
          (order) =>
            order._id !==
            deleteOrder._id
        )
      );

      setSelectedOrders((previous) =>
        previous.filter(
          (id) =>
            id !== deleteOrder._id
        )
      );

      setDeleteOrder(null);

      Swal.fire({
        icon: "success",
        title: "Order Deleted",
        text:
          "The order has been removed from the database.",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "DELETE ORDER ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to delete order.",
        confirmButtonColor: "#ff6b00",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  /* =========================================================
     BULK DELETE
  ========================================================= */

  const confirmBulkDelete = async () => {
    if (!selectedOrders.length) return;

    try {
      setDeleteLoading(true);

      const response = await API.delete(
        "/orders/bulk-delete",
        {
          data: {
            ids: selectedOrders,
          },
        }
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to delete selected orders."
        );
      }

      const selectedSet =
        new Set(selectedOrders);

      setOrders((previous) =>
        previous.filter(
          (order) =>
            !selectedSet.has(
              order._id
            )
        )
      );

      setSelectedOrders([]);
      setBulkDelete(false);

      Swal.fire({
        icon: "success",
        title: "Orders Deleted",
        text:
          response.data.message ||
          "Selected orders deleted successfully.",
        timer: 1700,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "BULK DELETE ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to delete selected orders.",
        confirmButtonColor: "#ff6b00",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  /* =========================================================
     CSV EXPORT
  ========================================================= */

  const exportCSV = () => {
    if (!filteredOrders.length) {
      Swal.fire({
        icon: "info",
        title: "No Orders",
        text:
          "There are no orders available to export.",
        confirmButtonColor: "#ff6b00",
      });

      return;
    }

    const headers = [
      "Order ID",
      "Customer Name",
      "Phone",
      "Address",
      "Items",
      "Subtotal",
      "Discount",
      "Shipping",
      "Total",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Date",
      "Time",
    ];

    const rows = filteredOrders.map(
      (order) => {
        const items = Array.isArray(
          order.items
        )
          ? order.items
          : [];

        const itemText = items
          .map(
            (item) =>
              `${item.name} x${item.quantity}`
          )
          .join(" | ");

        return [
          order.orderNumber || "",
          order.customer?.name || "",
          order.customer?.phone || "",
          order.customer?.address || "",
          itemText,
          order.subtotal || 0,
          order.discount || 0,
          order.shippingFee || 0,
          order.totalAmount || 0,
          getPaymentLabel(
            order.paymentMethod
          ),
          getPaymentStatusLabel(
            order.paymentStatus
          ),
          order.orderStatus || "",
          formatDate(
            order.createdAt
          ),
          formatTime(
            order.createdAt
          ),
        ];
      }
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(
                value ?? ""
              ).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `healthy-heaven-orders-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const getPages = () => {
    if (totalPages <= 6) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [
        1,
        2,
        3,
        4,
        "...",
        totalPages,
      ];
    }

    if (
      currentPage >=
      totalPages - 2
    ) {
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

  /* =========================================================
     CALENDAR
  ========================================================= */

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCalendarDays = () => {
    const firstDay = new Date(
      calendarYear,
      calendarMonth,
      1
    ).getDay();

    const daysInMonth =
      new Date(
        calendarYear,
        calendarMonth + 1,
        0
      ).getDate();

    const previousDays =
      new Date(
        calendarYear,
        calendarMonth,
        0
      ).getDate();

    const days = [];

    for (
      let i = firstDay - 1;
      i >= 0;
      i--
    ) {
      days.push({
        day: previousDays - i,
        outside: true,
      });
    }

    for (
      let i = 1;
      i <= daysInMonth;
      i++
    ) {
      days.push({
        day: i,
        outside: false,
      });
    }

    while (days.length < 42) {
      days.push({
        day:
          days.length -
          daysInMonth -
          firstDay +
          1,
        outside: true,
      });
    }

    return days;
  };

  const changeMonth = (
    direction
  ) => {
    if (direction === "prev") {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(
          (year) => year - 1
        );
      } else {
        setCalendarMonth(
          (month) => month - 1
        );
      }
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear(
          (year) => year + 1
        );
      } else {
        setCalendarMonth(
          (month) => month + 1
        );
      }
    }
  };

  const openCalendar = (
    type
  ) => {
    setCalendarType(
      calendarType === type
        ? null
        : type
    );

    const selected =
      type === "from"
        ? fromDate
        : toDate;

    if (selected) {
      const date = new Date(
        `${selected}T00:00:00`
      );

      setCalendarMonth(
        date.getMonth()
      );

      setCalendarYear(
        date.getFullYear()
      );
    }
  };

  const selectDate = (
    day,
    outside
  ) => {
    if (outside) return;

    const month = String(
      calendarMonth + 1
    ).padStart(2, "0");

    const selectedDay =
      String(day).padStart(
        2,
        "0"
      );

    const selectedDate = `${calendarYear}-${month}-${selectedDay}`;

    if (
      calendarType === "from"
    ) {
      setFromDate(selectedDate);
    }

    if (
      calendarType === "to"
    ) {
      setToDate(selectedDate);
    }

    setCalendarType(null);
    setCurrentPage(1);
  };

  const isSelectedDate = (
    day
  ) => {
    const month = String(
      calendarMonth + 1
    ).padStart(2, "0");

    const selectedDay =
      String(day).padStart(
        2,
        "0"
      );

    const value = `${calendarYear}-${month}-${selectedDay}`;

    return (
      value === fromDate ||
      value === toDate
    );
  };

  /* =========================================================
     ICONS
  ========================================================= */

  const Icon = ({
    name,
    size = 20,
  }) => {
    const props = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    if (name === "bag") {
      return (
        <svg {...props}>
          <path d="M6 8h12l1 13H5L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    }

    if (name === "check") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    }

    if (name === "clock") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    }

    if (name === "closeCircle") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 6 6M15 9l-6 6" />
        </svg>
      );
    }

    if (name === "search") {
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    }

    if (name === "calendar") {
      return (
        <svg {...props}>
          <rect
            x="3"
            y="4"
            width="18"
            height="17"
            rx="2"
          />
          <path d="M8 2v4M16 2v4M3 9h18" />
        </svg>
      );
    }

    if (name === "filter") {
      return (
        <svg {...props}>
          <path d="M4 5h16l-6 7v6l-4 2v-8z" />
        </svg>
      );
    }

    if (name === "refresh") {
      return (
        <svg {...props}>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </svg>
      );
    }

    if (name === "download") {
      return (
        <svg {...props}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 21h16" />
        </svg>
      );
    }

    if (name === "eye") {
      return (
        <svg {...props}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    }

    if (name === "edit") {
      return (
        <svg {...props}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>
      );
    }

    if (name === "trash") {
      return (
        <svg {...props}>
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </svg>
      );
    }

    if (name === "arrowLeft") {
      return (
        <svg {...props}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    }

    if (name === "arrowRight") {
      return (
        <svg {...props}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    }

    if (name === "close") {
      return (
        <svg {...props}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    }

    return null;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="Order">
        <div className="Order__loading">
          <div className="Order__loadingSpinner" />
          <strong>
            Loading orders...
          </strong>
          <span>
            Connecting to Healthy Heaven database
          </span>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="Order">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="Order__pageHeader">

        <div>
          <span className="Order__pageEyebrow">
            HEALTHY HEAVEN
          </span>

          <h1 className="Order__pageTitle">
            Order Management
          </h1>

          <p className="Order__pageSubtitle">
            Manage customer orders,
            customer information,
            payments and delivery.
          </p>
        </div>

        <div className="Order__pageHeaderActions">

          <button
            type="button"
            className="Order__topRefresh"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <Icon
              name="refresh"
              size={16}
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

          <button
            type="button"
            className="Order__topExport"
            onClick={exportCSV}
          >
            <Icon
              name="download"
              size={16}
            />

            Export Orders
          </button>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="Order__stats">

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--orange">
            <Icon
              name="bag"
              size={25}
            />
          </div>

          <div className="Order__statContent">

            <span>
              Total Orders
            </span>

            <div className="Order__statValue">
              <strong>
                {totalOrders}
              </strong>
            </div>

            <p>
              All database orders
            </p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--green">
            <Icon
              name="check"
              size={25}
            />
          </div>

          <div className="Order__statContent">

            <span>
              Delivered
            </span>

            <div className="Order__statValue">
              <strong>
                {deliveredOrders}
              </strong>
            </div>

            <p>
              Successfully completed
            </p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--yellow">
            <Icon
              name="clock"
              size={25}
            />
          </div>

          <div className="Order__statContent">

            <span>
              Active Orders
            </span>

            <div className="Order__statValue">
              <strong>
                {pendingOrders}
              </strong>
            </div>

            <p>
              Pending & preparing
            </p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--red">
            <Icon
              name="closeCircle"
              size={25}
            />
          </div>

          <div className="Order__statContent">

            <span>
              Cancelled
            </span>

            <div className="Order__statValue">
              <strong>
                {cancelledOrders}
              </strong>
            </div>

            <p>
              Cancelled orders
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="Order__filterCard">

        <div className="Order__filterField">

          <label>
            Search Orders
          </label>

          <div className="Order__inputBox">

            <Icon
              name="search"
              size={17}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
              placeholder="Order ID, customer, phone or product..."
            />

          </div>

        </div>

        <div className="Order__filterField">

          <label>
            Order Status
          </label>

          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(
                e.target.value
              );

              setCurrentPage(1);
            }}
          >
            <option>
              All Status
            </option>

            {ORDER_STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            )}
          </select>

        </div>

        <div className="Order__filterField">

          <label>
            Payment
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(
                e.target.value
              );

              setCurrentPage(1);
            }}
          >
            <option>
              All Payments
            </option>

            {PAYMENT_STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {getPaymentStatusLabel(
                    status
                  )}
                </option>
              )
            )}
          </select>

        </div>

        <div className="Order__filterField">

          <label>
            From Date
          </label>

          <button
            type="button"
            className="Order__dateButton"
            onClick={() =>
              openCalendar("from")
            }
          >
            <span>
              {fromDate
                ? formatDate(
                    fromDate
                  )
                : "Select date"}
            </span>

            <Icon
              name="calendar"
              size={16}
            />
          </button>

          {calendarType ===
            "from" && (
            <div className="Order__calendar">

              <div className="Order__calendarHeader">

                <button
                  type="button"
                  onClick={() =>
                    changeMonth(
                      "prev"
                    )
                  }
                >
                  <Icon
                    name="arrowLeft"
                    size={15}
                  />
                </button>

                <strong>
                  {
                    monthNames[
                      calendarMonth
                    ]
                  }{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeMonth(
                      "next"
                    )
                  }
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </button>

              </div>

              <div className="Order__calendarWeek">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map(
                  (day) => (
                    <span
                      key={day}
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              <div className="Order__calendarDays">

                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={
                        item.outside
                      }
                      className={
                        !item.outside &&
                        isSelectedDate(
                          item.day
                        )
                          ? "Order__calendarSelected"
                          : ""
                      }
                      onClick={() =>
                        selectDate(
                          item.day,
                          item.outside
                        )
                      }
                    >
                      {item.day}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        <div className="Order__filterField">

          <label>
            To Date
          </label>

          <button
            type="button"
            className="Order__dateButton"
            onClick={() =>
              openCalendar("to")
            }
          >
            <span>
              {toDate
                ? formatDate(toDate)
                : "Select date"}
            </span>

            <Icon
              name="calendar"
              size={16}
            />
          </button>

          {calendarType ===
            "to" && (
            <div className="Order__calendar">

              <div className="Order__calendarHeader">

                <button
                  type="button"
                  onClick={() =>
                    changeMonth(
                      "prev"
                    )
                  }
                >
                  <Icon
                    name="arrowLeft"
                    size={15}
                  />
                </button>

                <strong>
                  {
                    monthNames[
                      calendarMonth
                    ]
                  }{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeMonth(
                      "next"
                    )
                  }
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </button>

              </div>

              <div className="Order__calendarWeek">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map(
                  (day) => (
                    <span
                      key={day}
                    >
                      {day}
                    </span>
                  )
                )}
              </div>

              <div className="Order__calendarDays">

                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={
                        item.outside
                      }
                      className={
                        !item.outside &&
                        isSelectedDate(
                          item.day
                        )
                          ? "Order__calendarSelected"
                          : ""
                      }
                      onClick={() =>
                        selectDate(
                          item.day,
                          item.outside
                        )
                      }
                    >
                      {item.day}
                    </button>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        <div className="Order__filterButtons">

          <button
            type="button"
            className="Order__resetButton"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </div>

      {/* =====================================================
          LIST CARD
      ===================================================== */}

      <div className="Order__listCard">

        <div className="Order__listHeader">

          <div className="Order__listTitle">

            <span className="Order__listIcon">
              <Icon
                name="bag"
                size={21}
              />
            </span>

            <div>
              <h2>
                Customer Orders
              </h2>

              <small className="Order__databaseStatus">
                ● Live database
              </small>
            </div>

          </div>

          <div className="Order__listActions">

            <button
              type="button"
              className="Order__refreshButton"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh orders"
            >
              <Icon
                name="refresh"
                size={16}
              />
            </button>

            <button
              type="button"
              className="Order__exportButton"
              onClick={exportCSV}
            >
              <Icon
                name="download"
                size={15}
              />
              Export
            </button>

            <button
              type="button"
              className="Order__deleteSelected"
              disabled={
                selectedOrders.length ===
                0
              }
              onClick={() =>
                setBulkDelete(true)
              }
            >
              <Icon
                name="trash"
                size={15}
              />

              Delete Selected
              {selectedOrders.length >
                0 &&
                ` (${selectedOrders.length})`}
            </button>

          </div>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="Order__tableWrapper">

          <table className="Order__table">

            <thead>

              <tr>

                <th className="Order__checkColumn">

                  <label className="Order__checkbox">

                    <input
                      type="checkbox"
                      checked={
                        allSelected
                      }
                      onChange={
                        handleSelectAll
                      }
                    />

                    <span />

                  </label>

                </th>

                <th>
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Items
                </th>

                <th>
                  Total
                </th>

                <th>
                  Payment
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentOrders.length ===
              0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="Order__empty"
                  >
                    <div className="Order__emptyContent">

                      <div>
                        <Icon
                          name="bag"
                          size={30}
                        />
                      </div>

                      <strong>
                        No orders found
                      </strong>

                      <span>
                        New checkout orders
                        will appear here
                        automatically.
                      </span>

                    </div>
                  </td>
                </tr>
              ) : (
                currentOrders.map(
                  (order) => {
                    const items =
                      Array.isArray(
                        order.items
                      )
                        ? order.items
                        : [];

                    return (
                      <tr
                        key={
                          order._id
                        }
                      >

                        <td className="Order__checkColumn">

                          <label className="Order__checkbox">

                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(
                                order._id
                              )}
                              onChange={() =>
                                handleSelectOrder(
                                  order._id
                                )
                              }
                            />

                            <span />

                          </label>

                        </td>

                        {/* ORDER ID */}

                        <td>

                          <div className="Order__orderCell">

                            <strong className="Order__orderId">
                              {
                                order.orderNumber
                              }
                            </strong>

                            <small>
                              #
                              {String(
                                order._id
                              ).slice(
                                -6
                              )}
                            </small>

                          </div>

                        </td>

                        {/* CUSTOMER */}

                        <td>

                          <div className="Order__customer">

                            <div className="Order__customerAvatar">
                              {getInitials(
                                order.customer
                                  ?.name
                              )}
                            </div>

                            <div>

                              <strong>
                                {
                                  order.customer
                                    ?.name ||
                                  "-"
                                }
                              </strong>

                              <span>
                                {
                                  order.customer
                                    ?.address ||
                                  "-"
                                }
                              </span>

                            </div>

                          </div>

                        </td>

                        {/* PHONE */}

                        <td>

                          <div className="Order__phoneCell">

                            <strong>
                              {
                                order.customer
                                  ?.phone ||
                                "-"
                              }
                            </strong>

                          </div>

                        </td>

                        {/* ITEMS */}

                        <td>

                          <div className="Order__items">

                            {items
                              .slice(0, 3)
                              .map(
                                (
                                  item,
                                  index
                                ) => (
                                  <div
                                    className="Order__itemPreview"
                                    key={
                                      item._id ||
                                      index
                                    }
                                    title={
                                      item.name
                                    }
                                  >

                                    {item.image ? (
                                      <img
                                        src={getImageUrl(
                                          item.image
                                        )}
                                        alt={
                                          item.name
                                        }
                                      />
                                    ) : (
                                      <div className="Order__itemPlaceholder">
                                        <Icon
                                          name="bag"
                                          size={14}
                                        />
                                      </div>
                                    )}

                                  </div>
                                )
                              )}

                            {items.length >
                              3 && (
                              <span className="Order__moreItems">
                                +
                                {items.length -
                                  3}
                              </span>
                            )}

                            <small className="Order__itemCount">
                              {items.reduce(
                                (
                                  total,
                                  item
                                ) =>
                                  total +
                                  Number(
                                    item.quantity ||
                                      0
                                  ),
                                0
                              )}{" "}
                              item
                              {items.reduce(
                                (
                                  total,
                                  item
                                ) =>
                                  total +
                                  Number(
                                    item.quantity ||
                                      0
                                  ),
                                0
                              ) !==
                              1
                                ? "s"
                                : ""}
                            </small>

                          </div>

                        </td>

                        {/* TOTAL */}

                        <td>

                          <strong className="Order__amount">
                            ₹
                            {formatMoney(
                              order.totalAmount
                            )}
                          </strong>

                        </td>

                        {/* PAYMENT */}

                        <td>

                          <div className="Order__paymentCell">

                            <span
                              className={`Order__payment ${
                                order.paymentMethod ===
                                "cash"
                                  ? "Order__payment--cod"
                                  : "Order__payment--paid"
                              }`}
                            >
                              {getPaymentLabel(
                                order.paymentMethod
                              )}
                            </span>

                            <small
                              className={`Order__paymentStatus Order__paymentStatus--${order.paymentStatus}`}
                            >
                              {getPaymentStatusLabel(
                                order.paymentStatus
                              )}
                            </small>

                          </div>

                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`Order__status ${getStatusClass(
                              order.orderStatus
                            )}`}
                          >
                            {
                              order.orderStatus
                            }
                          </span>

                        </td>

                        {/* DATE */}

                        <td>

                          <div className="Order__date">

                            <span>
                              {formatDate(
                                order.createdAt
                              )}
                            </span>

                            <small>
                              {formatTime(
                                order.createdAt
                              )}
                            </small>

                          </div>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="Order__rowActions">

                            <button
                              type="button"
                              className="Order__rowButton Order__viewButton"
                              title="View Order"
                              onClick={() =>
                                openView(
                                  order
                                )
                              }
                            >
                              <Icon
                                name="eye"
                                size={15}
                              />
                            </button>

                            <button
                              type="button"
                              className="Order__rowButton Order__editButton"
                              title="Edit Order"
                              onClick={() =>
                                openEdit(
                                  order
                                )
                              }
                            >
                              <Icon
                                name="edit"
                                size={15}
                              />
                            </button>

                            <button
                              type="button"
                              className="Order__rowButton Order__deleteButton"
                              title="Delete Order"
                              onClick={() =>
                                setDeleteOrder(
                                  order
                                )
                              }
                            >
                              <Icon
                                name="trash"
                                size={15}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="Order__paginationWrapper">

          <div className="Order__paginationInfo">

            Showing{" "}
            <strong>
              {filteredOrders.length ===
              0
                ? 0
                : startIndex + 1}
              -
              {Math.min(
                startIndex +
                  currentOrders.length,
                filteredOrders.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredOrders.length}
            </strong>{" "}
            orders

          </div>

          <div className="Order__pagination">

            <button
              type="button"
              className="Order__pageButton"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
            >
              <Icon
                name="arrowLeft"
                size={15}
              />
            </button>

            {getPages().map(
              (page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="Order__dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    className={`Order__pageButton ${
                      currentPage ===
                      page
                        ? "Order__pageActive"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                  >
                    {page}
                  </button>
                )
            )}

            <button
              type="button"
              className="Order__pageButton"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
            >
              <Icon
                name="arrowRight"
                size={15}
              />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          VIEW ORDER MODAL
      ===================================================== */}

      {viewOrder && (
        <div
          className="Order__modalOverlay"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              setViewOrder(null);
            }
          }}
        >

          <div
            className="Order__viewModal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              onClick={() =>
                setViewOrder(null)
              }
            >
              <Icon
                name="close"
                size={17}
              />
            </button>

            <div className="Order__modalHeader">

              <div className="Order__modalIcon Order__modalIcon--orange">
                <Icon
                  name="bag"
                  size={24}
                />
              </div>

              <div>

                <h3>
                  Order Details
                </h3>

                <p>
                  {
                    viewOrder.orderNumber
                  }
                </p>

              </div>

            </div>

            {/* CUSTOMER */}

            <div className="Order__viewSection">

              <div className="Order__viewSectionTitle">
                Customer Information
              </div>

              <div className="Order__viewGrid">

                <div className="Order__viewItem">
                  <span>
                    Full Name
                  </span>

                  <strong>
                    {
                      viewOrder.customer
                        ?.name ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="Order__viewItem">
                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {
                      viewOrder.customer
                        ?.phone ||
                      "-"
                    }
                  </strong>
                </div>

                <div className="Order__viewItem Order__viewItem--full">
                  <span>
                    Delivery Address
                  </span>

                  <strong>
                    {
                      viewOrder.customer
                        ?.address ||
                      "-"
                    }
                  </strong>
                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="Order__viewSection">

              <div className="Order__viewSectionTitle">
                Payment & Order Status
              </div>

              <div className="Order__viewGrid">

                <div className="Order__viewItem">
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {getPaymentLabel(
                      viewOrder.paymentMethod
                    )}
                  </strong>
                </div>

                <div className="Order__viewItem">
                  <span>
                    Payment Status
                  </span>

                  <strong
                    className={`Order__paymentStatus Order__paymentStatus--${viewOrder.paymentStatus}`}
                  >
                    {getPaymentStatusLabel(
                      viewOrder.paymentStatus
                    )}
                  </strong>
                </div>

                <div className="Order__viewItem">
                  <span>
                    Order Status
                  </span>

                  <span
                    className={`Order__status ${getStatusClass(
                      viewOrder.orderStatus
                    )}`}
                  >
                    {
                      viewOrder.orderStatus
                    }
                  </span>
                </div>

                <div className="Order__viewItem">
                  <span>
                    Order Date
                  </span>

                  <strong>
                    {formatDate(
                      viewOrder.createdAt
                    )}
                  </strong>
                </div>

              </div>

            </div>

            {/* ITEMS */}

            <div className="Order__viewSection">

              <div className="Order__viewSectionTitle">
                Ordered Products
              </div>

              <div className="Order__modalItems">

                {viewOrder.items?.map(
                  (item, index) => (
                    <div
                      className="Order__modalItem"
                      key={
                        item._id ||
                        index
                      }
                    >

                      {item.image ? (
                        <img
                          src={getImageUrl(
                            item.image
                          )}
                          alt={
                            item.name
                          }
                        />
                      ) : (
                        <div className="Order__modalItemPlaceholder">
                          <Icon
                            name="bag"
                            size={20}
                          />
                        </div>
                      )}

                      <div className="Order__modalItemInfo">

                        <strong>
                          {
                            item.name
                          }
                        </strong>

                        <span>
                          {item.category ||
                            "Healthy Heaven"}
                        </span>

                        <small>
                          ₹
                          {formatMoney(
                            item.price
                          )}{" "}
                          ×{" "}
                          {
                            item.quantity
                          }
                        </small>

                      </div>

                      <strong className="Order__modalItemTotal">
                        ₹
                        {formatMoney(
                          item.subtotal
                        )}
                      </strong>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* SUMMARY */}

            <div className="Order__viewSummary">

              <div>
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {formatMoney(
                    viewOrder.subtotal
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Discount
                </span>

                <strong className="Order__discountValue">
                  - ₹
                  {formatMoney(
                    viewOrder.discount
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Shipping
                </span>

                <strong>
                  {Number(
                    viewOrder.shippingFee ||
                      0
                  ) === 0
                    ? "Free"
                    : `₹${formatMoney(
                        viewOrder.shippingFee
                      )}`}
                </strong>
              </div>

              <div className="Order__viewSummaryTotal">
                <span>
                  Total Amount
                </span>

                <strong>
                  ₹
                  {formatMoney(
                    viewOrder.totalAmount
                  )}
                </strong>
              </div>

            </div>

            <div className="Order__modalFooter">

              <button
                type="button"
                className="Order__cancelModalButton"
                onClick={() =>
                  setViewOrder(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="Order__saveModalButton"
                onClick={() => {
                  setViewOrder(null);
                  openEdit(
                    viewOrder
                  );
                }}
              >
                <Icon
                  name="edit"
                  size={15}
                />

                Edit Order
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editOrder && (
        <div
          className="Order__modalOverlay"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              if (!editLoading) {
                setEditOrder(null);
              }
            }
          }}
        >

          <div
            className="Order__editModal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              disabled={
                editLoading
              }
              onClick={() =>
                setEditOrder(null)
              }
            >
              <Icon
                name="close"
                size={17}
              />
            </button>

            <div className="Order__modalHeader">

              <div className="Order__modalIcon Order__modalIcon--green">
                <Icon
                  name="edit"
                  size={23}
                />
              </div>

              <div>

                <h3>
                  Edit Order
                </h3>

                <p>
                  {
                    editOrder.orderNumber
                  }
                </p>

              </div>

            </div>

            <div className="Order__editGrid">

              <div className="Order__editField">

                <label>
                  Customer Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={
                    editForm.name
                  }
                  onChange={(e) =>
                    handleEditChange(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Customer name"
                />

              </div>

              <div className="Order__editField">

                <label>
                  Phone Number
                  <span>*</span>
                </label>

                <input
                  type="tel"
                  value={
                    editForm.phone
                  }
                  maxLength={10}
                  onChange={(e) =>
                    handleEditChange(
                      "phone",
                      e.target.value
                        .replace(
                          /\D/g,
                          ""
                        )
                        .slice(
                          0,
                          10
                        )
                    )
                  }
                  placeholder="10-digit mobile"
                />

              </div>

              <div className="Order__editField Order__editField--full">

                <label>
                  Delivery Address
                  <span>*</span>
                </label>

                <textarea
                  rows="3"
                  value={
                    editForm.address
                  }
                  onChange={(e) =>
                    handleEditChange(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Complete delivery address"
                />

              </div>

              <div className="Order__editField">

                <label>
                  Payment Method
                </label>

                <select
                  value={
                    editForm.paymentMethod
                  }
                  onChange={(e) =>
                    handleEditChange(
                      "paymentMethod",
                      e.target.value
                    )
                  }
                >
                  {PAYMENT_METHODS.map(
                    (method) => (
                      <option
                        key={
                          method
                        }
                        value={
                          method
                        }
                      >
                        {getPaymentLabel(
                          method
                        )}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div className="Order__editField">

                <label>
                  Payment Status
                </label>

                <select
                  value={
                    editForm.paymentStatus
                  }
                  onChange={(e) =>
                    handleEditChange(
                      "paymentStatus",
                      e.target.value
                    )
                  }
                >
                  {PAYMENT_STATUSES.map(
                    (status) => (
                      <option
                        key={
                          status
                        }
                        value={
                          status
                        }
                      >
                        {getPaymentStatusLabel(
                          status
                        )}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div className="Order__editField Order__editField--full">

                <label>
                  Order Status
                </label>

                <select
                  value={
                    editForm.orderStatus
                  }
                  onChange={(e) =>
                    handleEditChange(
                      "orderStatus",
                      e.target.value
                    )
                  }
                >
                  {ORDER_STATUSES.map(
                    (status) => (
                      <option
                        key={
                          status
                        }
                        value={
                          status
                        }
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            <div className="Order__modalFooter">

              <button
                type="button"
                className="Order__cancelModalButton"
                disabled={
                  editLoading
                }
                onClick={() =>
                  setEditOrder(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__saveModalButton"
                disabled={
                  editLoading
                }
                onClick={
                  saveEdit
                }
              >
                {editLoading ? (
                  <>
                    <span className="Order__buttonSpinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon
                      name="check"
                      size={15}
                    />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteOrder && (
        <div
          className="Order__modalOverlay"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              if (!deleteLoading) {
                setDeleteOrder(null);
              }
            }
          }}
        >

          <div
            className="Order__deleteModal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              disabled={
                deleteLoading
              }
              onClick={() =>
                setDeleteOrder(null)
              }
            >
              <Icon
                name="close"
                size={17}
              />
            </button>

            <div className="Order__deleteIcon">
              <Icon
                name="trash"
                size={30}
              />
            </div>

            <h3>
              Delete Order?
            </h3>

            <p>
              Are you sure you want
              to permanently delete{" "}
              <strong>
                {
                  deleteOrder.orderNumber
                }
              </strong>
              ?
            </p>

            <div className="Order__deleteActions">

              <button
                type="button"
                className="Order__cancelDelete"
                disabled={
                  deleteLoading
                }
                onClick={() =>
                  setDeleteOrder(
                    null
                  )
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__confirmDelete"
                disabled={
                  deleteLoading
                }
                onClick={
                  confirmDelete
                }
              >
                {deleteLoading ? (
                  <>
                    <span className="Order__buttonSpinner" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icon
                      name="trash"
                      size={16}
                    />
                    Delete Order
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          BULK DELETE MODAL
      ===================================================== */}

      {bulkDelete && (
        <div
          className="Order__modalOverlay"
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              if (!deleteLoading) {
                setBulkDelete(false);
              }
            }
          }}
        >

          <div
            className="Order__deleteModal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              disabled={
                deleteLoading
              }
              onClick={() =>
                setBulkDelete(false)
              }
            >
              <Icon
                name="close"
                size={17}
              />
            </button>

            <div className="Order__deleteIcon">
              <Icon
                name="trash"
                size={30}
              />
            </div>

            <h3>
              Delete Selected Orders?
            </h3>

            <p>
              You selected{" "}
              <strong>
                {
                  selectedOrders.length
                }
              </strong>{" "}
              orders. This action
              cannot be undone.
            </p>

            <div className="Order__deleteActions">

              <button
                type="button"
                className="Order__cancelDelete"
                disabled={
                  deleteLoading
                }
                onClick={() =>
                  setBulkDelete(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__confirmDelete"
                disabled={
                  deleteLoading
                }
                onClick={
                  confirmBulkDelete
                }
              >
                {deleteLoading ? (
                  <>
                    <span className="Order__buttonSpinner" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icon
                      name="trash"
                      size={16}
                    />
                    Delete Selected
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Order;

