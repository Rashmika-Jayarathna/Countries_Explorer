import { render, screen, fireEvent } from "@testing-library/react"
import RegionFilter from "../components/RegionFilter"

describe("RegionFilter Component", () => {
  it("renders the region filter correctly", () => {
    const mockSetSelectedRegion = jest.fn()
    render(<RegionFilter selectedRegion="" setSelectedRegion={mockSetSelectedRegion} />)

    const filterSelect = screen.getByText("Filter by Region")
    expect(filterSelect).toBeInTheDocument()
  })

  it("displays all region options", () => {
    const mockSetSelectedRegion = jest.fn()
    render(<RegionFilter selectedRegion="" setSelectedRegion={mockSetSelectedRegion} />)

    const selectElement = screen.getByRole("combobox")

    expect(selectElement).toHaveDisplayValue("Filter by Region")

    expect(selectElement.children.length).toBe(6) // 5 regions + "Filter by Region"
  })

  it("calls setSelectedRegion when a region is selected", () => {
    const mockSetSelectedRegion = jest.fn()
    render(<RegionFilter selectedRegion="" setSelectedRegion={mockSetSelectedRegion} />)

    const selectElement = screen.getByRole("combobox")
    fireEvent.change(selectElement, { target: { value: "Africa" } })

    expect(mockSetSelectedRegion).toHaveBeenCalledWith("Africa")
  })
})
