import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddHouseMain from "../components/houses/AddHouseMain";

const AddHouse = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        
        <AddHouseMain />
      </main>
    </>
  );
};

export default AddHouse;
