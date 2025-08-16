import { PricingTable } from "@clerk/nextjs";
import { div } from "motion/react-client";
import React from "react";

const Pricing = () => {
  return (
    <div className="mt-20">
      <h2 className="font-bold text-3xl my-5 text-center">
        AI-Powrered Trip Planning , Pick your plan
      </h2>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable />
      </div>
    </div>
  );
};

export default Pricing;
