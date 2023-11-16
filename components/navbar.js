"use client";
import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import CartMenu from "./cartMenu";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleNavClick() {
    setIsNavOpen((oV) => !oV);
  }

  function handleClick() {
    setIsOpen((oV) => !oV);
  }

  function handleOverlayClick() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const existingItemsJSON = Cookies.get("items");

      const existingItems = existingItemsJSON
        ? JSON.parse(existingItemsJSON)
        : [];
      setItemCount(existingItems.length);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="">
      <AnimatePresence>
        {isNavOpen && (
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
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="font-OriginBold text-black tracking-[2.5px] absolute top-0"
            >
              <h1 className="text-[250px] z-40">
                <span>/</span>
                <span>/</span> COLLECTONS
              </h1>
            </motion.div>
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 50 }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="font-OriginBold text-black tracking-[2.5px] absolute top-0"
            >
              <h1 className="stroked text-[250px] ml-3 mt-2 text-white">
                <span>/</span>
                <span>/</span> COLLECTONS
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
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <Link href={"/partial-eclipse"}>
                <div className="relative flex items-end flex-col">
                  <h1 className="font-OriginBold text-[250px] max-h-min">
                    <span className="font-Origin text-[250px]">
                      <span>/</span>
                      <span>/</span>
                    </span>
                    PARTIAL ECLIPSE
                  </h1>
                  <p className="right-0 font-keifont text-[#4A4A4A] tracking-[7px] text-[35px] -mt-32">
                    ぶぶんにっしょく
                  </p>
                </div>
              </Link>

              <Link href={"/ganymede"}>
                <div className="relative flex items-end flex-col">
                  <h1 className="font-OriginBold text-[250px] max-h-min">
                    <span className="font-Origin text-[250px]">
                      <span>/</span>
                      <span>/</span>
                    </span>
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
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={handleNavClick}
            >
              {cross}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isNavOpen && (
        <nav className="main-nav w-screen absolute top-0 flex flex-row justify-between items-center text-black pr-8 pl-8 pt-8">
          <div
            className="font-OriginBold flex text-[125px] cursor-pointer left-0"
            onClick={handleNavClick}
          >
            <p>
              <span>/</span>
              <span>/</span>
            </p>
            <p className="stroked ml-2 mt-1 absolute">
              <span>/</span>
              <span>/</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-7">
            <Link href={"/about"}>
              <p className="font-Hikou text-xl text-black">ABOUT</p>
            </Link>

            <Link href={"/"}>
              <h1 className="font-Origin text-5xl tracking-[2.5px]">NISHO</h1>
            </Link>
            <Link href={"/contact"}>
              <p className="font-Hikou text-xl text-black">CONTACT</p>
            </Link>
          </div>

          <div className="w-min">
            <div className="relative mt-5">
              {itemCount > 0 && (
                <span className="bg-black rounded-full w-7 h-7 -mt-1 absolute right-0 flex items-center justify-center text-white">
                  {itemCount}
                </span>
              )}
            </div>
            <div onClick={handleClick}>{cart}</div>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    onClick={handleOverlayClick}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.8)",
                      zIndex: 99,
                    }}
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 350 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 350 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    style={{
                      position: "fixed",
                      bottom: 0,
                      right: 0,
                      margin: "auto",
                      zIndex: 100,
                    }}
                    className="fixed w-3/4 md:w-1/3 h-full bg-thisWhite text-thisGray"
                  >
                    <div
                      onClick={handleClick}
                      className="h-fit w-fit absolute top-0 right-0 z-50"
                    >
                      {exit}
                    </div>

                    <section className="flex w-full h-full">
                      <CartMenu />
                    </section>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </nav>
      )}
    </div>
  );
}

const cart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <path
      d="M4.6875 6.25H7.575C8.6375 6.25 9.56458 6.96458 9.83958 7.98958L10.6375 10.9833M10.6375 10.9833C22.243 10.6581 33.8374 11.9482 45.0875 14.8167C43.3708 19.9292 41.3313 24.8958 38.9958 29.6875H15.625M10.6375 10.9833L15.625 29.6875M15.625 29.6875C13.9674 29.6875 12.3777 30.346 11.2056 31.5181C10.0335 32.6902 9.375 34.2799 9.375 35.9375H42.1875M12.5 42.1875C12.5 42.6019 12.3354 42.9993 12.0424 43.2924C11.7493 43.5854 11.3519 43.75 10.9375 43.75C10.5231 43.75 10.1257 43.5854 9.83265 43.2924C9.53962 42.9993 9.375 42.6019 9.375 42.1875C9.375 41.7731 9.53962 41.3757 9.83265 41.0826C10.1257 40.7896 10.5231 40.625 10.9375 40.625C11.3519 40.625 11.7493 40.7896 12.0424 41.0826C12.3354 41.3757 12.5 41.7731 12.5 42.1875ZM39.0625 42.1875C39.0625 42.6019 38.8979 42.9993 38.6049 43.2924C38.3118 43.5854 37.9144 43.75 37.5 43.75C37.0856 43.75 36.6882 43.5854 36.3951 43.2924C36.1021 42.9993 35.9375 42.6019 35.9375 42.1875C35.9375 41.7731 36.1021 41.3757 36.3951 41.0826C36.6882 40.7896 37.0856 40.625 37.5 40.625C37.9144 40.625 38.3118 40.7896 38.6049 41.0826C38.8979 41.3757 39.0625 41.7731 39.0625 42.1875Z"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const exit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#2b2b2b"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
