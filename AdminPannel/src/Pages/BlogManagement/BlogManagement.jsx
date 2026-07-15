import React, { useState, useEffect, useRef } from "react";
import "./BlogManagement.css";
import {
  FiGrid,
  FiList,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiUpload,
  FiCalendar,
} from "react-icons/fi";

const BlogManagement = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [openMenu, setOpenMenu] = useState(null);

  const blogsData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
      name: "Ankita",
      designation: "Food Blogger",
      date: "2026-07-14",
      status: "Published",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
      name: "Ankss",
      designation: "Developer",
      date: "2026-07-14",
      status: "Draft",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
      name: "Ankita",
      designation: "Photographer",
      date: "2026-07-13",
      status: "Published",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
      name: "Ankitartycvh",
      designation: "Designer",
      date: "2026-07-17",
      status: "Draft",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
      name: "Edrfg",
      designation: "Content Writer",
      date: "2026-07-13",
      status: "Published",
    },
  ];

  const [blogs, setBlogs] = useState(blogsData);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmDelete) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleEdit = (blog) => {
    alert(`Edit Blog : ${blog.name}`);
  };

  const handlePublish = (id) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              status:
                blog.status === "Published" ? "Draft" : "Published",
            }
          : blog
      )
    );
  };

  return (
    <div className="blogManageContainer">
      {/* Header */}
      <div className="blogManageTop">
        <div>
          <h1>Blog Management</h1>
          <p>Manage all blogs professionally.</p>
        </div>

        <div className="blogViewSwitcher">
          <button
            className={viewMode === "grid" ? "activeView" : ""}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid />
            Grid View
          </button>

          <button
            className={viewMode === "list" ? "activeView" : ""}
            onClick={() => setViewMode("list")}
          >
            <FiList />
            List View
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="blogGridContainer">
          {blogs.map((blog) => (
            <div className="blogGridCard" key={blog.id}>
              <img src={blog.image} alt="" />

              <div className="blogOverlay"></div>

              <div className="blogContent">
                <h2>{blog.name}</h2>
                <p>{blog.designation}</p>

                <div className="blogDate">
                  <FiCalendar />
                  {blog.date}
                </div>
              </div>

              {/* MENU */}
              <div
                className="blogMenuWrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="blogMenuButton"
                  onClick={() =>
                    setOpenMenu(openMenu === blog.id ? null : blog.id)
                  }
                >
                  <FiMoreVertical />
                </button>

                {openMenu === blog.id && (
                  <div className="blogDropdownMenu">
                    <button onClick={() => handleEdit(blog)}>
                      <FiEdit />
                      Edit
                    </button>

                    <button onClick={() => handlePublish(blog.id)}>
                      <FiUpload />
                      {blog.status === "Published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      className="deleteAction"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <span
                className={`blogStatusBadge ${
                  blog.status === "Published"
                    ? "publishedBadge"
                    : "draftBadge"
                }`}
              >
                {blog.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="blogTableContainer">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <img
                      src={blog.image}
                      alt=""
                      className="tableProfileImage"
                    />
                  </td>

                  <td>{blog.name}</td>
                  <td>{blog.designation}</td>
                  <td>{blog.date}</td>

                  <td>
                    <span
                      className={`tableStatus ${
                        blog.status === "Published"
                          ? "publishedBadge"
                          : "draftBadge"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td>
                    <div className="tableActionButtons">
                      <button
                        className="editButton"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>

                      <button
                        className="publishButton"
                        onClick={() => handlePublish(blog.id)}
                      >
                        {blog.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        className="deleteButton"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;