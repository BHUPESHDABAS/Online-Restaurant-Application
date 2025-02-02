import express from 'express';

import {
        //CRUD on cart
        getAddCart,
        getCartItemDelete,
        getCartItemIncrease,
        getCartItemDecrease,
        getCartItems,
      } from "../controllers/cart.js";

import { 
        //CRUD on cusine and food
        getDeleteFoodItem, 
        getFoodItems,
        getFoodItem,
        getAllCusines,
        postAddFoodItem, 
        postCusineCategoryAdd, 
        postRestaurant, 
        postUpdateFoodItem,
        postAddFoodImage,
        //CRUD on reviews
        postAddReview,
        postUpdateReview,
        getDeleteReview,
        getAllReviews,
        getReview,
        getRestaurants,
        getRestaurant
      } 
       from '../controllers/restaurant.js';

import upload from "../utils/multer.js";
const router = express.Router();

router.post('/register', upload.single("coverImage") ,postRestaurant);
router.post('/cusine-category-add', postCusineCategoryAdd);
router.post('/add-food-item', upload.single("image"), postAddFoodItem);
router.post('/add-food-image/:id', upload.array('images', 6), postAddFoodImage);
router.post('/update-food-item/:id', upload.single("image"), postUpdateFoodItem);
router.get('/delete-food-item/:id', getDeleteFoodItem);

router.get('/get-food-items', getFoodItems);
router.get('/get-food-item/:id', getFoodItem);
router.get('/get-all-cusines', getAllCusines);

router.get('/all', getRestaurants);
router.get('/:restaurantId', getRestaurant);

router.post('/add-review', upload.array('images', 12), postAddReview);
router.post('/update-review/:reviewId', postUpdateReview);
router.get('/delete-review/:reviewId', getDeleteReview);
router.get('/get-all-reviews', getAllReviews);
router.get('/get-review/:reviewId', getReview);



router.get("/view-cart", getCartItems)
router.get("/add-cart/:id", getAddCart);
router.get("/increase-cart/:id", getCartItemIncrease);
router.get("/decrease-cart/:id", getCartItemDecrease);
router.get("/delete-cart-item/:id", getCartItemDelete);

export default router;