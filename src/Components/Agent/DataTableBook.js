import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import './DataTableProperty.css';

const DataTableBook = ({ userData }) => {
  const navigate = useNavigate();

  const [Bookings, setBookings] = useState([]);
  const [agent, setAgent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const pageSize = 10;
  const pagesCount = Math.ceil(Bookings.length / pageSize);
  const userId = userData.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAgent = await axios.get(`https://localhost:7088/api/Agents/GetAgentByUserId/${userId}`);
        setAgent(responseAgent.data);

        const responseBookings = await axios.get(`https://localhost:7088/api/Book/GetByAgent?agentId=${responseAgent.data.agentId}`);
        setBookings(responseBookings.data);

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

  const handleEditClick = (bookId) => {
    navigate(`/Editproperty/${bookId}`);
    console.log(`Edit clicked for booking with ID: ${bookId}`);
  };

  const handleDeleteClick = (bookId) => {
    axios.delete(`https://localhost:7088/api/Book/${bookId}`)
      .then(response => {
        console.log('Booking deleted successfully', response);
      })
      .catch(error => {
        console.error('Error deleting booking', error);
      });
  };

  const filteredData = Bookings.filter(item =>
    item.askProperty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.properties.username.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th>Booking ID</th>
            <th>Ask Property</th>
            <th>DateTime</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((item, index) => (
              <tr key={index}>
                <td>{item.bookingpropertyId}</td>
                <td>{item.askProperty}</td>
                <td>{item.dateTime}</td>
            
                <td>{item.properties.username}</td>
                <td>
               
                  <Button color="danger" onClick={() => handleDeleteClick(item.properties.bookId)}>Delete</Button>
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
      
    </div>
  );
};

export default DataTableBook;
