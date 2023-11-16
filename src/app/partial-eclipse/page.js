"use client";
import React from "react";
import CatalogLayout from "../../../components/catalogLayout";
import itemsData from "../../../components/ITEMS_DATA.json";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const metadata = itemsData;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState("left");

  const handleLeftArrowClick = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const handleRightArrowClick = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : 1));
  };

  return (
    <div className="bg-[#FFFEF8] flex items-center overflow-hidden">
      <div className="left-0 top-1/2 pl-5" onClick={handleLeftArrowClick}>
        {arrowLeft}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex} // Use key to trigger a re-render and animate the change
          initial={{ x: direction === "left" ? -200 : 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "left" ? 200 : -200, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="w-[90%]"
        >
          <CatalogLayout props={metadata[currentIndex]} />
        </motion.div>
      </AnimatePresence>
      <div className="right-0 top-1/2 pr-5" onClick={handleRightArrowClick}>
        {arrowRight}
      </div>
    </div>
  );
}

const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <path
      d="M39.0625 9.375L23.4375 25L39.0625 40.625"
      stroke="black"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <line
      y1="-1.5"
      x2="37.5"
      y2="-1.5"
      transform="matrix(0 -1 -1 0 2.08337 43.75)"
      stroke="black"
      stroke-width="3"
    />
  </svg>
);

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <path
      d="M10.9375 9.375L26.5625 25L10.9375 40.625"
      stroke="black"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <line
      x1="46.4167"
      y1="43.75"
      x2="46.4167"
      y2="6.25"
      stroke="black"
      stroke-width="3"
    />
  </svg>
);
