import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import validateInfo from './validation';
import { getCardData } from '../redux/slices/productSlice';

function Card(props) {

    const dispatch = useDispatch();

    const initalState = {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardHolderName: '',
    };

    const [values, setValues] = useState(initalState);
    const [errors, setErrors] = useState({});
    const [replacedcardNumber, SetreplacedcardNumber] = useState(null);

    const handleChnage = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const addCard = (e) => {
        e.preventDefault();
        setErrors(validateInfo({ values }));
        if (values.cardNumber != '' &&
            values.expiryDate != '' &&
            values.cvc != '' &&
            values.cardHolderName != '') {
            dispatch(getCardData({ ...values, replacedcardNumber: values.cardNumber.replace(/.(?=.{4,}$)/g, '*') }))
        }
        else {
            return false
        }
    }

    // useEffect(() => {
    //     if (values.cardNumber.length === 4) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     } else if (values.cardNumber.length === 9) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     } else if (values.cardNumber.length === 14) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     }
    // }, [values.cardNumber]);

    return (
        <form>
            <Row>
                <Col md={6}>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control name='cardNumber' maxLength={16} onChange={handleChnage} type='text' placeholder='0000 0000 0000 0000' />
                            {errors.cardNumber && <p className='error'>{errors.cardNumber}</p>}
                        </Form.Group>
                    </Col>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control name='expiryDate' onChange={handleChnage} type='date' placeholder='MM/YY' />
                                {errors.expiryDate && <p className='error'>{errors.expiryDate}</p>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>CVC/CVV</Form.Label>
                                <Form.Control maxLength={3} name='cvc' onChange={handleChnage} type='text' placeholder='***' />
                                {errors.cvc && <p className='error'>{errors.cvc}</p>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control name='cardHolderName' onChange={handleChnage} type='text' placeholder='Card Holder Fullname' />
                            {errors.cardHolderName && <p className='error'>{errors.cardHolderName}</p>}
                        </Form.Group>
                    </Col>
                </Col>
            </Row>
            <div class="d-flex flex-row">
                <Button onClick={addCard} variant="dark">Add Card</Button>
            </div>
        </form>
    );
}

export default Card;