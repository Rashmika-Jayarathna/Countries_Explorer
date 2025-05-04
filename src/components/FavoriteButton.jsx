"use client"

import { useState, useEffect } from "react"
import "../styles/FavoriteButton.css"

function FavoriteButton({ countryCode, countryName }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      // Check if country is in favorites
      const favorites = JSON.parse(localStorage.getItem("favoriteCountries") || "[]")
      setIsFavorite(favorites.includes(countryCode))
    }
  }, [countryCode])

  const toggleFavorite = (e) => {
    e.stopPropagation() // Prevent triggering parent click events

    if (!isLoggedIn) {
      alert("Please login to add countries to favorites")
      return
    }

    const favorites = JSON.parse(localStorage.getItem("favoriteCountries") || "[]")

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((code) => code !== countryCode)
      localStorage.setItem("favoriteCountries", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
      alert(`${countryName} has been removed from your favorites`)
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, countryCode]
      localStorage.setItem("favoriteCountries", JSON.stringify(updatedFavorites))
      setIsFavorite(true)
      alert(`${countryName} has been added to your favorites`)
    }
  }

  return (
    <button className={`favorite-button ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
      <span className="star-icon">{isFavorite ? "★" : "☆"}</span>
      <span className="button-text">{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
    </button>
  )
}

export default FavoriteButton
