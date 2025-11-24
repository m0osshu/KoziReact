import "../styles/global.css";
import Banner from "../components/organisms/Banner";
import HomeCatalog from "../components/organisms/HomeCatalog";

export default function Home() {
  return (
    <div className="home-container">
      <Banner />
      <HomeCatalog />
    </div>
  );
}
