import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, productIncrement, productDecrement } from '../redux/slices/productSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails(props) {

    const location = useLocation();
    const data = location.state;
    const dispatch = useDispatch();

    const storeData = useSelector((state) => state);
    console.log('storeData', storeData)

    const [getItem, setGetItem] = useState('');
    const [getsize, setgetsize] = useState('');
    const [getcolor, setgetcolor] = useState('');
    const [getData, setgetData] = useState({});

    useEffect(() => {
        setGetItem(data);
    }, [data]);

    console.log('data', data)


    const sizeList = data.pSize.map((item, index) => (
        <li key={index.toString()}>
            <a onClick={() => setgetsize(item)} className={item === getsize ? 'active' : ''}>{item}</a>
        </li>
    ));

    const colorList = data.pColor.map((item, index) => (
        <li key={index.toString()}>
            <a onClick={() => setgetcolor(item)} className={item === getcolor ? 'active' : ''}>{item}</a>
        </li>
    ));

    const notify = () => toast.error("Please Select size and color", {
        position: "bottom-right",
        theme: "dark"
    });

    const addToCard = (getItem) => {
        if (!getsize || !getcolor) {
            notify()
        }
        else {
            const getFinalData = {
                id: getItem.id,
                parentID: getItem.parentID,
                pImg: getItem.pImg,
                pTitle: getItem.pTitle,
                pPrice: getItem.pPrice,
                pDescription: getItem.pDescription,
                pType: getItem.pType,
                pImg: getItem.pImg,
                pSize: getsize,
                pColor: getcolor,
            }
            setgetData({ ...getFinalData });
            dispatch(addProduct(
                getFinalData
            ))
        }
    }

    console.log(getData);


    const addExistingItem = (item) => {
        dispatch(productIncrement(
            item
        ))
    }

    const removeExistingItem = (item) => {
        dispatch(productDecrement(
            item
        ))
    }

    return (
        <div>
            <ToastContainer />
            <div className='productContainer clearfix'>
                <h1>Products Details</h1>
                <div className='productCard'>
                    <img src={getItem.pImg} alt="" />
                    <p>Title <span>{getItem.pTitle}</span></p>
                    <p>Size <ul>{sizeList}</ul></p>
                    <p>Color <ul>{colorList}</ul></p>
                    <p>Price <span>{getItem.pPrice}</span></p>
                    <p>Description <span>{getItem.pDescription}</span></p>
                    <p>Type <span>{getItem.pType}</span></p>
                    {storeData.productSlice.itemList.filter(x => x.id == getItem.id && x.parentID == getItem.parentID).map(em => (
                        <div className='qtyCtrl'>
                            <button onClick={() => removeExistingItem(getItem)}>-</button>
                            <p> Qty: {em.quantity}</p>
                            <button onClick={() => addExistingItem(getItem)}>+</button>
                        </div>
                    ))}
                    <button
                        disabled={storeData.productSlice.itemList.some((x) => (x.id == getItem.id && x.parentID == getItem.parentID))}
                        onClick={() => addToCard(getItem)}>Add To Card</button>
                </div>


            </div>
        </div>
    );
}

export default ProductDetails;