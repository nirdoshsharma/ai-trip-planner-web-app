import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trip } from "../page";
import axios from "axios";
import Link from "next/link";

type Props = {
  trip: Trip;
};
const MyTripCardItem = ({ trip }: Props) => {
  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    trip && GetGooglePlaceDetail();
  }, [trip]);

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: trip?.tripDetail?.destination,
    });
    if (result?.data?.e) {
      return;
    }
    setPhotoUrl(result?.data);
  };

  return (
    <Link
      href={"/view-trip/" + trip?.tripId}
      className="p-5 shadow rounded-2xl"
    >
      <Image
        src={photoUrl ? photoUrl : "/placeholder.png"}
        alt="image"
        height={400}
        width={400}
        className="rounded-xl object-cover w-full h-[270px]"
      />
      <h2 className="flex items-center gap-3 font-semibold text-xl mt-2">
        {trip?.tripDetail?.destination}
        <ArrowBigRight />
        {trip?.tripDetail?.origin}
      </h2>
      <h2 className="mt-2 text-gray-500">
        {trip?.tripDetail?.duration} Trip With {trip?.tripDetail?.budget} Budget
      </h2>
    </Link>
  );
};

export default MyTripCardItem;
