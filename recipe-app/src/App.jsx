import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MealDetails from './pages/MealDetails';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 flex flex-col min-h-screen">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ingredients" element={<Home view="ingredients" />} />
                <Route path="/area" element={<Home view="area" />} />
                <Route path="/meal/:id" element={<MealDetails />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}
