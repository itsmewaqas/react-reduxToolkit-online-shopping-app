import React, { useState, useEffect } from 'react';
import {
  Routes,
  useLocation,
  Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import OuterDashboard from './components/OuterDashboard.jsx'
import Login from './outerRoutes/Login.jsx';
import InnerDashboard from './components/InnerDashboard.jsx';
import Home from './innerRoutes/Home.jsx';
import Drag from './innerRoutes/Drag.jsx';
import Products from './innerRoutes/Products.jsx';
import ProductDetails from './innerRoutes/ProductDetails.jsx';
import Users from './innerRoutes/Users.jsx';
import Checkout from './innerRoutes/Checkout.jsx';
import NoMatch from './NoMatch.jsx';

function Routers(props) {

  const { loginDetail } = useSelector((state) => state);
  console.log('get loginDetail', loginDetail);

  // const [auth, Setauth] = useState(
  //   { email: 'm.waqas@test.com', password: 'waqas123' }
  // );

  useEffect(() => {
  }, [])

  return (
    <div>
      <Routes>
        {loginDetail.isAuth == false ? 
          <Route path="/" element={<OuterDashboard />}>
            <Route exact path="/" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          :
          <Route path="/" element={<InnerDashboard />}>
            <Route exact path="/" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Drag" element={<Drag />} />
            <Route path="Products" element={<Products />} />
            <Route path="ProductDetails" element={<ProductDetails />} />
            <Route path="Users" element={<Users />} />
            <Route path="Checkout" element={<Checkout />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        }
      </Routes>
    </div>
  );
}

export default Routers;
