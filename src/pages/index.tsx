import { NextPage } from "next";
import React from "react";

const HomePage: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl my-8">HITCH HIKE YOUR TRIP PLANNING</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;