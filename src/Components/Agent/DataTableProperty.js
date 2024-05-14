import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import './DataTableProperty.css';
const DataTableProperty = ({ userData }) => {
  const navigate = useNavigate();

  const [properties, setProperty] = useState([]);
  const [agent, setAgent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const pageSize = 10;
  const pagesCount = Math.ceil(properties.length / pageSize);
  const userId = userData.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/GetAgentByUserId/${userId}`);
        setAgent(responseAgent.data);
        const responseProperty = await axios.get(`https://localhost:7088/api/Properties/GetPropertiesByAgentId/${responseAgent.data.agentId}`);
        setProperty(responseProperty.data);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleChangePage = (event, index) => {
    event.preventDefault();
    setCurrentPage(index);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleEditClick = (propertyId) => {
    navigate(`/Editproperty/${propertyId}`);
    console.log(`Edit clicked for property with ID: ${propertyId}`);
  };

  const handleDeleteClick = (propertyId) => {
    axios.delete(`https://localhost:7088/api/Properties/${propertyId}`)
    .then(response => {
      console.log('Property deleted successfully', response);
      
    })
    .catch(error => {
      console.error('Error deleting property', error);
    
    });
  };

  const filteredData = properties.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  return (
    <div className="containerDataTable">
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Table>
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>OwnerName</th>
            <th>Status</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((item, index) => (
              <tr key={index}>
                <td>{item.propertyId}</td>
                <td>{item.name}</td>
                <td>{item.typeName}</td>
                <td>{item.price}</td>
                <td>{item.userName}</td>
                <td>{item.status}</td>
                <td>{item.address}</td>
                <td>
                  <Button color="primary" onClick={() => handleEditClick(item.propertyId)}>Edit</Button>{' '}
                  <Button color="danger" onClick={() => handleDeleteClick(item.propertyId)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={e => handleChangePage(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
        {[...Array(pagesCount)].map((page, i) => (
          <PaginationItem active={i === currentPage} key={i}>
            <PaginationLink onClick={e => handleChangePage(e, i)} href="#">
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink
            onClick={e => handleChangePage(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
      <Button
        color="primary"
        className="AddtionButton" 
        onClick={() => navigate('/PropertyForm')}
      >
        Add Property
      </Button>
    </div>
  );
};

export default DataTableProperty;
