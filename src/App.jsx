import FrontPage from "../pages/FrontPage";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NewArrival from "../pages/NewArrival";
import SneakerPage from "../pages/SneakerPage";
import AllSneakers from "../pages/AllSneakers";
import AdidasOriginals from "../pages/AdidasOriginals";
import Nike from "../pages/Nike";
import NewBalance from "../pages/NewBalance";
import Puma from "../pages/Puma";
import Cart from "../pages/Cart";
import ProfilePage from "../pages/ProfilePage";
import Wishlist from "../pages/Wishlist";
import AddAddress from "../pages/AddAddress";
import About from "../pages/About";
import SomosEternos from "../pages/SomosEternos";
import Jordan from "../pages/Jordan";
import { SneakersProvider } from "../context/SneakersContext";
import Search from "../components/Search";
import AdidasSamba from "../pages/AdidasSamba";
import Footer from "../components/Footer";
import ScrollOnTop from "../components/ScrollOnTop";
import SaleheBembury from "../pages/SaleheBembury";
import Checkout from "../pages/Checkout";

function App() {
  return (
    <>
      <SneakersProvider>
        <Search />
        <Router>
          <ScrollOnTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/newArrival" element={<NewArrival />} />
            <Route path="/sneakerPage/:sneakerId" element={<SneakerPage />} />
            <Route path="/allSneakers" element={<AllSneakers />} />
            <Route path="/adidasOriginals" element={<AdidasOriginals />} />
            <Route path="/nike" element={<Nike />} />
            <Route path="/newBalance" element={<NewBalance />} />
            <Route path="/puma" element={<Puma />} />
            <Route path="/adidasSamba" element={<AdidasSamba />} />
            <Route path="/somosEternos" element={<SomosEternos />} />
            <Route path="/jordan" element={<Jordan />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/addAddress" element={<AddAddress />} />
            <Route path="/about" element={<About />} />
            <Route path="/saleheBembury" element={<SaleheBembury />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </Router>
      </SneakersProvider>
    </>
  );
}

export default App;
