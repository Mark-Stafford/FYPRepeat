import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listHouse } from "../../Redux/Actions/HouseActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const houseList = useSelector((state) => state.houseList);
  const { loading, error, houses, page, pages } = houseList;

  useEffect(() => {
    dispatch(listHouse(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {houses.map((house) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={house._id}
                      >
                        <div className="border-house">
                          <Link to={`/houses/${house._id}`}>
                            <div className="shopBack">
                              <img src={house.image} alt={house.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/houses/${house._id}`}>
                                {house.name}
                              </Link>
                            </p>

                            <Rating
                              value={house.rating}
                              text={`${house.numReviews} reviews`}
                            />
                            <h3>€{house.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
