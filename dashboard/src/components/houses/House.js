import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteHouse } from "../../Redux/Actions/HouseActions";

const House = (props) => {
  const { house } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteHouse(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-house-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={house.image} alt="House" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {house.name}
            </Link>
            <div className="price mb-2">${house.price}</div>
            <div className="row">
              <Link
                to={`/house/${house._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(house._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default House;
