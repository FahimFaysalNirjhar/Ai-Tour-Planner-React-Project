import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 mt-16 gap-9">
      <h1 className="text-[50px] font-extrabold text-center">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <div>
        <Link to="/create-trip">
          <Button className="p-5">Get Started, It's Free</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
