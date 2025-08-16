"use client";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

export const suggestionList = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Inspire me Where to go",
    icon: <Plane className="text-green-500 h-5 w-5" />,
  },
  {
    title: "Discover Hidden Gems",
    icon: <Landmark className="text-orange-400 h-5 w-5" />,
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 h-5 w-5" />,
  },
];

const Hero = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const onSend = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    // Navigate to create trip planner web screen
    router.push("create-new-trip");
  };
  return (
    <div className="mt-24 w-full flex justify-center">
      {/* conternt */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I'm your personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
          planner - all in seconds
        </p>
        {/* input-box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="Create a trip for Paris to New York"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none "
            />
            <Button
              size={"icon"}
              className="absolute bottom-6 right-6"
              onClick={onSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* suggesionlist */}
        <div className="flex gap-5">
          {suggestionList.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestion.icon}
              <h2 className="text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-centre flex-col">
          <h2 className="my-7 mt-14 flex gap-2 text-centre">
            Not Sure where to start?{" "}
            <strong>
              See how it works <ArrowDown />
            </strong>
          </h2>
          {/* video section  */}
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="http://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
