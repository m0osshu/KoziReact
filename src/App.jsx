import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";
import { appRoutes } from "./routes/config";

function Layout() {
  const location = useLocation();
  const currentRoute = appRoutes.find(route => route.path === location.pathname);
  const showNavbar = currentRoute?.showNavbar ?? true;

  return (
    <>
      {showNavbar && <Navbar />}

      <main>
        <Suspense fallback={<div className="loading">Cargando...</div>}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>

      {showNavbar && <Footer />}
    </>
  );
}

export default function App() {
  return <Layout />;
}
