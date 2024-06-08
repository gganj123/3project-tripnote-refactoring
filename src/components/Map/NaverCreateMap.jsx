import React, { useState, useEffect, useRef } from 'react';
import useMapStore from '../../store/useMapStore';
import {
  loadNaverMapScript,
  updateMarkers,
  updatePolylines,
} from './naverMapHelpers';

export default function NaverCreateMap({ className }) {
  const mapRef = useRef(null);
  const [naverMap, setNaverMap] = useState(null);
  const markers = useMapStore((state) => state.markers);
  const setMarkers = useMapStore((state) => state.setMarkers);
  const center = useMapStore((state) => state.center);

  useEffect(() => {
    const cleanup = loadNaverMapScript(() => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(center.latitude, center.longitude),
        zoom: 12,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      setNaverMap(map);

      window.naver.maps.Event.addListener(map, 'click', (e) => {
        const newMarker = {
          latitude: e.coord.lat(),
          longitude: e.coord.lng(),
          id: Date.now(),
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      });
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (naverMap) {
      updateMarkers(naverMap, markers);
      updatePolylines(naverMap, markers);

      if (center) {
        const newCenter = new window.naver.maps.LatLng(
          center.latitude,
          center.longitude,
        );
        naverMap.setCenter(newCenter);
      }
    }
  }, [markers, center]);

  return <div id="map" className={`h-auto ${className}`} ref={mapRef}></div>;
}
