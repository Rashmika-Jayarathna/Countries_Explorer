import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../components/SearchBar"

describe("SearchBar Component", () => {
  it("renders the search input correctly", () => {
    const mockSetSearchTerm = jest.fn()
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />)

    const searchInput = screen.getByPlaceholderText("Search for a country...")
    expect(searchInput).toBeInTheDocument()
  })

  it("displays the current search term", () => {
    const mockSetSearchTerm = jest.fn()
    render(<SearchBar searchTerm="test" setSearchTerm={mockSetSearchTerm} />)

    const searchInput = screen.getByPlaceholderText("Search for a country...")
    expect(searchInput).toHaveValue("test")
  })

  it("calls setSearchTerm when input changes", () => {
    const mockSetSearchTerm = jest.fn()
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />)

    const searchInput = screen.getByPlaceholderText("Search for a country...")
    fireEvent.change(searchInput, { target: { value: "new search" } })

    expect(mockSetSearchTerm).toHaveBeenCalledWith("new search")
  })
})
