export const metadata = {
  title: "Partial Eclipse Collection - Nisho",
  description: "From the partial eclipse of Jupiter's moon, Ganymede",
};

import Navbar from "../../../components/navbar";
import { Courier_Prime } from "next/font/google";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <div className={courierPrime.className}>
      <div className="w-full h-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
