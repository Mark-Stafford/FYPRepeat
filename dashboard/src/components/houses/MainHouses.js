import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import House from "./House";
import { useDispatch, useSelector } from "react-redux";
import { listHouses } from "../../Redux/Actions/HouseActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainHouses = () => {
  const dispatch = useDispatch();

  const houseList = useSelector((state) => state.houseList);
  const { loading, error, houses } = houseList;

  const houseDelete = useSelector((state) => state.houseDelete);
  const { error: errorDelete, success: successDelete } = houseDelete;

  useEffect(() => {
    dispatch(listHouses());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Houses</h2>
        <div>
          <Link to="/addhouse" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Houses */}
              {houses.map((house) => (
                <House house={house} key={house._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
                
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
                
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainHouses;
