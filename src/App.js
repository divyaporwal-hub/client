import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import ConfirmForget from "./routes/ConfirmForget";
import ForgetPass from "./routes/ForgetPass";
import Register from "./routes/Register";
import Write from "./routes/Write";
import Logout from "./routes/Logout";
import BlogInfo from "./routes/BlogInfo";
import EditProfile from "./routes/EditProfile";
import EditBlog from "./routes/EditBlog";
import Otp from "./routes/Otp";
import SearchResult from "./components/SearchResult";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/confirmforget" element={<ConfirmForget />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<Write />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/editblog/:blogId" element={<EditBlog />} />
          <Route path="/profile/edit/:userName" element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
