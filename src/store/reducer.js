const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    finalPrice: 4
};

export const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_SALAD": {
            return {...state, ingredients: {...state.ingredients, salad: state.ingredients.salad + 1}};
        }
        case "REMOVE_SALAD": {
            return {...state, ingredients: {...state.ingredients, salad: state.ingredients.salad - 1}};
        }
        case "ADD_BACON": {
            return {...state, ingredients: {...state.ingredients, bacon: state.ingredients.bacon + 1}};
        }
        case "REMOVE_BACON": {
            return {...state, ingredients: {...state.ingredients, bacon: state.ingredients.bacon - 1}};
        }
        case "ADD_CHEESE": {
            return {...state, ingredients: {...state.ingredients, cheese: state.ingredients.cheese + 1}};
        }
        case "REMOVE_CHEESE": {
            return {...state, ingredients: {...state.ingredients, cheese: state.ingredients.cheese - 1}};
        }
        case "ADD_MEAT": {
            return {...state, ingredients: {...state.ingredients, meat: state.ingredients.meat + 1}};
        }
        case "REMOVE_MEAT": {
            return {...state, ingredients: {...state.ingredients, meat: state.ingredients.meat - 1}};
        }
        case 'UPDATE_PRICE': {
            return {...state, finalPrice: state.finalPrice + action.payload.ingredientPrice}
        }
        case 'RESET_TO_DEFAULT': {
            return {...initialState};
        }

        default:
            return state;
    }
};