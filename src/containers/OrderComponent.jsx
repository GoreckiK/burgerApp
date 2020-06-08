import React, {useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import axiosInstance from '../axiosInstance';
import { connect } from 'react-redux';

const OrderComponent = ({disabled, ingredients, finalPrice, resetState, history}) => {
    const [isOrderRequestInProgress, setIsOrderRequestInProgress] = useState(false);

    const componentStyle = {
        marginTop: '30px'
    };

    const spinnerStyle = {
        position: "fixed",
        top: '45%'
    };

    const buttonStyle = {
        backgroundColor: '#c7d100',
        width: '100px',
        height: '40px',
        border: 'unset',
        textAlign: 'center',
        color: '#ffffff'
    };

    const handleOrderClick = () => {
        setIsOrderRequestInProgress(true);
        const order = {
            ingredients,
            price: finalPrice
        };

        axiosInstance.post('/orders.json', order)
            .then(() => {
                setIsOrderRequestInProgress(false);
                history.push('/');
                resetState();
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={componentStyle}>
            {isOrderRequestInProgress?
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant='primary'/>
                </div>  : null
            }
            <Button style={buttonStyle} variant='primary' disabled={disabled} onClick={handleOrderClick}>Order</Button>
        </div>
    );

};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch({type: 'RESET_TO_DEFAULT'})
    };
};

export default connect(null, mapDispatchToProps)(OrderComponent);
