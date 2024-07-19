import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./contexts/BlogContext.jsx";
import BlogPostDetail from "./components/BlogPostDetail.jsx";
// import BlogPostPreview from "./components/BlogPostPreview.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Contact from "./components/Contact.jsx";
import NewPost from "./components/NewPost.jsx";
import Login from "./components/Login.jsx";

import "./App.css";

export default function App() {
  return (
    <BlogProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/BlogPostDetail/:id" element={<BlogPostDetail />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <div className="App"></div>
        </div>
      </Router>
    </BlogProvider>
  );
}
