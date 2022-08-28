import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createHouseReview,
  listHouseDetails,
} from "../Redux/Actions/HouseActions";
import Loading from "../components/LoadingError/Loading";
import { HOUSE_CREATE_REVIEW_RESET } from "../Redux/Constants/HouseConstants";
import moment from "moment";

const SingleHouse = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const houseId = match.params.id;
  const dispatch = useDispatch();

  const houseDetails = useSelector((state) => state.houseDetails);
  const { loading, error, house } = houseDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const houseReviewCreate = useSelector((state) => state.houseReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = houseReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: HOUSE_CREATE_REVIEW_RESET });
    }
    dispatch(listHouseDetails(houseId));
  }, [dispatch, houseId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${houseId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createHouseReview(houseId, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />
      <div className="container single-house">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={house.image} alt={house.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="house-dtl">
                  <div className="house-info">
                    <div className="house-name">{house.name}</div>
                  </div>
                  <p class ="description">{house.description}</p>

                  <div className="house-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>€{house.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {house.countInStock > 0 ? (
                        <span>Rooms Available</span>
                      ) : (
                        <span>unavailable</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={house.rating}
                        text={`${house.numReviews} reviews`}
                      />
                    </div>
                    {house.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Rooms</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(house.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Book Now
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {house.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>No Reviews</Message>
                )}
                {house.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>WRITE A CUSTOMER REVIEW</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Please{" "}
                      <Link to="/login">
                        " <strong>Login</strong> "
                      </Link>{" "}
                      to write a review{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleHouse;
