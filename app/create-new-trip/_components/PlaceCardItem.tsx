"use client";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLinkIcon, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Activity } from "./Chatbox";
import axios from "axios";

type Props = {
  activity: Activity;
};

const PlaceCardItem = ({ activity }: Props) => {
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: activity?.place_name + ":" + activity?.place_address,
    });
    if (result?.data?.e) {
      return;
    }
    setPhotoUrl(result?.data);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-[200px]">
        <Image
          src={photoUrl || "/globe.svg"}
          alt={activity.place_name}
          fill
          className="object-cover rounded-xl shadow mb-2"
        />
      </div>

      <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
      <p className="text-gray-400 line-clamp-2">{activity?.place_details}</p>

      <h2 className="flex gap-2 items-center text-blue-500">
        <Ticket />
        {activity?.ticket_pricing}
      </h2>

      <p className="flex text-orange-400 gap-2 line-clamp-1">
        <Clock />
        {activity?.best_time_to_visit}
      </p>

      <Link
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          activity?.place_name
        }
        target="_blank"
      >
        <Button size={"sm"} variant={"outline"} className="w-full mt-2">
          View
          <ExternalLinkIcon />
        </Button>
      </Link>
    </div>
  );
};

export default PlaceCardItem;
