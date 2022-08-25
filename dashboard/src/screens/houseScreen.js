import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainHouses from "../components/houses/MainHouses";

const HouseScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        
        <MainHouses />
      </main>
    </>
  );
};

export default HouseScreen;
