import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import "./BlogPostDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BlogPostDetail() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);

  const blog = blogs.find((b) => b.id === parseInt(id, 10));

  if (!blog) {
    return <div>Blog not found here!</div>;
  }

  return (
    <div className="blog-post-detail-container">
      <Link to="/Dashboard" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <div className="blog-post-detail">
        <div className="blog-header">
          <h4>{blog.title}</h4>
          <p>{new Date(blog.visitingDate).toLocaleDateString()}</p>
        </div>
        <div className="author-detail">
          <img
            src={blog.author.image}
            alt={blog.author.name}
            className="author-image"
          />
          <p>{blog.author.name}</p>
        </div>
        <img src={blog.image} alt={blog.title} className="blog-image" />
        <p className="blog-text">{blog.text}</p>
        <div className="location">
          <p>
            {blog.location.city}, {blog.location.country}
          </p>
        </div>
        <footer className="footer">
          <p>© 2024 Traveling with Simon. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
