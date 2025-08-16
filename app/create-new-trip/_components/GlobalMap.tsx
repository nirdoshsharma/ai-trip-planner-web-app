import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./Chatbox";

const GlobalMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 1.7,
      projection: "globe",
    });

    // ✅ Save map instance to ref
    mapRef.current = map;

    if (tripDetailInfo) {
      tripDetailInfo.itinerary.forEach((itinerary: Itinerary) => {
        itinerary.activities.forEach((activity: Activity) => {
          if (
            activity?.geo_coordinates.longitude &&
            activity?.geo_coordinates.latitude
          ) {
            new mapboxgl.Marker({ color: "red" })
              .setLngLat([
                activity.geo_coordinates.longitude,
                activity.geo_coordinates.latitude,
              ])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
              )
              .addTo(map);

            const coordinates: [number, number] = [
              activity.geo_coordinates.longitude,
              activity.geo_coordinates.latitude,
            ];

            // ✅ Now this works because mapRef.current is set
            //@ts-ignore
            mapRef.current.flyTo({
              center: coordinates,
              zoom: 10,
              essential: true,
            });
          }
        });
      });
    }

    // cleanup
    return () => {
      map.remove();
      mapRef.current = null; // reset
    };
  }, [tripDetailInfo]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{
          width: "95%",
          height: "85vh",
          borderRadius: 20,
        }}
      ></div>
    </div>
  );
};

export default GlobalMap;
