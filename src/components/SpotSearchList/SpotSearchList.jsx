import React, { useState, useEffect } from 'react';
import SpotCard from './SpotCard';
import useMapSpotStore from '../../store/useMapSpotStore';
import Input from '../commons/Input';
import useSpots from '../../Hooks/spots/useSpots';
import useConditionalSpotRoutes from '../../Hooks/routes/useConditionalSpotRoutes';

const SpotSearchList = ({ region }) => {
  const setMarkers = useMapSpotStore((state) => state.setMarkers);
  const setRoutes = useMapSpotStore((state) => state.setRoutes);
  const setSelectedRouteIndex = useMapSpotStore(
    (state) => state.setSelectedRouteIndex,
  );
  const setOpenItems = useMapSpotStore((state) => state.setOpenItems);
  const setClickedSpotName = useMapSpotStore(
    (state) => state.setClickedSpotName,
  );
  const setCenter = useMapSpotStore((state) => state.setCenter);

  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const {
    spots: initialSpots = [],
    error: initialError,
    loading: initialLoading,
  } = useSpots(region);
  const {
    spots: searchedSpots = [],
    error: searchError,
    loading: searchLoading,
  } = useSpots(region, searchLocation);
  const {
    responseData: routes = [],
    error: routeError,
    loading: routeLoading,
  } = useConditionalSpotRoutes(selectedSpotId);

  useEffect(() => {
    if (routes.length > 0) {
      const routeMarkers = routes.flatMap((route) =>
        route.spots.map((spot) => ({
          latitude: spot.lat,
          longitude: spot.lng,
          name: spot.location,
        })),
      );
      setMarkers(routeMarkers);
      setRoutes(routes);
      setCenter({
        latitude: routeMarkers[0].latitude,
        longitude: routeMarkers[0].longitude,
      });
    } else if (selectedSpotId) {
      const spot = initialSpots.find((spot) => spot.id === selectedSpotId);
      if (spot) {
        setMarkers([
          { latitude: spot.lat, longitude: spot.lng, name: spot.location },
        ]);
        setCenter({ latitude: spot.lat, longitude: spot.lng });
      }
    }
  }, [routes, setMarkers, setRoutes, setCenter, selectedSpotId, initialSpots]);

  const handleSpotClick = (spot) => {
    setSelectedSpotId(spot.id);
    setClickedSpotName(spot.location);
    setSelectedRouteIndex(routes.length > 0 ? 0 : null);
    setCenter({
      latitude: spot.lat,
      longitude: spot.lng,
    });
    setOpenItems([]);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchLocation(searchInput);
  };

  return (
    <form
      className="relative flex-col justify-center h-full"
      onSubmit={handleSearch}
    >
      <div className="pt-4 pb-4 pl-3 flex">
        <Input
          variant="searchInput"
          placeholder="여행지를 검색해보세요!"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full h-auto">
        {initialLoading && <p>초기 장소를 불러오는 중...</p>}
        {initialError && (
          <p>초기 장소를 불러오는 중 오류 발생: {initialError}</p>
        )}
        {searchLoading && <p>검색 결과를 불러오는 중...</p>}
        {searchError && <p>{searchError}</p>}
        {(searchLocation ? searchedSpots : initialSpots).length > 0
          ? (searchLocation ? searchedSpots : initialSpots).map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                isSelected={selectedSpotId === spot.id}
                onClick={() => handleSpotClick(spot)}
              />
            ))
          : !searchLoading && <p>검색 결과가 없습니다.</p>}
      </div>
    </form>
  );
};

export default SpotSearchList;
