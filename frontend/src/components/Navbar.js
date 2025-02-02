import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import axios from '../utils/axios';

const Navbar = () => {
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const { data } = await axios.get('/getuser');
                if (data.user) {
                    // Set user data to Redux
                    dispatch({ type: 'SET_USER', payload: data.user });
                    // Navigate to the home page
                    navigate('/app');
                }
                setLoading(false); // Stop loading once the data is fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data. Please try again later.');
                setLoading(false); // Stop loading even in case of error
            }
        }

        // Only call the API if the user is not already logged in (prevents multiple calls)
        if (!userData.isLoggedIn) {
            isLoggedIn();
        } else {
            setLoading(false); // Stop loading if user is already logged in
        }
    }, [userData.isLoggedIn, dispatch, navigate]); // Dependency array to re-run on login state change

    if (loading) {
        return <div>Loading...</div>; // Display loading state while data is being fetched
    }

    return (
        <div className={Styles['navbar']}>
            {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
            {!userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/login">Login</NavLink>}
            {!userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/signup">Signup</NavLink>}
            {userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/app">Home</NavLink>}
            {userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/cart"><span className='cart-heading'>Cart<span className='cart-number'>{userData?.cart?.length}</span></span></NavLink>}
            {userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/history">History</NavLink>}
            {userData.isLoggedIn && <NavLink className={Styles['nav-item']} to="/logout">Logout</NavLink>}
            {userData.isLoggedIn && <ProfileImage imageUrl={userData.image} />}
        </div>
    )
}

export default Navbar;
