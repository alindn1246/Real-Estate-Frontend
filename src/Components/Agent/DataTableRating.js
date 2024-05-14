import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import './DataTableProperty.css';

const DataTableRating = ({ userData }) => {
    const navigate = useNavigate();
  
    const [ratings, setRatings] = useState([]);
    const [agent, setAgent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    const pageSize = 10;
    const pagesCount = Math.ceil(ratings.length / pageSize);
    const userId = userData.userId;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const responseAgent = await axios.get(`https://localhost:7088/api/Agents/GetAgentByUserId/${userId}`);
          setAgent(responseAgent.data);
  
          const responseRatings = await axios.get(`https://localhost:7088/api/Comments/ByAgent/${responseAgent.data.agentId}`);
          setRatings(responseRatings.data);
  
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
  
    const handleEditClick = (ratingId) => {
      // Handle edit action if needed
      console.log(`Edit clicked for rating with ID: ${ratingId}`);
    };
  
    const handleDeleteClick = (ratingId) => {
        axios.delete(`https://localhost:7088/api/Comments/${ratingId}`)
      .then(response => {
        console.log('Rating deleted successfully', response);
      })
      .catch(error => {
        console.error('Error deleting Rating', error);
      });
      console.log(`Delete clicked for rating with ID: ${ratingId}`);
    };
  
    const filteredData = ratings.filter(item =>
      item.comments.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>Rating ID</th>
              <th>Value</th>
              <th>Comments</th>
              <th>UserName</th>
              <th>AgentName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.ratingId}</td>
                  <td>{item.value}</td>
                  <td>{item.comments}</td>
                  <td>{item.userName}</td>
                  <td>{item.agentName}</td>
                  <td>
                    <Button color="primary" onClick={() => handleEditClick(item.ratingId)}>Edit</Button>{' '}
                    <Button color="danger" onClick={() => handleDeleteClick(item.ratingId)}>Delete</Button>
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
  
  export default DataTableRating;
  