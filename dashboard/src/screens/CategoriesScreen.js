import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/Categories/MainCategories";

const CategoriesScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        
        <MainCategories />
      </main>
    </>
  );
};

export default CategoriesScreen;
