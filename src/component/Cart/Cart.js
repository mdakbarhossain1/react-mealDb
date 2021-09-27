import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const {idMeal,strArea,strMealThumb}=props.cart
    return (
        <div className='card'>
            <h1>{idMeal}</h1>
            <h1>{strArea}</h1>
            <h1>{strMealThumb}</h1>
        </div>
    );
};

export default Cart;