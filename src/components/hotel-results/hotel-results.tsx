import { FC } from 'react';
import { Hotel } from '../../types/hotel.types';
import HotelCard from './hotel-card/hotel-card';
import './hotel-results.scss';

interface HotelResultsProps {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const HotelResults: FC<HotelResultsProps> = ({ hotels, loading, error }) => {
  if (error) {
    return (
      <div className="hotel-results error">
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  if (loading && hotels.length === 0) {
    return (
      <div className="hotel-results loading">
        <p>Searching for hotels...</p>
      </div>
    );
  }

  if (hotels.length === 0 && !loading) {
    return (
      <div className="hotel-results empty">
        <p>No hotels found for your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="hotel-results">
      {loading && hotels.length > 0 && (
        <div className="loading-indicator">
          <p>Loading more results...</p>
        </div>
      )}
      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelResults;

