"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../styles/Login.css"

function Login() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Form errors
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      navigate("/profile")
    }
  }, [navigate])

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      // In a real app, you would validate credentials with a backend
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify({ email: loginData.email }))
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    const newErrors = {}
    if (!registerData.name) newErrors.name = "Name is required"
    if (!registerData.email) newErrors.email = "Email is required"
    if (!registerData.password) newErrors.password = "Password is required"
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      // In a real app, you would send registration data to a backend
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: registerData.name,
          email: registerData.email,
        }),
      )
      setIsLoading(false)
      navigate("/")
    }, 1000)
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <div className="logo">
              <span className="globe-icon">🌎</span>
            </div>
            <h1>Welcome to Countries Explorer</h1>
            <p>Sign in to your account or create a new one</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="auth-content">
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="register-email">Email</label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    id="register-password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </button>
              </form>
            )}
          </div>

          <div className="auth-footer">
            <Link to="/" className="guest-link">
              Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
