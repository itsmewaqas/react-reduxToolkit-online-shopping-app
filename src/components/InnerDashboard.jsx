import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import DashHeader from '../components/DashHeader';
import DashSidebar from '../components/DashSidebar';
import DashFooter from '../components/DashFooter';
import { useDispatch, useSelector } from 'react-redux';

function InnerDashboard(props) {

  const data = useSelector((state) => state);

  const [sidebarCtrl, sidebarCtrlSet] = useState("dSidebar");
  const [titleCtrl, titleCtrlSet] = useState("titleShow");
  const [dashContainer, SetdashContainer] = useState("dContainer");

  const sidebarCtrlFunc = () => {
    sidebarCtrlSet(sidebarCtrl == 'dSidebar' ? 'dSidebarCollaps' : 'dSidebar');
    titleCtrlSet(titleCtrl == 'titleShow' ? 'titleHide' : 'titleShow');
    SetdashContainer(dashContainer == 'dContainer' ? 'dContainerCollaps' : 'dContainer');
  }

  useEffect(() => {
  }, [])

  return (
    <div className={`dMain`}>
      <DashHeader
        sidebarCtrlFunc={sidebarCtrlFunc}
        titleCtrl={titleCtrl} />
      <DashSidebar
        sidebarCtrl={sidebarCtrl}
        titleCtrl={titleCtrl} />
      <div className={dashContainer}>
        <div className='dContainerInner'>
          <Outlet />
        </div>
      </div>
      <DashFooter />
    </div>
  );
}

export default InnerDashboard;