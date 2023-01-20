import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Portfolio from "./pages/Portfolio";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/edit-listing/:id" element={<EditListing />}></Route>
          <Route path="/listing" element={<Listing />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
