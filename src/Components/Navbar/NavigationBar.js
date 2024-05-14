import Container from 'react-bootstrap/Container';
import { useState,useEffect,useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { CiStar } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { PiSignOut } from "react-icons/pi";
import Logo from '../Images/Logo.png';
import UserHome from '../Images/UserHome1.png';
import UserHome1 from '../Images/UserHome.png';

import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
import Cookies from 'js-cookie';
function NavigationBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [navBackground, setNavBackground] = useState(false);
  
  const isLoggedIn = Cookies.get('authToken') !== undefined;
  

  const handleLogout = () => {
    Cookies.remove('authToken');
  };

  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

    const starStyle = {
      width: '25px',
      height: '25px',
    };
    const calenderStyle={
      width: '25px',
      height: '25px',
    };

    const logOutStyle={
      width: '25px',
      height: '25px',
    };
  

  return (
   
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className={`mb-3 ${show ? 'hidden' : ''} ${navBackground ? 'scrolled' : ''}`}>

          
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Navbar.Brand href="/"> <img src={Logo} alt="Your Logo" height="30" className='Logo' />
              
              
              </Navbar.Brand>
              <Navbar.Toggle className="custom-toggler" aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleShow} />
              <img src={UserHome1} alt="Your Logo" height="20" className="Avatarone" />
            </div>
            <Navbar.Collapse className="justify-content-end flex-grow-1 pe-3">
            <Nav className="justify-content-end flex-grow-1 pe-3 all">
                <NavDropdown title="Find Property"    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                <NavDropdown.Item as={NavLink} to="/PropertiesListByType/Buy">Buy</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/PropertiesListByType/Rent">Rent</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/PropertiesListByType/House-Land">House & Land</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/PropertiesListByType/Apartment">Apartment</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/PropertiesListByType/Rular">Rural</NavDropdown.Item>
          </NavDropdown>

                  <Nav.Link href="/Find-Agent">Find Agent</Nav.Link>
                 
                   <NavDropdown
                    title="News"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item as={NavLink} to="/News/PropertyNews">Property News </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/News/Living">
                    Living
                    </NavDropdown.Item>
                  </NavDropdown>
                 <NavDropdown title="For Owners"  id={`offcanvasNavbarDropdown-expand-${expand}`}>
            <NavDropdown.Item  as={NavLink} to="/Find-Agent">Sell</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/MyProperty">My Property</NavDropdown.Item>
          </NavDropdown>
                  
          <Nav.Link  as={NavLink} to="/MortgageCalculator">Mortgage Calculator </Nav.Link>
                 
                  
                  <Navbar.Text className="mx-2 seprator">|</Navbar.Text>
                  

                  
          {isLoggedIn ? (
          <>
            <img src={UserHome} alt="Your Logo" height="20" className="Avatar" />

<NavDropdown
                  title=""
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item as={NavLink} to="/Shortlist">  <CiStar style={starStyle}/> Shortlist</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Bookings">
                 <CiCalendarDate style={calenderStyle} />Bookings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/login"  onClick={handleLogout}>
            <PiSignOut style={logOutStyle}/> Log Out
          </NavDropdown.Item>
                </NavDropdown>
          </>
          ) : (
            <Nav.Link as={NavLink} to="/login" className="LOGIN">Log in</Nav.Link>
          )}
                </Nav>
            </Navbar.Collapse>

            <Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              show={show}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Accordion defaultActiveKey="null" flush className="myAccordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header >Find Property</Accordion.Header>
        <Accordion.Body>
                    <Nav.Link href="#">Buy</Nav.Link>
                    <Nav.Link href="#">Rent</Nav.Link>
                    <Nav.Link href="#">Houses & Land</Nav.Link>
        </Accordion.Body>

      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>For Owners</Accordion.Header>
        <Accordion.Body>
        <Nav.Link href="#">sell</Nav.Link>
        <Nav.Link href="#">My property</Nav.Link>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>News</Accordion.Header>
        <Accordion.Body>
        <Nav.Link href="#">Property Market</Nav.Link>
        <Nav.Link href="#"> Living </Nav.Link>
        </Accordion.Body>
      </Accordion.Item>
      <Nav.Link as={NavLink} to="/PropertiesListByType/Buy">Find Agent </Nav.Link>
      <Nav.Link as={NavLink} to="/PropertiesListByType/Buy">Mortage Calculator </Nav.Link>
    </Accordion>
              </Offcanvas.Body>
            </Offcanvas>
        
        </Navbar>
      ))}
    </>
  );
}

export default NavigationBar;
