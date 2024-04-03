
import './App.css';
import Home from './components/HomeDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DairyDataTable from './components/UserDashboard';
import ProductDashboard from './components/ProductDashboard';
import OrderTable from './components/BuyDashboard';
function App() {
  return (
        <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<DairyDataTable />} />
        <Route path="/products" element={<ProductDashboard/>}/>
        <Route path="/buy" element={<OrderTable/>}/>
      </Routes>
    </Router>
  );
}

export default App;
