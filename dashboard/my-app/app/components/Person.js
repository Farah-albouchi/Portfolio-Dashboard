import { useState } from "react";
import { Button } from "@/components/ui/button";

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button onClick={toggleOpen} className="bg-customblue hover:bg-customBlue2">
          {isOpen ? "Hide" : "Show"}
        </Button>
      </div>
      {isOpen && (
        <div className="transition-all duration-500 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
