"use client";
import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import productData from "./ITEMS_DATA.json";

const frown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#2b2b2b"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
    />
  </svg>
);

const removeItem = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#2b2b2b"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

function imageMatcher(product) {
  const isMobile =
    typeof window !== "undefined" &&
    (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth <= 768);

  for (let i = 0; i < productData.length; i++) {
    if (productData[i].header === product) {
      if (isMobile) {
        return (
          <Image
            src={productData[i].images.closeup}
            height={200}
            width={200}
            alt="product"
            className="rounded-[.75rem]"
            draggable="false"
          />
        );
      }
      return (
        <Image
          src={productData[i].images.closeup}
          height={110}
          width={110}
          alt="product"
          className="nav-product w-fit h-fit"
        />
      );
    }
  }
  return <p>Error 404</p>;
}

function subtotal() {
  const existingItemsJSON = Cookies.get("items");
  const existingItems = existingItemsJSON
    ? JSON.parse(existingItemsJSON)
    : false;

  let total = 0;

  for (let i = 0; i < existingItems.length; i++) {
    total += existingItems[i].price;
  }
  return total;
}

function handleCheckout() {
  const existingItemsJSON = Cookies.get("items");
  const existingItems = existingItemsJSON
    ? JSON.parse(existingItemsJSON)
    : false;

  if (existingItems.length) {
    // Create an object to store product occurrences
    const productOccurrences = {};

    // Count the occurrences of each product
    existingItems.forEach((item) => {
      const productId = item.productID;
      productOccurrences[productId] = (productOccurrences[productId] || 0) + 1;
    });

    // Convert the object to a string in the desired format
    let resultString = "";
    for (const productId in productOccurrences) {
      const count = productOccurrences[productId];
      resultString += `${productId}:${count},`;
    }

    // Remove the trailing comma
    resultString = resultString.slice(0, -1);

    // window.location.href = "https://8e35e6.myshopify.com/cart/" + resultString;
    window.open("https://8e35e6.myshopify.com/cart/" + resultString, "_blank");
  }
}

function removeFromCart(index) {
  const existingItemsJSON = Cookies.get("items");
  const existingItems = existingItemsJSON ? JSON.parse(existingItemsJSON) : [];

  if (index >= 0 && index < existingItems.length) {
    existingItems.splice(index, 1); // Remove the item at the specified index
    Cookies.set("items", JSON.stringify(existingItems)); // Update the cookies
    window.location.reload();
  }
}

export default function CartMenu() {
  const existingItemsJSON = Cookies.get("items");
  const [existingItems, setExistingItems] = React.useState(
    existingItemsJSON ? JSON.parse(existingItemsJSON) : []
  );

  function handleClick(index) {
    removeFromCart(index);
  }

  function getCartItemsWithQuantity() {
    const cartItems = existingItems.map((item) => ({ ...item, quantity: 1 }));
    const itemsWithQuantity = [];

    cartItems.forEach((item) => {
      const existingItem = itemsWithQuantity.find(
        (cartItem) =>
          cartItem.product === item.product && cartItem.size === item.size
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        itemsWithQuantity.push(item);
      }
    });

    return itemsWithQuantity;
  }

  const cartItemsWithQuantity = getCartItemsWithQuantity();

  return (
    <div className="w-full h-screen font-brixton bg-white -mt-5 font-Hikou">
      {cartItemsWithQuantity.length > 0 ? (
        <div>
          <ul className="scrollable-list w-full max-h-[75vh] overflow-y-auto gap-5 flex flex-col">
            {cartItemsWithQuantity.map((item, index) => (
              <li key={index} className="scrollable-item w-full text-gray-500">
                <section className="w-full h-52 flex items-center justify-evenly gap-5 text-lg p-4 ">
                  {imageMatcher(item.product)}
                  <div className="flex flex-col items-start gap-2 text-sm md:text-large">
                    <p>{item.product}</p>
                    <section className="flex flex-row gap-3 md:gap-5">
                      <p>${item.price}</p>

                      <p className="flex text-gray-400 max-w-fit whitespace-nowrap">
                        SIZE: {item.size}
                      </p>
                      <p className="whitespace-nowrap">QTY: {item.quantity}</p>
                    </section>
                  </div>
                  <div className="" onClick={() => handleClick(index)}>
                    {removeItem}
                  </div>
                </section>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-10 flex flex-col w-full h-1/5 items-center gap-5">
            <div className="w-full h-8 bg-thisGray"></div>
            <div className="w-3/4 flex justify-between border-b-2 border-gray-500 text-xl">
              <p>Subtotal:</p>
              <p>${subtotal()}</p>
            </div>

            <section className="flex flex-col items-center text-gray-500">
              <p className="text-sm lg:text-large">
                *SHIPPING RATE AND TAX NOT INCLUDED*
              </p>
              <p>*PLEASE WASH BEFORE USE*</p>
            </section>
            <button
              className="bg-thisGray text-thisWhite w-3/4 h-4/5"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="relative h-full">
          <p className="flex flex-wrap p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Your cart is empty {frown}
          </p>
        </div>
      )}
    </div>
  );
}
