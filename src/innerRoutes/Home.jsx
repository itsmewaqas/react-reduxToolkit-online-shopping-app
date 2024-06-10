import { useState, useEffect, Fragment } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import TestimonialList from '../components/TestimonialList';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';

function Home() {

  // future item filter
  const filterProductList = ProductsList.filter(x => x.itemList.some(item => item.pType === 'future'));
  const finalData = filterProductList.sort(() => Math.random() - Math.random()).slice(0, 4);

  const filteredItems = finalData.map(item => {
    return item.itemList.filter(subitem => subitem.pType === 'future').slice(0, 4);
  });

  // Object.keys(filteredItems).map((el, index) => {
  //   filteredItems[el].map(item => console.log(item.itemName));
  // })
  // future item filter

  //herro picture show randomly
  // const herroPicture = ProductsList.sort(() => Math.random() - Math.random()).slice(0, 1);

  const heroPictureMain = ProductsList.filter(x => x.itemList.some(item => item.pType === 'future'));
  const getPicData = heroPictureMain.sort(() => Math.random() - Math.random()).slice(0, 1);

  const herroPicture = getPicData.map(item => {
    return item.itemList.filter(subitem => subitem.pType === 'future').slice(0, 1);
  });


  //testimonial show randomly
  const testimonialData = TestimonialList.sort(() => Math.random() - Math.random());



  const datavalue = [
    {
      id: 0,
      value: 4000,
      color: 'green'
    },
    {
      id: 1,
      value: 3000,
      color: 'red'
    },
    {
      id: 2,
      value: 2000,
      color: 'blue'
    },
    {
      id: 3,
      value: 1000,
      color: 'yellow'
    },
    {
      id: 4,
      value: 6500,
      color: 'purple'
    },
    {
      id: 5,
      value: 500,
      color: 'gray'
    }
  ]


  useEffect(() => {
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <ul className='listbox'>
        {datavalue.map((item, index) => (
          <li key={index.toString()} style={{ backgroundColor: item.color, width: item.value / 100 }}>
            <span style={{ visibility: 'hidden' }}>{item.value / 100}</span>
            <i>{item.value}</i>
          </li>
        ))}
      </ul>
      <Row>
        <Col md={12}>
          <Form.Label></Form.Label>
          <h4>Future Items</h4>
          <div className='whiteWarp clearfix'>
            {Object.keys(filteredItems).map((el, index) => (
              <ul key={index.toString()}>
                {filteredItems[el].slice(0, 1).map((item, index) => (
                  <li key={index.toString()}>
                    <img src={item.pImg} alt="" />
                    <p>{item.pTitle}</p>
                    <p>{item.pPrice}</p>
                    <p>{item.pDescription}</p>
                    <p>{item.pType}</p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Col>
        <Col md={2}>
          <h4>Brand Type</h4>
          <div className='heroPic'>
            {herroPicture?.map((p, index) => (
              <img key={index.toString()} src={p.pImg} alt="" />
            ))}
          </div>
        </Col>
        <Col md={10}>
          <h4>Testimonials</h4>
          <ul className='testimonialsList'>
            {testimonialData?.map((item, index) => (
              <li key={index.toString()}>
                <img src={item.tesImg} alt="" />
                <h5>{item.tesName}</h5>
                <p>{item.tesDescription}</p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default Home;


// https://www.freecodecamp.org/news/javascript-2d-arrays/