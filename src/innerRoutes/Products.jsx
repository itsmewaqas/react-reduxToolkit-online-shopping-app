import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import ProductsList from '../components/ProductsList';

function Products(props) {

    let navigate = useNavigate();

    const [chooseCategory, SetchooseCategory] = useState('All');
    const [datalist, Setdatalist] = useState(ProductsList);

    const selectedCategory = (chooseCategory) => {
        SetchooseCategory(chooseCategory);
        if (chooseCategory == "All") {
            Setdatalist(ProductsList);
            return;
        }
        const filteredData = ProductsList.filter((x) => {
            return x.category == chooseCategory;
        })
        Setdatalist(filteredData);
    }

    const getCategory = ['All', ...new Set(ProductsList.map(x => x.category))];
    console.log('getCategory', getCategory);

    const renderIcon = (icon) => {
        switch (icon) {
            case "All":
                return require('../assets/images/categoryIcon/all1.png');
            case "Caps":
                return require('../assets/images/categoryIcon/cap.png');
            case "Jeans":
                return require('../assets/images/categoryIcon/jeans.png');
            case "Polo":
                return require('../assets/images/categoryIcon/polo.png');
            case "Shirts":
                return require('../assets/images/categoryIcon/shirt.png');
            case "Shoes":
                return require('../assets/images/categoryIcon/shoes.png');
            case "Shorts":
                return require('../assets/images/categoryIcon/shorts.png');
            case "Trousers":
                return require('../assets/images/categoryIcon/trouser.png');
            case "Tshirt":
                return require('../assets/images/categoryIcon/t-shirt.png');
            default:
                return require('../assets/images/categoryIcon/all.png');
        }
    }

    const selectItem = (item) => {
        navigate('/ProductDetails', { state: item });
    }

    return (
        <div>
            <div className='productContainer clearfix'>
                <h1>Products</h1>
                <ul className='productFilter clearfix'>
                    {getCategory.map((item, index) => {
                        return (<li key={index.toString()}>
                            <a className={chooseCategory === item ? 'ptabActive' : 'ptabNormal'}
                                onClick={() => selectedCategory(item)}>
                                <img src={renderIcon(item)} alt="" />
                                {item}</a>
                        </li>)
                    })}
                </ul>
                <ul className='productList clearfix'>
                    {datalist.map((item, index) => (
                        <Fragment key={index.toString()}>
                            {item.itemList.map((item, index) => (
                                <li key={index.toString()}>
                                    <img src={item.pImg} alt="" />
                                    <h2>{item.pTitle}</h2>
                                    <button onClick={() => selectItem(item)}>Add To Card</button>
                                </li>
                            ))}
                        </Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Products;