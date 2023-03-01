import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import 'react-toastify/dist/ReactToastify.css'
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserListPage from "./pages/UserListPage";
import EditUserPage from "./pages/EditUserPage";
import AddUserPage from "./pages/AddUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/admin" element={<AdminLoginPage />} />
        <Route exact path="/user-list" element={<UserListPage />} />
        <Route exact path="/edit-user" element={<EditUserPage />} />
        <Route exact path="/add-user" element={<AddUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
