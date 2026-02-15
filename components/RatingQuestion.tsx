"use client";

import { useState, useEffect} from 'react';
import type { QuestionProps } from "@/types/questions"

const RatingQuestion = ({question, response, setResponse}: QuestionProps) => {
  const [sliderValue, setSliderValue] = useState(5);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSliderValue(newValue);
    setResponse && setResponse(newValue.toString());
  };

  const percent = ((sliderValue - 1) / 9) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 text-center">
        <label htmlFor="slider" className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-4 text-center">
          {question || "Rate from 1 to 10:"}
        </label>

        <div className="relative flex flex-col items-center">
          <input
            type="range"
            id="slider"
            min="1"
            max="10"
            value={sliderValue}
            onChange={handleSliderChange}
            className="rating-slider mx-auto w-11/12 h-4 md:h-5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#8aa66e]"
            style={{
              background: `linear-gradient(to right, #8aa66e 0%, #8aa66e ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
            }}
          />

          <div className="mt-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {sliderValue + " out of 10"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingQuestion;