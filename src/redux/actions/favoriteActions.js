// Action Types
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';

// Action Creators
export const addToFavorite = (item) => ({
  type: ADD_TO_FAVORITE,
  payload: item,
});

export const removeFromFavorite = (itemId) => ({
  type: REMOVE_FROM_FAVORITE,
  payload: itemId,
});
