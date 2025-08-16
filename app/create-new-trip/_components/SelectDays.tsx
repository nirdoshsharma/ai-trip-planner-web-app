import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type SelectDaysProps = {
  onSelectedOption: (value: string) => void;
};

const SelectDays = ({ onSelectedOption }: SelectDaysProps) => {
  const [days, setDays] = useState(1);

  const increment = () => setDays((prev) => prev + 1);
  const decrement = () => setDays((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Notify parent AFTER state is updated and rendered
  useEffect(() => {
    onSelectedOption(`${days} days`);
  }, [days]);

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button variant="outline" onClick={decrement}>
        -
      </Button>
      <div className="text-xl font-semibold">
        {days} day{days > 1 && "s"}
      </div>
      <Button variant="outline" onClick={increment}>
        +
      </Button>
    </div>
  );
};

export default SelectDays;
