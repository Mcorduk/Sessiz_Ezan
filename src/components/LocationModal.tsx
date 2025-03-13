import { useState } from "react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCity: (city: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  setCity,
}: LocationModalProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (location.trim() !== "") {
      setCity(location);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className=" p-6 home-modal rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Enter Location</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
