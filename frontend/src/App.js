import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Share from "./components/Share";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logout = () => {
        AuthService.logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Youtube Sharing
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">Home</Link>
                    </li>
                </div>
                {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <p>Welcome {currentUser.email}</p>
                    </li>
                    <li className="nav-item">
                        <Link to={"/share"} className="nav-link">
                            Share a movie
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link" onClick={logout}>Logout</a>
                    </li>
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                            Register
                        </Link>
                    </li>
                </div>
                )}
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/share" element={<Share/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
