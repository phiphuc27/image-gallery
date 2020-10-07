import React, { useReducer } from 'react';

const initialState = {
  response: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_REQUEST':
      return { ...state, loading: true };
    case 'GET_DATA':
      return {
        ...state,
        loading: false,
        response: [...state.response, ...action.payload.response],
        hasMore: action.payload.hasMore,
        totalSearch: action.payload.totalSearch,
      };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload.error, response: [] };
    case 'CLEAR_DATA':
      return { response: [] };
    default:
      return state;
  }
};

const PhotoContext = React.createContext(initialState);

function PhotoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <PhotoContext.Provider value={{ state, dispatch }}>{children}</PhotoContext.Provider>;
}

export { PhotoContext, PhotoProvider };
