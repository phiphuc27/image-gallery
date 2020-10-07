import React, { useState } from 'react';
import './ImageModal.css';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GetAppIcon from '@material-ui/icons/GetApp';

import ButtonGroup from '../formElements/ButtonGroup';
import Button from '../formElements/Button';

function ImageModal({ selectedImage, setSelectedImage }) {
  const handleClick = (e) => {
    if (e.target.className === 'backdrop') {
      setSelectedImage(null);
    }
  };

  const [like, setLike] = useState(false);

  const downloadImage = () => {
    window.open(selectedImage.urls.full, '_blank');
  };

  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='modal-container'>
        <div className='modal__info'>
          <p className='image__user'>
            <img src={selectedImage.user.profile_image.small} alt={selectedImage.user.name} />
            <span>{selectedImage.user.name}</span>
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
        <div className='modal__image'>
          <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
