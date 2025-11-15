import React from 'react';
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import BlogsContent from "../components/Banner/blogsContent";
import '../styles/global.css';

const Blog = () => {
    return (
        <div className="blog-container">
            <Navbar />
            <BlogsContent />
            <Footer />
        </div>
    )
}

export default Blog;