"use client";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import {
  ArrowLeft,
  Clock,
  ExternalLinkIcon,
  Star,
  Ticket,
  Timer,
  Wallet,
} from "lucide-react";
import { div } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/provider";
import { TripInfo } from "./Chatbox";

// const TRIP_DATA = {
//   destination: "Vaishno Devi",
//   duration: "5 days",
//   origin: "Shimla",
//   budget: "Luxury",
//   group_size: "2",

//   hotels: [
//     {
//       hotel_name: "Radisson Blu MBD Hotel, Katra",
//       hotel_address: "Kanachak, Katra, Jammu and Kashmir 182320, India",
//       price_per_night: "INR 10,000 - 15,000",
//       hotel_image_url:
//         "https://www.radissonhotelsamericas.com/en-us/hotels/radisson-blu-hotel-mbd-katra-jammu/media/images/1-exterior-view",
//       geo_coordinates: {
//         latitude: 32.9874,
//         longitude: 74.6117,
//       },
//       rating: 4.5,
//       description:
//         "A luxury hotel offering a comfortable stay with modern amenities, perfect for couples visiting Vaishno Devi.",
//     },
//     {
//       hotel_name: "Hotel Asia Vaishno Devi",
//       hotel_address: "Near Bhawan, Katra, Jammu and Kashmir 182320, India",
//       price_per_night: "INR 8,000 - 12,000",
//       hotel_image_url:
//         "https://www.hotelasiavaishnodevi.com/images/hotel_01.jpg",
//       geo_coordinates: {
//         latitude: 32.986,
//         longitude: 74.61,
//       },
//       rating: 4.4,
//       description:
//         "A renowned luxury hotel close to the shrine with deluxe rooms and excellent hospitality.",
//     },
//     {
//       hotel_name: "Madhuban Vanvilas",
//       hotel_address: "Katra, Jammu and Kashmir 182320, India",
//       price_per_night: "INR 12,000 - 18,000",
//       hotel_image_url: "https://www.madhubanvanvilas.com/images/hotel.jpg",
//       geo_coordinates: {
//         latitude: 32.988,
//         longitude: 74.612,
//       },
//       rating: 4.6,
//       description:
//         "Experience high-end luxury and beautiful views with exclusive rooms and wellness facilities.",
//     },
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan:
//         "Travel from Shimla to Katra and check-in at the hotel. Relax and prepare for the pilgrimage.",
//       best_time_to_visit_day: "Morning to Evening",
//       activities: [
//         {
//           place_name: "Travel from Shimla to Katra",
//           place_details:
//             "Drive approx. 6-7 hours to Katra, the base camp for Vaishno Devi pilgrimage.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shimla_Hill_1.jpg/1200px-Shimla_Hill_1.jpg",
//           geo_coordinates: {
//             latitude: 31.1048,
//             longitude: 77.1734,
//           },
//           place_address: "Shimla to Katra Route",
//           ticket_pricing: "N/A",
//           time_travel_each_location: "6-7 hours",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Hotel check-in and relaxation",
//           place_details:
//             "Check in at your chosen luxury hotel in Katra and unwind.",
//           place_image_url:
//             "https://www.radissonhotelsamericas.com/en-us/hotels/radisson-blu-hotel-mbd-katra-jammu/media/images/1-exterior-view",
//           geo_coordinates: {
//             latitude: 32.9874,
//             longitude: 74.6117,
//           },
//           place_address: "Katra",
//           ticket_pricing: "N/A",
//           time_travel_each_location: "N/A",
//           best_time_to_visit: "Afternoon",
//         },
//       ],
//     },
//     {
//       day: 2,
//       day_plan:
//         "Pilgrimage to Vaishno Devi shrine and exploring the sacred area.",
//       best_time_to_visit_day: "Early Morning",
//       activities: [
//         {
//           place_name: "Vaishno Devi Temple",
//           place_details:
//             "A famous Hindu shrine nestled in the Trikuta Mountains. The trek is about 12 km from Katra.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/7/7d/Vaishno_Devi_Shrine.jpg",
//           geo_coordinates: {
//             latitude: 33.1304,
//             longitude: 74.9405,
//           },
//           place_address: "Vaishno Devi Shrine, Jammu and Kashmir, India",
//           ticket_pricing: "Free entry, donation optional",
//           time_travel_each_location: "6-7 hours for trek and darshan",
//           best_time_to_visit: "Early Morning to avoid crowds and heat",
//         },
//         {
//           place_name: "Trikuta Hills scenic photography",
//           place_details:
//             "Capture beautiful mountain and temple views during the trek.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/9/9a/Trikuta_Mountains_View.jpg",
//           geo_coordinates: {
//             latitude: 33.1304,
//             longitude: 74.9405,
//           },
//           place_address: "Trikuta Mountains, Jammu and Kashmir",
//           ticket_pricing: "N/A",
//           time_travel_each_location: "N/A",
//           best_time_to_visit: "Morning",
//         },
//       ],
//     },
//     {
//       day: 3,
//       day_plan:
//         "Relax at the hotel and enjoy a luxury spa day followed by local sightseeing in Katra.",
//       best_time_to_visit_day: "Morning to Evening",
//       activities: [
//         {
//           place_name: "Luxury Spa at Hotel",
//           place_details:
//             "Rejuvenate with wellness treatments and massages offered in your luxury hotel.",
//           place_image_url:
//             "https://cdn.pixabay.com/photo/2017/08/01/00/30/massage-2562337_1280.jpg",
//           geo_coordinates: {
//             latitude: 32.9874,
//             longitude: 74.6117,
//           },
//           place_address: "Hotel Spa, Katra",
//           ticket_pricing: "INR 3,000 - 5,000 per session",
//           time_travel_each_location: "N/A",
//           best_time_to_visit: "Morning to Afternoon",
//         },
//         {
//           place_name: "Local Markets in Katra",
//           place_details:
//             "Explore local handicrafts and food stalls in the evening.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/d/d3/Katra_Market.JPG",
//           geo_coordinates: {
//             latitude: 32.985,
//             longitude: 74.61,
//           },
//           place_address: "Main Market, Katra",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "1-2 hours",
//           best_time_to_visit: "Evening/night for nightlife experience",
//         },
//       ],
//     },
//     {
//       day: 4,
//       day_plan: "Visit Shiv Khori cave shrine and explore local nature spots.",
//       best_time_to_visit_day: "Morning",
//       activities: [
//         {
//           place_name: "Shiv Khori",
//           place_details:
//             "A sacred cave shrine dedicated to Lord Shiva located around 45 km from Katra, with beautiful natural surroundings.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/7/7a/Shiv_Khori_Cave.jpg",
//           geo_coordinates: {
//             latitude: 33.0916,
//             longitude: 74.6461,
//           },
//           place_address: "Shiv Khori Cave, Reasi, Jammu and Kashmir, India",
//           ticket_pricing: "Free entry",
//           time_travel_each_location: "2-3 hours including travel",
//           best_time_to_visit: "Morning",
//         },
//         {
//           place_name: "Nighttime Leisure at Katra",
//           place_details:
//             "Enjoy dining at fine restaurants and explore nightlife options in Katra.",
//           place_image_url:
//             "https://cdn.pixabay.com/photo/2017/05/06/17/02/party-2297924_1280.jpg",
//           geo_coordinates: {
//             latitude: 32.985,
//             longitude: 74.61,
//           },
//           place_address: "Katra Town",
//           ticket_pricing: "Varies based on venue",
//           time_travel_each_location: "Evening",
//           best_time_to_visit: "Night",
//         },
//       ],
//     },
//     {
//       day: 5,
//       day_plan: "Return to Shimla with scenic stops and leisure breaks.",
//       best_time_to_visit_day: "Morning to Afternoon",
//       activities: [
//         {
//           place_name: "Drive back to Shimla",
//           place_details:
//             "Enjoy scenic views on the drive back to Shimla with stops for refreshment and photos.",
//           place_image_url:
//             "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Shimla_Hill_road.jpg/1024px-Shimla_Hill_road.jpg",
//           geo_coordinates: {
//             latitude: 31.1048,
//             longitude: 77.1734,
//           },
//           place_address: "Katra to Shimla Route",
//           ticket_pricing: "N/A",
//           time_travel_each_location: "6-7 hours",
//           best_time_to_visit: "Morning",
//         },
//       ],
//     },
//   ],
// };

const Itinerary = () => {
  //@ts-ignore
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);
  const data = tripData
    ? [
        {
          title: "Recommended Hotels",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel} />
              ))}
            </div>
          ),
        },
        ...tripData.itinerary.map((dayData) => ({
          title: `Day ${dayData.day}`,
          content: (
            <div className="">
              <p>Best Time : {dayData.best_time_to_visit_day}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dayData.activities.map((activity, index) => (
                  <PlaceCardItem key={index} activity={activity} />
                ))}
              </div>
            </div>
          ),
        })),
      ]
    : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {/* @ts-ignore */}
      {tripData ? (
        <Timeline data={data} tripData={tripData} />
      ) : (
        <div>
          <h2 className="flex gap-2 text-3xl text-white left-35 items-center absolute bottom-25">
            {" "}
            <ArrowLeft />
            Getting to know you to build perfect trip here...
          </h2>
          <Image
            src={"/travel.png"}
            alt="travel"
            width={800}
            height={800}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
};

export default Itinerary;
