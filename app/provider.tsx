"use client";
import React, { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import {
  TripContextType,
  TripDetailContext,
} from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/Chatbox";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);
  const CreateNewUser = async () => {
    //save new user if not exist
    if (user) {
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageurl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      setUserDetail(result);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useTripDetail = (): TripContextType | undefined => {
  return useContext(TripDetailContext);
};
