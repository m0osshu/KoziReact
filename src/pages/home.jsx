// src/pages/home.jsx
import Banner from "../components/Banner/banner.jsx"
import Navbar from "../components/layout/navbar.jsx" 
import Footer from "../components/layout/footer.jsx"    
import '../styles/global.css'

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <Banner />
            <Footer />
        </div>
    )
}

export default Home