// export interface ITabBarProps {}
import { Menu } from "lucide-react";
import { Search } from "lucide-react";
import { MapPinned } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import LocationModal from "./LocationModal";

interface ITabBarProps {
  setCity: (city: string) => void;
}

export default function TabBar({ setCity }: ITabBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className=" absolute w-full h-[100px] bottom-0 left-0 flex items-center">
      <img
        className="rounded-3xl z-3 absolute"
        src="/src/assets/images/TabBar.png"
        alt=""
      />
      <div className="z-4 flex justify-between items-end w-full p-7">
        <MapPinned color="white" size={48} className="z-4" />
        <Button
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
          }}
        >
          <Search color="white" size={48} className="z-4 mb-3" />
        </Button>
        <Menu color="white" size={48} className="z-4" />
      </div>
      <LocationModal
        onClose={() => {
          setIsSearchOpen(false);
        }}
        isOpen={isSearchOpen}
        setCity={setCity}
      />
    </div>
  );
}
