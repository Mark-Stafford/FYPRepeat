import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editHouse,
  updateHouse,
} from "../../Redux/Actions/HouseActions";
import { HOUSE_UPDATE_RESET } from "../../Redux/Constants/HouseConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditHouseMain = (props) => {
  const { houseId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const houseEdit = useSelector((state) => state.houseEdit);
  const { loading, error, house } = houseEdit;

  const houseUpdate = useSelector((state) => state.houseUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = houseUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: HOUSE_UPDATE_RESET });
      toast.success("House Updated", ToastObjects);
    } else {
      if (!house.name || house._id !== houseId) {
        dispatch(editHouse(houseId));
      } else {
        setName(house.name);
        setDescription(house.description);
        setCountInStock(house.countInStock);
        setImage(house.image);
        setPrice(house.price);
      }
    }
  }, [house, dispatch, houseId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateHouse({
        _id: houseId,
        name,
        price,
        description,
        image,
        countInStock,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/houses" className="btn btn-danger text-white">
              Go to houses
            </Link>
            <h2 className="content-title">Update House</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="house_title" className="form-label">
                          House title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="house_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="house_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="house_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="house_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="house_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditHouseMain;
