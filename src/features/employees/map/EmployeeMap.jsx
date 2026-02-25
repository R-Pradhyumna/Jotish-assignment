import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
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
    const bounds = [];

    cityData.forEach((city) => {
      const coords = CITY_COORDINATES[city.city];
      if (coords) bounds.push(coords);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 5);
    }

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [cityData, map]);

  return null;
}

function EmployeeMap() {
  const { data: employees, isLoading, error } = useEmployeeList();

  const cityData = useMemo(() => getCityDistribution(employees), [employees]);

  if (!cityData || cityData.length === 0)
    return <p>No location data available</p>;

  if (isLoading) return <EmployeeMapSkeleton />;

  if (error) return <p>Failed to load map.</p>;

  return (
    <section className={styles.container}>
      <h2>Employee Locations</h2>

      <div className={styles.mapWrapper}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={false}
          style={{ height: "550px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds cityData={cityData} />

          {cityData.map((city) => {
            const coords = CITY_COORDINATES[city.city];
            if (!coords) return null;

            return (
              <CircleMarker
                key={city.city}
                center={coords}
                radius={6 + city.count * 1.5}
                pathOptions={{
                  color: "#F97316",
                  fillColor: "#F97316",
                  fillOpacity: 0.5,
                  weight: 2,
                }}
              >
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
