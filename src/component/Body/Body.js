import React, { useEffect, useState } from 'react';
import { addToDb, getDb } from '../../fakeDb/fakeDb';
import AllCards from '../AllCards/AllCards';
import Cart from '../Cart/Cart';
import './Body.css'


const Body = () => {

    const [foods, setFoods] = useState([]);
    const [searchText, setSearchText] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [carts,setCart] = useState([]);

    const searchTextField = (event) => {
        setSearchText(event.target.value)

    }
    // console.log(searchText);

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url)
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.meals && setLoadData(true)
                data.meals ? setFoods(data.meals) : setLoadData(false)

            })

    }, [url, loadData])
    //    console.log(foods);



    useEffect(()=>{
        if(foods.length){
            const saveDb = getDb();
            const saveCart = [];
            for (const mealId in saveDb){
                console.log(mealId);
                const food = foods.find(fd => fd.idMeal === mealId)
                const quantity = saveDb[mealId];
                food.quantity = quantity;
                saveCart.push(food);
                setCart(saveCart);
            }
            // console.log(saveDb);
        }
    },[foods])




    const handleAddToCart = (props) => {
        props.quantity= 1;
        // console.log('clicked', props);
        const newCart = [...carts,props];
        setCart(newCart)
        addToDb(props.idMeal)
    }


    // total qunatity 

    const countReducer = (perivious,food)=> perivious + food.quantity
    const count = carts.reduce(countReducer ,0)

    return (
        <div className='b-background'>
            <div className="input-field">
                <input className='input' onChange={searchTextField} type="text" placeholder="Search Your Favorite Food" />
            </div>
            <div className="main-body">
                <div className="all-cards">
                    <h1>Total Foods :{foods.length} </h1>
                    {
                        loadData ? <div className="cards-display">
                            {
                                foods?.map(food => <AllCards handleAddToCart={handleAddToCart} key={food.idMeal} food={food}></AllCards>)
                            }
                        </div> : <h1 style={{ color: 'white' }}>Error Not found</h1>
                    }
                </div>


                <div className="food-name">
                    <h1>Food name</h1>
                    <h2>Order Items : {count}</h2>
                    {
                        carts.map(cart => <Cart key = {cart.idMeal} cart = {cart}></Cart>)
                    }

                </div>
            </div>
        </div>
    )
};

export default Body;