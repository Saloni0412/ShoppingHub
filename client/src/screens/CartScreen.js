import { useContext } from "react";
import Store from "../Store";
import { Helmet } from 'react-helmet-async';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function CartScreen () {
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ?(
                        <MessageBox>
                            Cart is empty. <Link to ="/"> Go Shopping</Link>
                        </MessageBox>
                    ):
                    (
                        <ListGroup>
                            
                        </ListGroup>
                    )
                    }

                </Col>
                <Col md={4}>
                    
                </Col>
            </Row>

        </div>
    )
}