import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='app' element={<Home />} />
        <Route path='app/:restaurant_id' element={<RestaurantPage />} />
      </Routes>
    </div>
  );
}

export default App; 