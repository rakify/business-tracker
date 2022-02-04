import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import EntryDetails from "./pages/EntryDetails";
import Customer from "./pages/Customer";
import Footer from "./components/Footer";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/customer/:customerName"
          element={user ? <Customer /> : <Login />}
        />
        <Route
          exact
          path="/entries/:entryId"
          element={user ? <EntryDetails /> : <Login />}
        />
        <Route
          exact
          path="/pages/settings"
          element={user ? <Settings /> : <Login />}
        />
        <Route
          exact
          path="/pages/customers"
          element={user ? <Customers /> : <Login />}
        />
        <Route
          exact
          path="/pages/products"
          element={user ? <Products /> : <Login />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/admin" element={user ? <Admin /> : <Login />} />
        <Route
          exact
          path="/forgot_pass"
          element={user ? <Home /> : <ForgotPass title="Forgot Password" />}
        />
        <Route
          exact
          path="/reset_pass/:userId/:token"
          element={user ? <Home /> : <ForgotPass title="Reset Password" />}
        />
        <Route exact path="/" element={user ? <Home /> : <Login />} />
      </Routes>
      {user?.language === "bangla" && <Footer />}
    </Router>
  );
}
export default App;
