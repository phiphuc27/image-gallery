/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './ImageCard.css';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GetAppIcon from '@material-ui/icons/GetApp';

import ButtonGroup from '../formElements/ButtonGroup';
import Button from '../formElements/Button';

function ImageCard({ image, observer, setSelectedImage }) {
  const [like, setLike] = useState(false);

  const downloadImage = () => {
    console.log('click');
    window.open(image.urls.full, '_blank');
  };

  return (
    <article className='image'>
      <img
        ref={observer}
        src={image.urls.regular}
        alt={image.alt_description}
        onClick={() => setSelectedImage(image)}
      />
      <div className='image__info'>
        <p className='image__user'>
          <img src={image.user.profile_image.small} alt={image.user.name} />
          <span>{image.user.name}</span>
        </p>
        <ButtonGroup className='image__actions'>
          <Button
            className={`image__like ${like ? 'liked' : ''}`}
            title='Like photo'
            onClick={() => setLike((prevLike) => !prevLike)}
          >
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
          <Button className='image__download' onClick={downloadImage} title='Download photo'>
            <GetAppIcon />
          </Button>
        </ButtonGroup>
      </div>
    </article>
  );
}

export default ImageCard;
