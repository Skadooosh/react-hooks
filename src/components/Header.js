import React from 'react';
import {Nav} from 'react-bootstrap';

const Header = () => {

    return(
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
                <Nav.Link href="/view">View Speech</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/">Create Speech</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Header;