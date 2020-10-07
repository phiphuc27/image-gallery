import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';

import Navigation from './components/Navigation';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFetchImages from './hooks/useFetchImages';
import ImagesList from './components/Images/ImagesList';
import ImageModal from './components/Images/ImageModal';

function App() {
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setURL] = useState('/photos');
  const [params, setParams] = useState({ per_page: 30 });

  useEffect(() => {
    setParams((prevParams) => {
      return { ...prevParams, page };
    });
  }, [page]);

  const { response: images, error, loading, hasMore, totalSearch } = useFetchImages(
    url,
    JSON.stringify(params)
  );

  const observerRef = useRef();
  const observerBorder = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      if (node !== null) {
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
            observerRef.current.unobserve(entries[0].target);
          }
        });
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className='app'>
      <Navigation setURL={setURL} setParams={setParams} />
      <Container className='app-container' maxWidth='lg'>
        {params.query && <h1 className='search-text'>{params.query}</h1>}
        {error && <h1>There is something wrong...</h1>}
        {totalSearch === 0 && <h1>No Image Found!</h1>}
        {images && (
          <ImagesList
            images={images}
            observer={observerBorder}
            setSelectedImage={setSelectedImage}
          />
        )}
        {loading && <CircularProgress style={{ color: 'black' }} />}
      </Container>
      {selectedImage && (
        <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      )}
    </div>
  );
}

export default App;
