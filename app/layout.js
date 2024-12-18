import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surround by the beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
      </head>
      <body
        className={`${josefin.className} flex min-h-screen flex-col bg-primary-950 text-primary-100`}
      >
        <Analytics />
        <Header />

        <div className="grid flex-grow px-8">
          <main className="mx-auto w-full max-w-7xl py-8">
            {/* provider is a client while children is server as the children is already rendered */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
