import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { TbFilterSearch } from "react-icons/tb";
import './FilterOffcanva.css'; 
import { Container } from 'react-bootstrap';
import SearchBox from './SearchBox';
import BtnPropertyType from './BtnPropertyType';
import FilterContainer from '../property/Filtering/FilterContainer';
function FilterOffcanva() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  

  return (
    <>
    
      <Button  onClick={handleShow} variant="outline-success" className="filter-button">
      <TbFilterSearch className= 'FilterIcon' />Filter
        </Button>
      <Offcanvas show={show} onHide={handleClose} className="full-page-offcanvas" placement='full'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >close</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='filtercontainers'>
             <FilterContainer/>
          </div>
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FilterOffcanva;
