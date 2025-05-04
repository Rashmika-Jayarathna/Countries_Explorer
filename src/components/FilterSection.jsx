"use client"
import "../styles/FilterSection.css"

function FilterSection({
  regions,
  languages,
  selectedRegion,
  setSelectedRegion,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <div className="filter-section">
      <div className="filter-group">
        <label htmlFor="region-filter">Region</label>
        <select id="region-filter" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="all">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="language-filter">Language</label>
        <select id="language-filter" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="all">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterSection
