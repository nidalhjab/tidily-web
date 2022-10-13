import './NavBar.css';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const checkIsLoggedIn = () => {
    return Boolean(window.localStorage.getItem("access_token"));
};

export const NavBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

    useEffect(() => {
        window.addEventListener("storage", () => {
            setIsLoggedIn(checkIsLoggedIn());
        });
    }, [checkIsLoggedIn()]);

    const handleLogout = () => {
        if (window.localStorage.getItem("access_token")) {
            window.localStorage.removeItem("access_token");
            window.dispatchEvent(new Event("storage"));
        }
    };
    return (
        <nav className="nav">

            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            {isLoggedIn && <div className="list">
                <ul>
                    <li><Link to="/dashboard"> Dashboard</Link></li>
                    <li><Link to="/profile"> Profile</Link></li>
                    <li onClick={handleLogout}><Link to='/' >Log out</Link></li>
                </ul>
            </div>
            }

        </nav >
    )

}