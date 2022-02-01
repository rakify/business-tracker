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
import ForgotPass from "./components/ForgotPass";
import Customers from './components/Customers';
import Products from './components/Products';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/pages/customers"
          element={<Customers />}
        />
        <Route
          exact
          path="/pages/products"
          element={<Products />}
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
        <Route
          exact
          path="/:year/:monthId"
          element={user ? <Home /> : <Login />}
        />
        <Route exact path="/" element={user ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
}
export default App;
