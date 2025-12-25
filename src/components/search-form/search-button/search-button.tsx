import { FC } from "react";
import './search-button.scss';

interface Props {
    onClick?: () => void;
}

const SearchButton: FC<Props> = ({onClick}) => {
    return (
        <button className="search-button" onClick={onClick}>
            Search
        </button>
    );
}

export default SearchButton;