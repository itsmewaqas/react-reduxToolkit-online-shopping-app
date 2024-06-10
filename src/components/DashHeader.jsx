import React, { useState, useEffect,useRef } from 'react';
import {
  useNavigate,
  Link,
  NavLink
} from "react-router-dom";
import { Form } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import { BiMenuAltLeft, BiLogOutCircle,BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/loginDetail';
import { removeProduct } from '../redux/slices/productSlice';
import { Scrollbars } from 'react-custom-scrollbars-2';

function DashHeader(props) {

  const dispatch = useDispatch();

  const data = useSelector((state) => state);

  let navigate = useNavigate();

  const [menuCollapse, menuCollapseSet] = useState(false);

  const menuCollapsed = () => {
    menuCollapseSet({ menuCollapse: !menuCollapse });
    props.sidebarCtrlFunc();
  }

  const userLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  }

  const [items, Setitems] = useState([]);
  const [basketMenu, setBasketMenu] = useState(false);
  const [responsiveMenu, SetresponsiveMenu] = useState("resMenuShow");

  const catMenu = useRef(null)
  const closeOpenMenus = (e) => {
    if (catMenu.current && basketMenu && !catMenu.current.contains(e.target)) {
      setBasketMenu(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)


  const showCart = () => {
    setBasketMenu(!basketMenu)
  }

  const removeItem = (pItem) => {
    const newList = data.productSlice.itemList.filter((item) => item.id !== pItem.id);
    Setitems(newList);
    dispatch(removeProduct(
      pItem
    ))
  }

  const getTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += (item.pPrice * item.quantity)
      // subtotal = subtotal += (item.pPrice * item.quantity)
    })
    return subtotal;
  }

  const viewToCheckout = () => {
    navigate('/Checkout');
    setBasketMenu(false);
  }

  useEffect(() => {
  }, [])



  return (
    <div className='dHeader'>
      <div className="logoArea">
        <a><img className='logo' src={logo} alt='' /> </a>
      </div>
      <a onClick={() => menuCollapsed()} className='hamburger'><BiMenuAltLeft size={30} /></a>
      <button onClick={() => userLogout()} className='headerLogout'><BiLogOutCircle /></button>
      <a onClick={() => showCart()} className='menuBasket'><BiCart size={22} color='#000' /><span>{data.productSlice.itemList.length}</span></a>
      {basketMenu && <div className='cartMenu' ref={catMenu}>
        {data.productSlice.itemList.length == 0 ? <dd>Cart Is Empty...</dd>
          :
          <div>
            <Scrollbars style={{ height: 250 }}>
              <ul>
                {data.productSlice.itemList.length >= 0 ?
                  data.productSlice.itemList?.map((pItem, index) => (
                    <li key={index.toString()}>
                      <img src={pItem.pImg} alt="" />
                      <p>{pItem.pTitle}
                        <span>Price: {pItem.pPrice}</span></p>
                      <button onClick={() => removeItem(pItem)}>X</button>
                    </li>
                  ))
                  : <p>Card is Empty</p>
                }
              </ul>
            </Scrollbars>
            <dd>Total Amount :${getTotal(data.productSlice.itemList)}</dd>
            <button className='checkOutBtn' onClick={() => viewToCheckout()}>Proceed To Checkout</button>
          </div>
        }
      </div>}
    </div>
  );
}

export default DashHeader;