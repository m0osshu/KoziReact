import React from 'react';
import '../styles/pages/Home.css';  // Así debe estar

const Home = () => {
  return (
    <div className="home-container">
      <section className="home">
        <div className="home-content">
          <a href="/blogs" className="btn">Blogs</a>
        </div>
        <div className="home-img">

        </div>
      </section>
    </div>
  );
};

export default Home;