import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <h1> Browse Student Accomodation </h1>
      <br></br>
      <br></br>
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <ContactInfo />
      
    </div>
  );
};

export default HomeScreen;
