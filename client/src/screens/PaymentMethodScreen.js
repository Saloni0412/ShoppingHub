import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch the data, set the type of action and payload
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    // store the data in local storage
    localStorage.setItem('paymentMethod', paymentMethodName);
    // call the navigate hook to navigate URL
    navigate('/placeorder');
  };

  // UI for Payment Page, including 2 payment options for PayPal and Stripe. Button type is Radio which allows user to select only 1 payment type.
  return (
    <div>

      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <div className="container small-container">

        <Helmet>
          <title>Payment Method</title>
        </Helmet>

        <h1 className="my-3">Payment Method</h1>

        <Form onSubmit={submitHandler}>

         <div className="mb-3">
            <Form.Check
              type="radio"
              id="American Express"
              label="American Express"
              value="American Express"
              checked={paymentMethodName === 'American Express'}
              onChange={(e) => setPaymentMethod(e.target.value)}/>
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Bitcoin"
              label="Bitcoin"
              value="Bitcoin"
              checked={paymentMethodName === 'Bitcoin'}
              onChange={(e) => setPaymentMethod(e.target.value)}/>
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}/>
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Visa"
              label="Visa"
              value="Visa"
              checked={paymentMethodName === 'Visa'}
              onChange={(e) => setPaymentMethod(e.target.value)}/>
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Mastercard"
              label="Mastercard"
              value="Mastercard"
              checked={paymentMethodName === 'Mastercard'}
              onChange={(e) => setPaymentMethod(e.target.value)}/>
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>

        </Form>
      </div>
    </div>
  );
}