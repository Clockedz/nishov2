"use client";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick() {
    setIsOpen((oV) => !oV);
  }

  return (
    <main className="flex flex-row w-screen h-screen justify-between">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full h-full bg-white overflow-hidden absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 50 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
              }}
              className="font-OriginBold text-black tracking-[2.5px] absolute top-0"
            >
              <h1 className="text-[250px] z-40">// COLLECTONS</h1>
            </motion.div>
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 50 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
              }}
              className="font-OriginBold text-black tracking-[2.5px] absolute top-0"
            >
              <h1 className="stroked text-[250px] ml-3 mt-2 text-white">
                // COLLECTONS
              </h1>
            </motion.div>
            <motion.div
              className="flex absolute bottom-0 right-0 text-black pr-20 flex-wrap flex-row-reverse pb-20"
              initial={{ x: 2000 }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96], // Custom ease-in-out curve
              }}
            >
              <Link href={"/partial-eclipse"}>
                <div className="relative flex items-end flex-col">
                  <h1 className="font-OriginBold text-[250px] max-h-min">
                    <span className="font-Origin text-[250px]">//</span> PARTIAL
                    ECLIPSE
                  </h1>
                  <p className="right-0 font-keifont text-[#4A4A4A] tracking-[7px] text-[35px] -mt-32">
                    ぶぶんにっしょく
                  </p>
                </div>
              </Link>

              <Link href={"/ganymede"}>
                <div className="relative flex items-end flex-col">
                  <h1 className="font-OriginBold text-[250px] max-h-min">
                    <span className="font-Origin text-[250px]">//</span>{" "}
                    GANYMEDE
                  </h1>
                  <p className="right-0 font-keifont text-[#4A4A4A] tracking-[7px] text-[35px] -mt-32">
                    ガニメデ
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              className="absolute right-0 top-0 pt-5 pr-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.2, ease: "easeInOut" }}
              onClick={handleClick}
            >
              {cross}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <>
          <div className="flex flex-col justify-between h-full ml-10 pb-10">
            <h3 className="font-Origin text-[50px] tracking-[2.5px]">NISHO</h3>
            <section className="flex flex-col">
              <div
                className="flex flex-col justify-center cursor-default"
                onClick={handleClick}
              >
                <h1 className="font-Hikou text-[4.5rem] tracking-[.75px]">
                  SHOP
                </h1>
                <h3 className="font-keifont text-[#909090] text-xl tracking-[3px] -mt-4">
                  ショップ
                </h3>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-Hikou text-[4.5rem] tracking-[.75px]">
                  ABOUT
                </h1>
                <h3 className="font-keifont text-[#909090] text-xl tracking-[3px] -mt-4">
                  アバウト
                </h3>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-Hikou text-[4.5rem] tracking-[.75px]">
                  CONTACT
                </h1>
                <h3 className="font-keifont text-[#909090] text-xl tracking-[3px] -mt-4">
                  コンタクト
                </h3>
              </div>
            </section>
          </div>
          <div className="font-Origin flex flex-col justify-center items-center">
            <h1 className=" text-[12.5rem]">
              UTMOST <span className="text-[#FFDC62]">COMFORTABLE</span>
            </h1>
            <h1 className="text-[12.5rem]">
              CLOTHES <span className="underline">BUILT</span> FOR A
            </h1>
            <h1 className="font-OriginBold text-[12.5rem]">COSMIC ODYSSEY</h1>
          </div>
          <div className="flex flex-col-reverse pb-10 mr-10">
            <p className="font-Vancouver text-xl">
              BASE OF OPERATIONS - GANYMEDE, JUPITER
            </p>
          </div>
        </>
      )}
    </main>
  );
}

const cross = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="75"
    height="75"
    viewBox="0 0 75 75"
    fill="none"
  >
    <path
      d="M18.75 56.25L56.25 18.75M18.75 18.75L56.25 56.25"
      stroke="black"
      stroke-width="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
