import { TripInfo } from "@/app/create-new-trip/_components/Chatbox";
import { query } from "@/convex/_generated/server";
import { v } from "convex/values";
import { createContext } from "react";

export type TripContextType = {
  tripDetailInfo: TripInfo | null;
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
};
export const TripDetailContext = createContext<TripContextType | undefined>(
  undefined
);
