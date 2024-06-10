import { combineReducers } from "@reduxjs/toolkit";
import userDetail from "./userDetail";
import loginDetail from "./loginDetail";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
    userDetail: userDetail,
    loginDetail: loginDetail,
    productSlice: productSlice


});

export default rootReducer;