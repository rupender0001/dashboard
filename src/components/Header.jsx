import * as React from 'react';
import HamburgerIcon from '../assets/hamburger.svg';
import CrossIcon from '../assets/cross.svg';
import { Button } from '@mui/material'

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
          localStorage.clear();
          window.location.replace(`/`)
        }
      };

    return (
        <div>
            <header style={{ flex: 'none', textAlign: 'center', padding: '20px', width: '97.4%', position: 'relative', background: '#ddf0f0' }}>
                <div style={{ position: 'absolute', left: '20px', cursor: 'pointer' }} onClick={toggleDrawer}>
                    <img src={HamburgerIcon} alt="Hamburger Icon" style={{ width: '25px', height: '25px' }} />
                </div>
                <div style={{ fontWeight: 'bold', fontSize: 'xxx-large', fontFamily: 'monospace' }}>
                    <a href="/home" style={{ textDecoration: 'none', color: 'black' }}>Flipkart </a>
                </div>
                <div style={{ position: 'absolute', left: '1400px', cursor: 'pointer', bottom: '30px', border: '1px solid lightblue', borderRadius: '4px' }}>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </header>
            {isDrawerOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '300px', height: '100%', background: '#9cb8b8', zIndex: 999 }}>
                <div style={{ textAlign: 'left', padding: '10px' }}>
                <img src={CrossIcon} alt="Hamburger Icon" style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={toggleDrawer}/>
                </div>
                <div style={{ padding: '10px', color: 'black', fontFamily: 'monospace', fontSize: 'x-large' }}>
                    <a href="/users" style={{ textDecoration: 'none', color: 'black' }}>All Users</a>
                </div>
                <div style={{ padding: '10px', color: 'black', fontFamily: 'monospace', fontSize: 'x-large' }}>
                    <a href="/buy" style={{ textDecoration: 'none', color: 'black' }}>Buy Products</a>
                </div>
                <div style={{ padding: '10px', color: 'black', fontFamily: 'monospace', fontSize: 'x-large' }}>
                <a href="/products" style={{ textDecoration: 'none', color: 'black' }}>Products</a>
                </div>
            </div>
            )}
        </div>
    )
}