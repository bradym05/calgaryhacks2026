"use client";

import { useState, useEffect} from 'react';

const RatingQuestion = ({ onChange, questionInfo }) => {
  const [sliderValue, setSliderValue] = useState(5);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);
    onChange && onChange(newValue);
  };

  const percent = ((sliderValue - 1) / 9) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 text-center">
        <label htmlFor="slider" className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-4 text-center">
          {questionInfo?.question || "Rate from 1 to 10:"}
        </label>

        <div className="relative flex flex-col items-center">
          <input
            type="range"
            id="slider"
            min="1"
            max="10"
            value={sliderValue}
            onChange={handleSliderChange}
            className="rating-slider mx-auto w-11/12 h-4 md:h-5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
            }}
          />

          <div className="mt-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {sliderValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingQuestion;