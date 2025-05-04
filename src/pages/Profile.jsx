"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import CountryCard from "../components/CountryCard"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/Profile.css"

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [favoriteCountries, setFavoriteCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = JSON.parse(localStorage.getItem("user") || "{}")

    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    setUser(userData)

    // Get favorite countries from localStorage
    const favorites = JSON.parse(localStorage.getItem("favoriteCountries") || "[]")

    // Fetch details for favorite countries
    const fetchFavoriteCountries = async () => {
      if (favorites.length === 0) {
        setIsLoading(false)
        return
      }

      try {
        const countriesData = []

        for (const code of favorites) {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
          if (response.ok) {
            const data = await response.json()
            countriesData.push(data[0])
          }
        }

        setFavoriteCountries(countriesData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching favorite countries:", error)
        setIsLoading(false)
      }
    }

    fetchFavoriteCountries()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Your Profile</h1>
        </div>

        <div className="profile-content">
          <div className="user-info">
            <div className="user-avatar">
              <span className="avatar-placeholder">{user?.name ? user.name[0].toUpperCase() : "U"}</span>
            </div>
            <h2>{user?.name || user?.email}</h2>
            <p className="user-email">{user?.email}</p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-value">{favoriteCountries.length}</span>
                <span className="stat-label">Favorite Countries</span>
              </div>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="favorites-section">
            <h2>
              <span className="star-icon">⭐</span> Your Favorite Countries
            </h2>

            {favoriteCountries.length > 0 ? (
              <div className="favorites-grid">
                {favoriteCountries.map((country) => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    onClick={() => handleCountryClick(country.cca3)}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="no-favorites">
                <p>You haven't added any favorite countries yet.</p>
                <Link to="/" className="btn btn-primary">
                  Explore Countries
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
