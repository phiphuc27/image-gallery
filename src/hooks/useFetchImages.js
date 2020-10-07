import { useContext, useEffect } from 'react';
import axios from 'axios';
import { PhotoContext } from '../context';

const ACCESS_KEY = '8b9bbfda1af3df00cb2ba7cffd3eb34c06d4b0ac82e0b5595792d97c3ccd70c3';

const imageAPI = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

function useFetchImages(url, params = null) {
  const { state, dispatch } = useContext(PhotoContext);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: 'MAKE_REQUEST' });
    imageAPI
      .get(url, {
        params: JSON.parse(params),
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        dispatch({
          type: 'GET_DATA',
          payload: {
            response: url === '/search/photos' ? res.data.results : res.data,
            hasMore: res.data.length !== 0,
            totalSearch: url === '/search/photos' ? res.data.total : -1,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: 'ERROR', payload: { error: err.data } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [url, params, dispatch]);

  return state;
}

export default useFetchImages;
