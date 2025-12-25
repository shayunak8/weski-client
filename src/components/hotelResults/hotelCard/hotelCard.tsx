import { FC, SyntheticEvent, useMemo } from 'react';
import { Hotel } from '../../../types/hotel.types';
import './hotelCard.scss';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  const stars = useMemo(() => Array.from({ length: hotel.stars }, (_, i) => i), [hotel.stars]);

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
          <div className="hotel-rating" aria-label={`${hotel.stars} star${hotel.stars !== 1 ? 's' : ''} rating`}>
            {stars.map((index) => (
              <span key={index} className="star">★</span>
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

