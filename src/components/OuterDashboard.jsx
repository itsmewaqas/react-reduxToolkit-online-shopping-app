import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

function OuterDashboard(props) {

  return (
    <div>
        <Outlet />
    </div>
  );
}

export default OuterDashboard;