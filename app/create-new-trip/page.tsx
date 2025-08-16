"use client";
import React, { useState } from "react";
import Chatbox from "./_components/Chatbox";
import Itinerary from "./_components/Itinerary";
import GlobalMap from "./_components/GlobalMap";
import { Globe, Globe2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreateNewTrip = () => {
  const [activeIndex, setActiveindex] = useState(1);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      <div>
        <Chatbox />
      </div>
      <div className="col-span-2 relative">
        {activeIndex === 0 ? <Itinerary /> : <GlobalMap />}
        <Tooltip>
          <TooltipTrigger className="absolute bottom-10 left-[50%] bg-black  rounded-2xl">
            {" "}
            <Button
              onClick={() => setActiveindex(activeIndex == 0 ? 1 : 0)}
              size={"lg"}
              className="bg-black hover:bg-gray-800"
            >
              {activeIndex === 0 ? <Plane /> : <Globe2 />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Switch between Map and Trip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default CreateNewTrip;
