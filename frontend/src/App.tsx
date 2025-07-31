import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GetAnswers from "./pages/GetAnswers";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ToastNotification from "./components/layout/ToastNotification";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={<ProtectedRoute component={Signup} redirectPath="/login"/>}
            />
            <Route
              path="/login"
              element={<ProtectedRoute component={Login} redirectPath="/get-answers"/>}
            />
            <Route path="/get-answers" element={<GetAnswers />} />
          </Routes>
        </Layout>
        <ToastNotification />
      </Router>
    </AuthProvider>
  );
};

export default App;
