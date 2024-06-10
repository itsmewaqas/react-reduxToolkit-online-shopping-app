import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addProduct, productIncrement, productDecrement, removeProduct, ordersuccess } from '../redux/slices/productSlice';
import validateInfo from '../components/validation';
import Card from '../components/Card';

function Checkout(props) {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state
  });

  const initalState = {
    name: '',
    email: '',
    cell: '',
    address: '',
    zipcode: '',
    paymentMethod: '',

  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [items, Setitems] = useState([]);
  const [successBox, SetsuccessBox] = useState(false);
  const [finaldata, Setfinaldata] = useState({});

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const removeItem = (pItem) => {
    const newList = data.productSlice.itemList.filter((item) => item.id !== pItem.id);
    Setitems(newList);
    dispatch(removeProduct(
      pItem
    ))
  }

  const addExistingItem = (pItem) => {
    console.log('call addExistingItem', pItem);
    dispatch(productIncrement(
      pItem
    ))
  }

  const removeExistingItem = (pItem) => {
    console.log('call removeExistingItem', pItem);
    dispatch(productDecrement(
      pItem
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo({ values }));
    if (values.name != '' &&
      values.email != '' &&
      values.cell != '' &&
      values.address != '' &&
      values.zipcode != '' &&
      values.paymentMethod != '') {
      Setfinaldata(values);
      if (values) {
        setValues({
          name: '',
          email: '',
          cell: '',
          address: '',
          zipcode: '',
          paymentMethod: '',
        })
        setTimeout(() => {
          dispatch(ordersuccess());
          SetsuccessBox(true);
        }, 1000);
      }
    }
  }

  const getTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal = subtotal + (item.pPrice * item.quantity)
    })
    return subtotal;
  }

  const tax = 3;
  const discount = 5;
  const getSubTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal = subtotal + (item.pPrice * item.quantity)
    })
    return subtotal + tax - discount;
  }

  const goToHome = () => {
    navigate('/');
    SetsuccessBox(false);
  }


  useEffect(() => {
  }, [])

  return (
    <div>
      {successBox &&
        <dd>
          <div className='overlay' onClick={() => goToHome()}></div>
          <div className='successBox'>
            <button className='close' onClick={() => goToHome()}>X</button>
            <p>
              <strong>All good!</strong>
              Thanks for your order placing '{finaldata.name}' We will meet to your home shortly with your favorite food!
            </p>
          </div>
        </dd>}
      <div className='container'>
        <h3>Checkout</h3>
      </div>
      <div className='container clearfix'>
        <form onSubmit={handleSubmit}>
          <div className='checkoutleftblock'>
            <h2>Devilery information</h2>
            {data.productSlice.itemList.length == 0 ? null :
              <div>
                <h2>before order placing fill required field otherwise order does not place!</h2>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' name='name' onChange={handleChnage} />
                      {errors.name && <p className='error'>{errors.name}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' name='email' onChange={handleChnage} />
                      {errors.email && <p className='error'>{errors.email}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Cell</Form.Label>
                      <Form.Control type='text' name='cell' onChange={handleChnage} />
                      {errors.cell && <p className='error'>{errors.cell}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control type='text' name='zipcode' onChange={handleChnage} />
                      {errors.zipcode && <p className='error'>{errors.zipcode}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Devilery Address</Form.Label>
                      <Form.Control as="textarea" rows="4" name='address' onChange={handleChnage} />
                      {errors.address && <p className='error'>{errors.address}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Payment Method</Form.Label>
                      <br />
                      <Form.Check
                        inline
                        type="radio"
                        label="Cash On Devilery"
                        name='paymentMethod'
                        checked={values.paymentMethod === 'cashOnDevilery'}
                        value="cashOnDevilery"
                        onChange={handleChnage}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Online Payment"
                        name='paymentMethod'
                        checked={values.paymentMethod === 'onlinePayment'}
                        value="onlinePayment"
                        onChange={handleChnage}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {data.productSlice.selectedCard == 0 ? null
                  :
                  <div className='radiolist'>
                    <label><input type='radio' name='paymentMethod' checked={values.paymentMethod === 'selectOnlinePayment'} value="selectOnlinePayment" onChange={handleChnage} /> </label>
                    <label>{data.productSlice.selectedCard.replacedcardNumber}</label>
                    <label>{data.productSlice.selectedCard.expiryDate}</label>
                    <label>{data.productSlice.selectedCard.cvc}</label>
                    <label>{data.productSlice.selectedCard.cardHolderName}</label>
                  </div>}
                {errors.paymentMethod && <p className='error'>{errors.paymentMethod}</p>}
                {values.paymentMethod == 'onlinePayment' ?
                  <div>
                    <Card />
                  </div>
                  : null}
              </div>}
          </div>
          <div className='checkoutrightblock'>
            <h3>Order Summary</h3>
            <Scrollbars style={{ height: 400 }}>
              {data.productSlice.itemList.length == 0 ? <h3>Cart Is Empty...</h3>
                :
                <ul>
                  {data.productSlice.itemList.length >= 0 ?
                    data.productSlice.itemList?.map((pItem, index) => (
                      <li key={index.toString()}>
                        <img src={pItem.pImg} alt="" />
                        <p>{pItem.pTitle}</p>
                        <p>Price ${pItem.pPrice}</p>
                        <p className='paralimit'>{pItem.pDescription}</p>
                        <p>{pItem.pType}</p>
                        <dd className='qtyCtrl2'>
                          <button onClick={() => removeExistingItem(pItem)}>-</button>
                          <span>{pItem.quantity}</span>
                          <button onClick={() => addExistingItem(pItem)}>+</button>
                        </dd>
                        <button className='checkclosebtn' onClick={() => removeItem(pItem)}>X</button>
                      </li>
                    ))
                    : <p>Card is Empty</p>
                  }
                </ul>
              }
            </Scrollbars>
            <div className='billBox'>
              <p>Items Quantity <span>{data.productSlice.itemList.length}</span></p>
              <p>Sub Total <span>${getTotal(data.productSlice.itemList)}</span></p>
              <p>Tax (3%) <span>${tax}</span></p>
              <p>Discount (-5%) <span style={{ color: '#51ca51' }}>$-{discount}</span></p>
              <p>Total <span style={{ color: '#51ca51' }}>${getSubTotal(data.productSlice.itemList)}</span></p>
              <button type='submit'
                disabled={values.paymentMethod == 'onlinePayment' ? true :
                  values.paymentMethod == 'selectOnlinePayment' ? false : null}>Confirm Order</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;



