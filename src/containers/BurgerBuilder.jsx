import React from "react";
import { connect } from 'react-redux';
import IngredientComponent from "../components/IngredientComponent";
import { Button } from 'react-bootstrap';
import OrderComponent from "./OrderComponent";
import './BurgerBuilder.css';

const BurgerBuilder = ({ ingredients, finalPrice, addIngredient, removeIngredient, updatePrice, history}) => {
    const isIngredientAdded = !!Object.values(ingredients).find(val => val !== 0);

    return (
        <div className='burger'>
            <IngredientComponent ingredientType='burger-top'/>
            {isIngredientAdded ?
                Object.entries(ingredients).map(ingredient => {
                const singleIngredientCount = [...Array(ingredient[1])];
                return singleIngredientCount && singleIngredientCount.map((item, index) => {
                    return <IngredientComponent ingredientType={ingredient[0]} key={`${ingredient[0]}-${index}`}/>
                })
                }) :
                <div style={{fontWeight: 'bold', margin: '1em 0'}}>Please start adding ingredients</div>
            }
            <IngredientComponent ingredientType='burger-bottom'/>
            <IngredientsConstructor
                ingredients={ingredients}
                isIngredientAdded={isIngredientAdded}
                finalPrice={finalPrice}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
                updatePrice={updatePrice}
                history={history}
            />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        finalPrice: state.finalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch({type: `ADD_${ingredientName.toUpperCase()}`}),
        removeIngredient: (ingredientName) => dispatch({type: `REMOVE_${ingredientName.toUpperCase()}`}),
        updatePrice: ingredientPrice => dispatch({type: 'UPDATE_PRICE', payload: {ingredientPrice: ingredientPrice}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

const IngredientsConstructor = ({finalPrice, addIngredient, removeIngredient, updatePrice, ingredients, isIngredientAdded, history}) => {
    const ingredientsPrice = {
        'salad': 0.50,
        'cheese': 1,
        'bacon': 1.5,
        'meat': 2
    };

    const handleOnClick = (ingredientName, actionType) => {
        if (actionType === 'less') {
            removeIngredient(ingredientName);
            updatePrice(-ingredientsPrice[ingredientName])
        } else {
            addIngredient(ingredientName);
            updatePrice(ingredientsPrice[ingredientName])
        }
    };

    return (
        <div className='ingredient-container'>
            <p>Current Price: <b>{finalPrice}</b></p>
            {Object.entries(ingredients).map((ingredient, index) => {
                return (
                    <p key={`${ingredient[0]}-${index}-container`} className='ingredient'>
                        <b>{ingredient[0]}</b>
                        <span>
                            <LessButton action={() => handleOnClick(ingredient[0], 'less')} disabled={ingredient[1] === 0}/>
                            <MoreButton action={() => handleOnClick(ingredient[0], 'more')}/>
                        </span>
                    </p>
                )
            })}
            <OrderComponent disabled={!isIngredientAdded} finalPrice={finalPrice} ingredients={ingredients} history={history}/>
        </div>
    )
};

const MoreButton = ({ action }) => {
    return <Button className='ingredient-button-add' variant="primary" size='sm' onClick={action}>More</Button>;

};

const LessButton = ({ action, disabled}) => {
    return <Button className='ingredient-button-remove' variant="primary" size='sm' onClick={action} disabled={disabled}>Less</Button>;
};