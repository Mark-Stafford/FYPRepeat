import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import HouseScreen from "./screens/houseScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddHouse from "./screens/AddHouse";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import HouseEditScreen from "./screens/HouseEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listHouses } from "./Redux/Actions/HouseActions";
import { listOrders } from "./Redux/Actions/OrderActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listHouses());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/houses" component={HouseScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addhouse" component={AddHouse} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter
            path="/house/:id/edit"
            component={HouseEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
