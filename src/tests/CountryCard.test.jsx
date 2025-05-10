"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import CountryCard from "../components/CountryCard"

describe("CountryCard Component", () => {
  const mockCountry = {
    name: {
      common: "Test Country",
    },
    flags: {
      svg: "https://test.com/flag.svg",
      alt: "Flag of Test Country",
    },
    population: 1000000,
    region: "Test Region",
    capital: ["Test Capital"],
  }

  const mockOnClick = jest.fn()

  it("renders country information correctly", () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />)

    expect(screen.getByText("Test Country")).toBeInTheDocument()

    expect(screen.getByText(/1,000,000/)).toBeInTheDocument()

    expect(screen.getByText(/Test Region/)).toBeInTheDocument()

    expect(screen.getByText(/Test Capital/)).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />)

    const card = screen.getByText("Test Country").closest("div")
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("handles missing capital gracefully", () => {
    const countryWithoutCapital = {
      ...mockCountry,
      capital: undefined,
    }

    render(<CountryCard country={countryWithoutCapital} onClick={mockOnClick} />)

    expect(screen.getByText(/N\/A/)).toBeInTheDocument()
  })
})
