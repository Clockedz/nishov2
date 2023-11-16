"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { Courier_Prime } from "next/font/google";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function CatalogLayout({ props }) {
  const [itemCount, setItemCount] = React.useState(null);
  const [bought, setBought] = React.useState(false);
  const [sizeModal, setSizeModal] = React.useState(false);
  const [isShirt, setIsShirt] = React.useState(true);

  const [items, setItems] = React.useState([
    {
      product: "",
      size: "",
      price: "",
      baseID: "",
      productID: "",
    },
  ]);

  const sizeOptions = React.useMemo(() => {
    return {
      1: "S",
      2: "M",
      3: "L",
      4: "XL",
      5: "2XL",
    };
  }, []);
  const [size, setSize] = React.useState(1);

  function handleSize(direction) {
    if (direction === "up") {
      if (size < 5) {
        setSize(size + 1);
      }
    } else if (direction === "down") {
      if (size > 1) {
        setSize(size - 1);
      }
    }
  }
  React.useEffect(() => {
    if (document.body.style.backgroundColor === "black") {
      document.body.style.backgroundColor = "##FFFEF8";
    }
    if (props.header.toLowerCase().includes("tee")) {
      setIsShirt(true);
    } else {
      setIsShirt(false);
    }
  }, [props.header]);

  React.useEffect(() => {
    const x = props.header.toLowerCase();
    setItems([
      {
        product: props.header,
        size: sizeOptions[size],
        price:
          sizeOptions[size] == 5 && x.includes("jacket")
            ? props.price2XL
            : props.price,
        baseID: props.shopifyIDs.base,
        productID: props.shopifyIDs[sizeOptions[size]],
      },
    ]);
  }, [
    size,
    sizeOptions,
    props.header,
    props.price,
    props.price2XL,
    props.shopifyIDs,
  ]);

  function handleCart() {
    const existingItemsJSON = Cookies.get("items");
    const existingItems = existingItemsJSON
      ? JSON.parse(existingItemsJSON)
      : [];

    if (items[0].size) {
      const updatedItems = [
        ...existingItems,
        {
          product: props.header,
          size: sizeOptions[size],
          price:
            sizeOptions[size] == 5 && x.includes("jacket")
              ? props.price2XL
              : props.price,
          baseID: props.shopifyIDs.base,
          productID: props.shopifyIDs[sizeOptions[size]],
        },
      ];

      const updatedItemsJSON = JSON.stringify(updatedItems);
      Cookies.set("items", updatedItemsJSON, { expires: 30 });
      console.log(updatedItemsJSON);

      setBought(true);

      setTimeout(() => {
        setBought(false);
      }, 1000);
    }
  }

  function handleSizeModal() {
    setSizeModal((oV) => !oV);
  }

  function handleOverlayClick() {
    setSizeModal(false);
  }

  return (
    <div className="w-screen h-screen bg-[#FFFEF8] flex items-center justify-center">
      <AnimatePresence>
        {sizeModal && (
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                margin: "auto",
                zIndex: 100,
              }}
              className="w-1/2 h-1/2 fixed bg-white text-black flex flex-col items-center justify-center gap-10 rounded-lg"
            >
              <h1>SIZE GUIDE</h1>
              {isShirt ? shirtSize : jacketSize}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="w-[10%]"></div>
      <div className="w-1/5 h-full font-DELIRIUM text-black flex flex-col justify-center -ml-20 leading-[8.5rem] gap-5">
        <h1 className="text-[125px] tracking-[3.75px]">{props.header}</h1>
        <h3 className="text-[75px] -mt-10 tracking-[2.25px]">${props.price}</h3>
      </div>
      <div className=" w-1/2 h-full flex flex-row items-center gap-10">
        <Image
          src={props.images.front}
          height={600}
          width={600}
          alt="product"
          className="main-image"
        />

        <div className="w-1/5 h-full flex flex-col items-center justify-center">
          <Image
            src={props.images.back}
            height={500}
            width={500}
            alt="product"
          />
          <Image
            src={props.images.closeup}
            height={500}
            width={500}
            alt="product"
          />
        </div>
      </div>
      <div className="w-1/4 h-full text-black flex flex-col justify-center">
        <h2 className="font-Origin text-[75px] tracking-[1.5px] flex flex-wrap w-2/3">
          {props.subtitle}
        </h2>
        <section className="w-[50%] flex items-baseline justify-between">
          <div className="flex gap-2 justify-evenly">
            <h3 className="font-DELIRIUM text-[75px] w-12">
              {sizeOptions[size]}
            </h3>
            <section className="flex flex-col items-center gap-3 justify-center -mt-2">
              <div onClick={() => handleSize("up")}>{arrowUp}</div>
              <div onClick={() => handleSize("down")}>{arrowDown}</div>
            </section>
          </div>
          <h3
            className="font-Origin text-[50px] text-[#434343] underline"
            onClick={handleSizeModal}
          >
            SIZE GUIDE
          </h3>
        </section>
        <div className="font-Hikou text-[15px] text-black flex flex-col gap-10 w-fit pb-12">
          <p className="whitespace-normal break-words w-[60%]">
            {props.descriptions.main}
          </p>
          <div>
            <p>{props.descriptions.head1}</p>
            <p>{props.descriptions.head2}</p>
            <p>{props.descriptions.head3}</p>
            <p className="w-[60%]">{props.descriptions.head4}</p>
          </div>
        </div>
        <button
          className="cart-button w-1/2 h-[5%] border-[3.5px] border-black bg-[#FFFEF8] flex items-center justify-center font-Origin"
          onClick={handleCart}
        >
          <p className="tracking-[2.1px] text-4xl mt-1">ADD TO CART</p>
        </button>
      </div>
    </div>
  );
}

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.5 5.25L12 12.75L4.5 5.25"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="3" y1="21.5" x2="21" y2="21.5" stroke="black" strokeWidth="3" />
  </svg>
);

const arrowUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4.5 18.75L12 11.25L19.5 18.75"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="21" y1="2.5" x2="3" y2="2.5" stroke="black" strokeWidth="3" />
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

const shirtSize = (
  <div className="flex flex-row 2xl:gap-8 gap-3 text-2xl items-center justify-center pr-5 pl-5">
    <section className="flex flex-col gap-4">
      <p>SIZE:</p>
      <p>CHEST (INCHES)</p>
      <p>LENGTH (INCHES)</p>
      <p>SLEEVE LENGTH (INCHES)</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>S</p>
      <p>31-34</p>
      <p>27 ¼</p>
      <p>8 ⅛</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>M</p>
      <p>35-38</p>
      <p>28 ¼</p>
      <p>8 ½</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>L</p>
      <p>39-41</p>
      <p>29 ⅛</p>
      <p>8 ⅞</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>XL</p>
      <p>42-45</p>
      <p>29 ⅞</p>
      <p>8 ⅞</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>XXL</p>
      <p>46-48</p>
      <p>30 ¾</p>
      <p>9 ¼</p>
    </section>
  </div>
);

const jacketSize = (
  <div className="flex flex-row 2xl:gap-8 gap-3 text-2xl items-center justify-center pr-5 pl-5">
    <section className="flex flex-col gap-4">
      <p>SIZE:</p>
      <p>WIDTH (INCHES)</p>
      <p>LENGTH (INCHES)</p>
      <p>SLEEVE LENGTH (INCHES)</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>S</p>
      <p>19½</p>
      <p>26</p>
      <p>24 ½</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>M</p>
      <p>21 ½</p>
      <p>26 ½</p>
      <p>24 ¾</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>L</p>
      <p>23 ½</p>
      <p>27</p>
      <p>25</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>XL</p>
      <p>25 ½</p>
      <p>27 ½</p>
      <p>25 ¼</p>
    </section>
    <section className="flex flex-col items-center gap-4">
      <p>XXL</p>
      <p>27</p>
      <p>28</p>
      <p>25 ½</p>
    </section>
  </div>
);
