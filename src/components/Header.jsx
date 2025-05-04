"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import "../styles/Header.css"

function Header() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="globe-icon">🌎</span>
            <span className="logo-text">Countries Explorer</span>
          </Link>

          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </li>
              <li>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
