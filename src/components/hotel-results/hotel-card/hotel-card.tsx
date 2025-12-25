import { FC, SyntheticEvent } from 'react';
import { Hotel } from '../../../types/hotel.types';
import './hotel-card.scss';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div className="hotel-card">
      <div className="hotel-image">
        {hotel.images && hotel.images.length > 0 ? (
          <img src={hotel.images[0]} alt={hotel.name} onError={handleImageError} />
        ) : (
          <div className="no-image-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        <div className="hotel-details">
          <div className="hotel-rating">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <span key={i} className="star">★</span>
            ))}
          </div>
          <div className="hotel-location">{hotel.location}</div>
        </div>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="hotel-amenities">
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className="amenity-tag">
                {amenity}
              </span>
            ))}
          </div>
        )}
        <div className="hotel-footer">
          <div className="hotel-capacity">
            <span>
              For {hotel.group_size} {hotel.group_size === 1 ? 'person' : 'people'}
            </span>
          </div>
          <div className="hotel-price">
            <span className="price-amount">€{hotel.price.toFixed(2)}</span>
            <span className="price-label">per night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

