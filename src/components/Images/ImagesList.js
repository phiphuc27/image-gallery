import React, { useState, useEffect } from 'react';

import './ImagesList.css';

import ImageCard from './ImageCard';

function ImagesList({ images, observer, setSelectedImage }) {
  const [width, setWidth] = useState(window.innerWidth || 0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  let colNum = 3;
  if (width <= 1250) colNum = 2;
  if (width <= 825) colNum = 1;

  return (
    <div className='images'>
      {Array(colNum)
        .fill(null)
        .map((val, arrIndex) => {
          return (
            <div className='images-column' key={arrIndex}>
              {images
                .filter((image, index) => index % colNum === arrIndex)
                .map((image, filterIndex, filterArr) => {
                  if (filterIndex === filterArr.length * 0.8 - 1 && arrIndex === colNum - 1) {
                    return (
                      <ImageCard
                        key={image.id}
                        image={image}
                        observer={observer}
                        setSelectedImage={setSelectedImage}
                      />
                    );
                  }
                  return (
                    <ImageCard key={image.id} image={image} setSelectedImage={setSelectedImage} />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default ImagesList;
