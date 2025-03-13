import { useState, useEffect } from "react";

const ThemeToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isChecked) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isChecked]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="text-end mr-5 mt-5 absolute top-0 right-0">
      <label className="switch">
        <input
          id="toggle"
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
      <div className="slide-block"></div>
      {/* Add your custom styles here */}
    </div>
  );
};

export default ThemeToggleSwitch;
