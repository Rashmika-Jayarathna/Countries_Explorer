"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FavoriteButton from "../components/FavoriteButton"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/CountryDetail.css"

function CountryDetail() {
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const { id } = params

  useEffect(() => {
    const fetchCountryDetail = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)

        if (!response.ok) {
          throw new Error("Country not found")
        }

        const data = await response.json()
        setCountry(data[0])
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching country details:", error)
        setError(error.message)
        setIsLoading(false)
      }
    }

    if (id) {
      fetchCountryDetail()
    }
  }, [id])

  const handleBackClick = () => {
    navigate(-1)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="container error-container">
        <h1>Error</h1>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={handleBackClick}>
          Go Back
        </button>
      </div>
    )
  }

  if (!country) {
    return null
  }

  // Extract country data
  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    languages,
    currencies,
    borders,
    area,
    timezones,
    continents,
    maps,
    car,
    startOfWeek,
    independent,
    unMember,
  } = country

  return (
    <div className="country-detail-page">
      <div className="container">
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>

        <div className="country-header">
          <h1>{name.common}</h1>
          <FavoriteButton countryCode={id} countryName={name.common} />
        </div>

        <div className="country-content">
          <div className="flag-container">
            <img src={flags.svg || flags.png} alt={flags.alt || `Flag of ${name.common}`} className="country-flag" />
            
          </div>

          <div className="country-info">
            <div className="info-section">
              <h2>Basic Information</h2>
              <div className="info-grid">
                <DetailItem label="Official Name" value={name.official} />
                <DetailItem label="Capital" value={capital?.join(", ") || "N/A"} />
                <DetailItem label="Population" value={population?.toLocaleString() || "N/A"} />
                <DetailItem label="Region" value={region || "N/A"} />
                <DetailItem label="Sub Region" value={subregion || "N/A"} />
                <DetailItem label="Area" value={area ? `${area.toLocaleString()} km²` : "N/A"} />
                <DetailItem label="Continent" value={continents?.join(", ") || "N/A"} />
                <DetailItem label="Independent" value={independent ? "Yes" : "No"} />
                <DetailItem label="UN Member" value={unMember ? "Yes" : "No"} />
                <DetailItem label="Start of Week" value={startOfWeek || "N/A"} />
                <DetailItem label="Driving Side" value={car?.side || "N/A"} />
              </div>
            </div>

            <div className="info-section">
              <h2>Languages & Currency</h2>
              <div className="info-grid">
                <DetailItem label="Languages" value={languages ? Object.values(languages).join(", ") : "N/A"} />
                <DetailItem
                  label="Currencies"
                  value={
                    currencies
                      ? Object.values(currencies)
                          .map((c) => `${c.name} (${c.symbol})`)
                          .join(", ")
                      : "N/A"
                  }
                />
              </div>
            </div>

            <div className="info-section">
              <h2>Time & Location</h2>
              <div className="info-grid">
                <DetailItem label="Timezones" value={timezones?.join(", ") || "N/A"} />
                {maps?.googleMaps && (
                  <div className="map-link">
                    <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      View on Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>

            {borders && borders.length > 0 && (
              <div className="info-section">
                <h2>Border Countries</h2>
                <div className="border-countries">
                  {borders.map((border) => (
                    <button key={border} className="border-country-btn" onClick={() => navigate(`/country/${border}`)}>
                      {border}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

export default CountryDetail
