"use client";
import React from "react";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center text-black flex-col gap-10">
      <h1 className="font-Hikou text-[100px]">NEED SUPPORT?</h1>
      <h3 className="text-4xl">nisho.business@gmail.com</h3>
      <div className="flex justify-center flex-col items-center gap-3">
        <h2 className="font-Hikou text-[50px]">
          for any business inquiries and customer support
        </h2>
        <p className="text-xl">*usually responds within 24hrs*</p>
      </div>
    </div>
  );
}
