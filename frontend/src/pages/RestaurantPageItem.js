import React, { useEffect, useState } from 'react'
import FoodImageCarousel from "../components/FoodImageCarousel";
import Styles from "./RestaurantPageItem.module.css";
import FoodItem from '../components/FoodItem';
const RestaurantPageItem = ({ restaurant }) => {
    // Show Images
    // Cafe Name
    const [cusineCategory, setCusineCategory] = useState("");
    const [cusineFood, setCusineFood] = useState([]);

    // const [restaurant, setRestaurant] = useState(restaurant);

    useEffect(() => {
        const food = restaurant.cusines.filter(item => item.category === cusineCategory)[0];
        // console.log("Food",food.food);
        if (food) setCusineFood(food.food);
    }, [restaurant.cusines, cusineCategory]);

    const cusineCategoryHandler = (category) => {
        setCusineCategory(category);

    }

    return (
        <div className={Styles['carousel']}>
            <FoodImageCarousel
                address={restaurant.address}
                imageUrl={restaurant.coverImage}
                name={restaurant.name}
                contact={restaurant.contact}
            />

            <div className='cusines-container'>
                <h4 className={Styles['cusines-heading']}>Select Your Delicious Cusine</h4>
                <div className={Styles['cusines']}>
                    <div className={Styles['cusines-category']}>
                        {
                            restaurant.cusines.map((item, indx) =>
                                <div
                                    className={(item.category === cusineCategory) ? `${Styles['active-category']} ${Styles['cusines-category-item']}` : `${Styles['cusines-category-item']}`}
                                    onClick={(ev) => { cusineCategoryHandler(item.category) }}
                                    key={indx}

                                >
                                    {item.category}
                                </div>
                            )}
                    </div>
                    <div className={Styles['cusines-food']}>
                        {cusineFood.length > 0 && cusineFood.map((item, indx) => <div className={Styles['cusines']}
                            key={indx}>
                            <FoodItem
                                food={item}
                                category={cusineCategory}
                                restaurantName={restaurant.name}
                            />
                        </div>)}
                        {cusineFood.length === 0 && <div className={Styles['cusines']}>No Food under this category</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPageItem