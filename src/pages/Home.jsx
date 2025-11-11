import Banner from "../components/Banner/banner.jsx"
import Navbar from "../components/layout/navbar.jsx" 
import Footer from "../components/layout/footer.jsx"    
import '../../src/styles/pages/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <Navbar />
                <Banner />
                <Footer />
            </div>
        </div>
    )
}

export default Home