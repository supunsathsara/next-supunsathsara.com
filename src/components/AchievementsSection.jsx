"use client";
import React, { useEffect, useRef, useState } from "react";

const achievementsList = [
  {
    metric: "Projects",
    value: "50",
    postfix: "+",
  },
  {
    prefix: "~",
    metric: "Clients",
    value: "100,000",
  },
  {
    metric: "Years",
    value: "3",
  },
];


function AnimatedNumber({ number, duration, threshold = 0 }) {
  const numberRef = useRef(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold, // Set the threshold to 0 to trigger animation when any part of the element enters the viewport
    });

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, [numberRef, threshold]);

  useEffect(() => {
    if (isIntersecting) {
      const interval = setInterval(() => {
        if (currentNumber < number) {
          setCurrentNumber((prevNumber) => prevNumber + 1);
        } else {
          clearInterval(interval);
        }
      }, duration / number);

      return () => clearInterval(interval);
    }
  }, [isIntersecting, number, duration, currentNumber]);

  return (
    <span ref={numberRef}>{currentNumber}</span>
  );
}

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumber
                  number={parseInt(achievement.value)}
                  duration={1000}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
