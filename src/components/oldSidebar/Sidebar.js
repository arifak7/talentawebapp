import { useState } from 'react';
import {Navigate } from 'react-router-dom'
import { FaBarsStaggered, FaAngleLeft } from "react-icons/fa6";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import './Sidebar.css'
import Collapse from 'react-bootstrap/Collapse'
import CloseButton from 'react-bootstrap/CloseButton'
import { Link } from '../../../node_modules/react-router-dom/dist/index';

function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navButtons = [['Home', '/' ], ['Request Form', '/RequestForm'], ['End', '/End']]
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const navigateTo = (route) => () => {
        console.log('hi')
        Navigate(route);
        setSidebarOpen(false); // Close the sidebar after navigation
    };


    return (
        <Container className={`sidebar-color min-vh-100 ${isSidebarOpen ? "sidebar-open" : 'sidebar-closed'}`}>

            <label className={`menu-title ${isSidebarOpen ? 'menu-title-open' : 'menu-title-closed'}`}>Talenta</label>
            <Row className=''>
                
                <Col sm={1} className={`${isSidebarOpen ? 'toggle-btn-open' : 'toggle-btn-closed'}`} >

                    <Button variant={`outline-light`} onClick={toggleSidebar} size='sm'>
                        {isSidebarOpen ?
                            <FaAngleLeft /> : <FaBarsStaggered />}
                    </Button>
                </Col>
            </Row>

            <div className={`navbar-items ${isSidebarOpen ? 'sidebar-show' : 'sidebar-hide'}`}>
                {navButtons.map(([text, target]) => (
                    <Row className='navbar-btn'>
                        <Link to={target} className='link-btn' onClick={toggleSidebar}> {text} </Link>
                    </Row>
                ))}
            </div> 
        </Container >
    );
}

export default Sidebar;