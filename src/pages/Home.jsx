"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar"
import FilterSection from "../components/FilterSection"
import LoadingSpinner from "../components/LoadingSpinner"
import "../styles/Home.css"

function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [allLanguages, setAllLanguages] = useState([])
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const navigate = useNavigate()

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://restcountries.com/v3.1/all")
        const data = await response.json()
        setCountries(data)
        setFilteredCountries(data)

        // Extract all languages for the language filter
        const languages = new Set()
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              languages.add(lang)
            })
          }
        })
        setAllLanguages(Array.from(languages).sort())

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching countries:", error)
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Filter countries based on search term, region, and language
  useEffect(() => {
    let result = countries

    // Filter by search term
    if (searchTerm) {
      result = result.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== "all") {
      result = result.filter((country) => country.region === selectedRegion)
    }

    // Filter by language
    if (selectedLanguage && selectedLanguage !== "all") {
      result = result.filter((country) => {
        if (!country.languages) return false
        return Object.values(country.languages).some((lang) => lang === selectedLanguage)
      })
    }

    setFilteredCountries(result)
  }, [searchTerm, selectedRegion, selectedLanguage, countries])

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`)
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>Explore Countries Around the World</h1>
          <p>Discover information about countries, their flags, populations, languages, and more.</p>
        </div>
      </div>

      <div className="container">
        <div className="search-filter-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterSection
            regions={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
            languages={allLanguages}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <div className="view-toggle">
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
              Grid
            </button>
            <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
              List
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredCountries.length > 0 ? (
          <div className={`countries-container ${viewMode}`}>
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onClick={() => handleCountryClick(country.cca3)}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>No countries found matching your criteria</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
