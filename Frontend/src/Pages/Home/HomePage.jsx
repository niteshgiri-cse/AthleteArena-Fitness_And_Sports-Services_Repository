import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import athleteImg from "../../assets/landingPage.png";
import Navbar from "../../components/layout/Navbar";

const slides = [
  {
    title: "TOP SCORER TO THE FINAL",
    highlight: "MATCH",
    desc: "The EuroLeague Finals Top Scorer is the individual award presented to the player who scores the highest points in the final match of the season.",
  },
  {
    title: "CHAMPIONS LEAGUE",
    highlight: "WINNER",
    desc: "The championship title was secured after an intense final match filled with passion, determination, and world-class performance.",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen">

      <Navbar />

      <div className="w-full h-[calc(100vh-64px)] overflow-hidden">

        <div
          className="relative w-full h-full flex items-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${athleteImg})`,
          }}
        >

          <div className="absolute inset-0 bg-black/20 backdrop-brightness-75" />

          <div className="relative z-10 text-white px-6 md:px-20 max-w-3xl transition-all duration-500">

            <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-6 tracking-wide">
              {slides[current].title}{" "}
              <span className="text-blue-400">
                {slides[current].highlight}
              </span>
            </h2>

            <div className="w-20 h-1 bg-blue-500 mb-6 rounded-full" />

            <p className="text-base md:text-lg mb-10 text-gray-200 leading-relaxed">
              {slides[current].desc}
            </p>

            <NavLink
              to="/auth"
              className="inline-block px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full hover:scale-105 transition"
            >
              Get Started →
            </NavLink>

          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">

            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-1 rounded-full cursor-pointer ${
                  current === index
                    ? "h-14 bg-white"
                    : "h-6 bg-gray-400"
                }`}
              />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}