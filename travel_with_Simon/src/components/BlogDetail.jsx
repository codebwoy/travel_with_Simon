import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext"; // THIS IS PATH REPLACE
import BlogPostPreview from "./BlogPostPreview";

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.visitingDate}</p>
      <div className="author-info">
        <img src={blog.author.image} alt={blog.author.name} />
        <span>{blog.author.name}</span>
      </div>
      <img src={blog.image} alt={blog.title} />
      <p>{blog.content}</p> {/* Assuming blog has content field */}
      <BlogPostPreview />
    </div>
  );
}
