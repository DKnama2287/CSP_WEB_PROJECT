import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "DROP":
            return [];

        case "UPDATE":
            return state.map(item => {
                if (item.id === action.id && item.size === action.size) {
                    // Update quantity and price for the item with matching id and size
                    return {
                        ...item,
                        qty: item.qty + parseInt(action.qty), // Increase the quantity
                        price: item.price + action.price       // Update the price based on new addition
                    };
                }
                return item; // Leave other items unchanged
            });

        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);