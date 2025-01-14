import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from '../actions/favoriteActions';

const initialState = {
  favoriteItems: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favoriteItems: [...state.favoriteItems, action.payload],
      };
    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
