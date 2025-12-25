import { FC, useState } from "react";
import "./search-form.scss";
import ResortsSelect from "./resorts-select/resorts-select";
import GuestsSelect from "./guests-select/guests-select";
import SearchButton from "./search-button/search-button";
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { SearchParams } from '../../types/hotel.types';
import { formatDate } from '../../utils/date.utils';
import { validateSearchForm, ValidationErrors } from '../../utils/validation.utils';

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
}

const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
    const [skiSiteId, setSkiSiteId] = useState<number>(1);
    const [groupSize, setGroupSize] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date | null>(dayjs().toDate());
    const [endDate, setEndDate] = useState<Date | null>(dayjs().add(7, 'days').toDate());
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleSearch = () => {
        const validationErrors = validateSearchForm({
            skiSiteId,
            groupSize,
            startDate,
            endDate,
        });

        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const params: SearchParams = {
            ski_site: skiSiteId,
            from_date: formatDate(startDate),
            to_date: formatDate(endDate),
            group_size: groupSize,
        };

        onSearch(params);
    };

    return (
        <div className="search-form">
            <div className="form-field">
                <ResortsSelect value={skiSiteId} onChange={skiSiteId => setSkiSiteId(skiSiteId)} />
                {errors.skiSite && <span className="error-text">{errors.skiSite}</span>}
            </div>
            
            <div className="form-field">
                <GuestsSelect value={groupSize} onChange={groupSize => setGroupSize(groupSize)} />
                {errors.groupSize && <span className="error-text">{errors.groupSize}</span>}
            </div>
            
            <div className="form-field">
                <DatePicker 
                    className="search-form-date-picker" 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    enableTabLoop={false}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Start date"
                    
                />
                {errors.startDate && <span className="error-text">{errors.startDate}</span>}
            </div>
            
            <div className="form-field">
                <DatePicker 
                    className="search-form-date-picker" 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                    enableTabLoop={false}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="End date"
                    minDate={startDate || new Date()}
                />
                {errors.endDate && <span className="error-text">{errors.endDate}</span>}
            </div>

            {errors.dates && <span className="error-text">{errors.dates}</span>}

            <SearchButton onClick={handleSearch} />
        </div>
    );
}

export default SearchForm;