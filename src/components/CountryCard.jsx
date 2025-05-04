"use client"
import "../styles/CountryCard.css"

function CountryCard({ country, onClick, viewMode = "grid" }) {
  return (
    <div className={`country-card ${viewMode}`} onClick={onClick}>
      <div className="flag-container">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="flag"
        />
      </div>
      <div className="country-info">
        <h2 className="country-name">{country.name.common}</h2>
        <div className="country-details">
          <p>
            <span className="label">Population:</span> {country.population.toLocaleString()}
          </p>
          <p>
            <span className="label">Region:</span> {country.region}
          </p>
          <p>
            <span className="label">Capital:</span> {country.capital?.[0] || "N/A"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
