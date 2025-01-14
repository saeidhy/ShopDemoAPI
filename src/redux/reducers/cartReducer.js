const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const itemExists = state.cartItems.find(cartItem => cartItem.id === item.id);
      const updatedCartItems = itemExists
        ? state.cartItems.map(cartItem => cartItem.id === item.id ? item : cartItem)
        : [...state.cartItems, item];

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case 'REMOVE_FROM_CART':
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload);

      localStorage.setItem('cartItems', JSON.stringify(filteredItems));

      return {
        ...state,
        cartItems: filteredItems,
      };

    case 'LOAD_CART_FROM_LOCALSTORAGE':
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
