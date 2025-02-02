import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import RestaurantPageItem from './RestaurantPageItem';
import MySpinner from '../components/Spinner';

const RestaurantPage = () => {
    const { restaurant_id } = useParams();
    const [isRestaurantFetched, setIsRestaurantFetched] = useState(false);
    const [restaurant, setRestaurant] = useState([]);

    const getRestaurant = useCallback(async () => {
        try {
            const { data } = await axios.get(`/restaurant/${restaurant_id}`);
            setRestaurant(data.restaurant[0]);
            // console.log(data.restaurant[0]);
            setIsRestaurantFetched(true);
        } catch (error) {
            alert(error);
        }
    }, [restaurant_id]); // Adding restaurant_id as a dependency

    useEffect(() => {
        getRestaurant();
    }, [getRestaurant]); // Using the updated function reference

    return (
        <>
            {isRestaurantFetched && <RestaurantPageItem restaurant={restaurant} />}
            {!isRestaurantFetched && <MySpinner />}
        </>
    );
}

export default RestaurantPage;
