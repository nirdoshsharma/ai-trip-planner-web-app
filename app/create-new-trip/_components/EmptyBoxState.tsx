import { suggestionList } from "@/app/_components/Hero";
import React from "react";

const EmptyBoxState = ({ onselectOption }: any) => {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-3xl text-center">
        Start Planning new <strong className="text-primary">trip</strong> using
        AI
      </h2>
      <p className="text-center text-muted-foreground mt-2 ">
        Ask anything about your next destination, stay, budget, or itinerary. AI
        will help you plan a perfect trip!
      </p>

      <div className="flex flex-col gap-5 mt-8">
        {suggestionList.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary"
            onClick={() => onselectOption(suggestion.title)}
          >
            {suggestion.icon}
            <h2 className="text-lg">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyBoxState;
