import { useEffect } from 'react';
import './Dashboard.css'; // You can create a separate CSS file for styling
import Header from './Header';

const Home = () => {
  // Mock data for number of users
  const totalUsers = 1000;
  const dailyUsers = 50;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername !== 'flAdmin' || storedPassword !== 'flip1234') {
      window.location.replace('/');
    }
  }, []);

const goToCardWindow = (type) => {
    window.open(`/${type}`)
}

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 'large', paddingBottom: '20px' }}>
        <h1>DashBoard</h1>
      </div>
      <div className="dashboard">
        <div className="card" onClick={() => goToCardWindow('users')}>
          <h2>Users</h2>
          <p>Total Users: {totalUsers}</p>
          <p>Daily Users: {dailyUsers}</p>
        </div>
        <div className="card" onClick={() => goToCardWindow('products')}>
          <h2>Products</h2>
          <p>Total Products: {totalUsers}</p>
        </div>
        <div className="card" onClick={() => goToCardWindow('buy')}>
          <h2>Buyed Products</h2>
          <p>Total Buy: {totalUsers}</p>
          <p>Daily Buy: {dailyUsers}</p>
        </div>
        <div className="card" onClick={() => console.log("Daily clicked")}>
          <h2>Daily</h2>
          <p>Total Users: {totalUsers}</p>
          <p>Daily Users: {dailyUsers}</p>
        </div>
      </div>
      <footer style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center', background: '#ddf0f0', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>@2024 - Flipkart Home Dashboard</footer>
    </div>
  );
};

export default Home;