import { FC } from "react";
import './searchButton.scss';

interface SearchButtonProps {
    onClick?: () => void;
}

const SearchButton: FC<SearchButtonProps> = ({onClick}) => {
    return (
        <button type="button" className="search-button" onClick={onClick}>
            Search
        </button>
    );
};

export default SearchButton;

