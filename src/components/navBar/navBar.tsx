import { FC, Suspense, lazy } from "react";
import "./navBar.scss";
import WeSkiLogo from "../weskiLogo/weskiLogo";
import { useHotelSearch } from "../../hooks/useHotelSearch";

const SearchForm = lazy(() => import("../searchForm/searchForm"));
const HotelResults = lazy(() => import("../hotelResults/hotelResults"));

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

