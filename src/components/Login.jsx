import { useState } from 'react';
import { styled } from '@mui/system';
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledCard = styled(Card)({
  minWidth: 300,
  padding: '16px',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
  background: '#80d1cd',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if(formData.username==='flAdmin' && formData.password==='flip1234'){
      alert("Admin Logged In Successfully!");
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      window.location.replace('/home');
      setFormData({username: '', password: ''});
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <header style={{ flex: 'none', textAlign: 'center', padding: '20px', width: '97.4%', position: 'relative', background: '#ddf0f0' }}>
        <div style={{ fontWeight: 'bold', fontSize: 'xxx-large', fontFamily: 'monospace' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'black' }}>Flipkart Admin Dashboard</a>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Login
            </Typography>
            <br />
            <StyledForm noValidate autoComplete="off">
              <StyledTextField
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange('username')}
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Login
              </StyledButton>
            </StyledForm>
          </CardContent>
        </StyledCard>
      </div>
      <footer>

      </footer>
    </div>
  );
};

export default Login;
