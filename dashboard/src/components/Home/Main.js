import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import HousesStatistics from "./HousesStatistics";
import { useSelector } from "react-redux";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const houseList = useSelector((state) => state.houseList);
  const { houses } = houseList;
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} houses={houses} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <HousesStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
