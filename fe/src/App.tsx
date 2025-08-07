
import {LandingPage} from './pages/landing'
import './App.css'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { Route, Routes } from 'react-router-dom'
import { CSVtoJSON } from './pages/csvtojson'
import { SQLtoJSON } from './pages/sqltojson'
import { JSONtoCSV } from './pages/jsontocsv'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ctoj" element={<CSVtoJSON />} />
          <Route path="/stoj" element={<SQLtoJSON />} />
          <Route path="/jtoc" element={<JSONtoCSV />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
