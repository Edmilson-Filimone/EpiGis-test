import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import AdminPage from "./pages/AdminPage";
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
          <Route path="/listing" element={<Listing />}></Route>
          <Route path="/create-listing" element={<PrivateRoute/>}>
            <Route path="/create-listing" element={<CreateListing/>}/>
          </Route>
          <Route path="/edit-listing/:id" element={<PrivateRoute/>}>
            <Route path="/edit-listing/:id" element={<EditListing />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute/>}>
            <Route path="/admin" element={< AdminPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
