import { FC, Suspense, lazy } from "react";
import "./nav-bar.scss";
import WeSkiLogo from "../weski-logo/weski-logo";
import { useHotelSearch } from "../../hooks/useHotelSearch";

const SearchForm = lazy(() => import("../search-form/search-form"));
const HotelResults = lazy(() => import("../hotel-results/hotel-results"));

const NavBar: FC = () => {
    const { hotels, loading, error, searchHotels } = useHotelSearch();

    return (
        <>
            <div className="nav-bar">
                <WeSkiLogo />
                <Suspense fallback={<div>Loading search form...</div>}>
                    <SearchForm onSearch={searchHotels} />
                </Suspense>
            </div>
            <Suspense fallback={<div>Loading results...</div>}>
                <HotelResults hotels={hotels} loading={loading} error={error} />
            </Suspense>
        </>
    );
}

export default NavBar;