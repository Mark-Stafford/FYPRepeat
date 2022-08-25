import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditHouseMain from "../components/houses/EdithouseMain";

const HouseEditScreen = ({ match }) => {
  const houseId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        
        <EditHouseMain houseId={houseId} />
      </main>
    </>
  );
};
export default HouseEditScreen;
