import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { ThemeProvider } from "./context/ThemeContext"
import "./styles/App.css"

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:id" element={<CountryDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <p>© {new Date().getFullYear()} Countries Explorer | Data from REST Countries API</p>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
