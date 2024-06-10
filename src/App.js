import { useState } from 'react';
import {
  BrowserRouter as Router,
  BrowserRouter
} from "react-router-dom";
import Routers from './routes';
import './assets/css/styleLTR.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
       <BrowserRouter>
          <Routers />
        </BrowserRouter>
    </div>
  )
}

export default App
