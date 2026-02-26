import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import { getCityDistribution } from "../analytics/analyticsUtils";
import { useEmployeeList } from "../list/useEmployeeList";
import { CITY_COORDINATES } from "./cityCoordinates";

import styles from "./EmployeeMap.module.css";

import EmployeeMapSkeleton from "./EmployeeMapSkeleton";

function FitBounds({ cityData }) {
  const map = useMap();

  useEffect(() => {
    if (!cityData || cityData.length === 0) return;

    const bounds = [];

    cityData.forEach((city) => {
      const coords = CITY_COORDINATES[city.city];
      if (coords) bounds.push(coords);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 5);
    } else if (bounds.length > 1) {
      const isMobile = window.innerWidth < 768;

      map.fitBounds(bounds, {
        padding: isMobile ? [120, 120] : [60, 60],
      });
    }
  }, [cityData, map]);

  return null;
}

function FlyToMarker({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;

    const zoomLevel = 5;

    const offsetLng = coords[1] - 5;
    const adjustedCoords = [coords[0], offsetLng];

    map.flyTo(adjustedCoords, zoomLevel, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [coords, map]);

  return null;
}

function EmployeeMap() {
  const { data: employees, isLoading, error } = useEmployeeList();
  const [selectedCoords, setSelectedCoords] = useState(null);

  const cityData = useMemo(() => {
    if (!employees) return [];
    return getCityDistribution(employees);
  }, [employees]);

  if (isLoading) return <EmployeeMapSkeleton />;

  if (error) return <p>Failed to load map.</p>;

  if (!cityData.length) return <p>No location data available</p>;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section className={styles.mapPage}>
      <div className={styles.mapWrapper}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={!isMobile}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={!isMobile}
          className={styles.map}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds cityData={cityData} />

          <FlyToMarker coords={selectedCoords} />

          {cityData.map((city) => {
            const coords = CITY_COORDINATES[city.city];
            if (!coords) return null;

            return (
              <CircleMarker
                key={city.city}
                center={coords}
                radius={Math.sqrt(city.count) * 4}
                pathOptions={{
                  color: "#F97316",
                  fillColor: "#F97316",
                  fillOpacity: 0.5,
                  weight: 2,
                }}
                eventHandlers={{
                  click: (e) => {
                    setSelectedCoords(coords);

                    const path = e.originalEvent?.target;
                    if (path && typeof path.blur === "function") {
                      path.blur();
                    }
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  {city.city}
                </Tooltip>

                <Popup>
                  <strong>{city.city}</strong>
                  <br />
                  {city.count} employees
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}

export default EmployeeMap;
