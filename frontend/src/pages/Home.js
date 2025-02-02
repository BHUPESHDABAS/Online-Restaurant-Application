import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import AllRestaurants from '../components/Restaurants/AllRestaurants.js';
import MySpinner from '../components/Spinner.js';
import LandingPage from './LandingPage';
import { Outlet } from 'react-router-dom';

const Home = () => {
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [isRestaurantsFetched, setIsRestaurantsFetched] = useState(false);

    const getRestaurantDetails = useCallback(async () => {
        try {
            let response = await axios.get('/restaurant/all');
            if (response.data && response.data.restaurants) {
                dispatch({ type: "SET_RESTAURANTS", payload: response.data.restaurants });
                setIsRestaurantsFetched(true);
            } else {
                console.error("Unexpected API response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            alert("Failed to fetch restaurant details.");
        }
    }, [dispatch]);  // Adding dispatch to the dependencies to avoid the eslint warning

    useEffect(() => {
        getRestaurantDetails();
    }, [getRestaurantDetails]); // Using the updated function reference

    return (
        <>
            {
                userData.isLoggedIn && <div>
                    {!isRestaurantsFetched && <MySpinner />}
                    {isRestaurantsFetched && <AllRestaurants />}
                    <Outlet />
                </div>
            }

            {!userData.isLoggedIn && <LandingPage />}
        </>
    );
}

export default Home;
